import { ONE_DAY } from "@/lib/constants";
import { getUserSubscriptionStatus } from "@/lib/lemonsqueezy/subscriptionFromStorage";
import prisma from "@/lib/prisma";
import { UserInfo } from "@/types/user";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Account, NextAuthOptions, Theme, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import redis from "./redis";

// Here you define the type for the token object that includes accessToken.
interface ExtendedToken extends TokenSet {
  accessToken?: string;
  userId?: string;
}

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      httpOptions: {
        timeout: 40000,
      },
    }),
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`,
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`,
      httpOptions: {
        timeout: 40000,
      },
      // authorization: { params: { scope: ["identify", "email"].join(" ") } },
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   maxAge: 10 * 60, // 10min, 邮箱链接失效时间，默认24小时
    //   async sendVerificationRequest({
    //     identifier: email,
    //     url,
    //     provider,
    //     theme,
    //   }) {
    //     const { host } = new URL(url);
    //     const transport = createTransport(provider.server);
    //     const result = await transport.sendMail({
    //       to: email,
    //       from: provider.from,
    //       subject: `You are logging in to LemonMe`,
    //       text: text({ url, host }),
    //       html: html({ url, host, theme }),
    //     });
    //     const failed = result.rejected.concat(result.pending).filter(Boolean);
    //     if (failed.length) {
    //       throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 登录(account仅登录那一次有值)
      // Only on sign in (account only has a value at that time)
      if (account) {
        token.accessToken = account.access_token;

        // 存储访问令牌
        // Store the access token
        await storeAccessToken(account.access_token || "", token.sub);

        // 用户信息存入数据库
        // Save user information in the database
        const userInfo = await upsertUserAndGetInfo(token, account);
        console.log("[userInfo]", userInfo);

        if (!userInfo || !userInfo.userId) {
          throw new Error("User information could not be saved or retrieved.");
        }

        const planRes = await getUserSubscriptionStatus({
          userId: userInfo.userId,
          defaultUser: userInfo,
        });
        const fullUserInfo = {
          userId: userInfo.userId,
          username: userInfo.username,
          avatar: userInfo.avatar,
          email: userInfo.email,
          platform: userInfo.platform,
          role: planRes.role,
          membershipExpire: planRes.membershipExpire,
          accessToken: account.access_token,
        };
        return fullUserInfo;
      }
      return token as any;
    },
    async session({ session, token }) {
      // Append user information to the session
      if (token && token.userId) {
        session.user = await getSessionUser(token);
      }
      return session;
    },
  },
};
async function storeAccessToken(accessToken: string, sub?: string) {
  if (!accessToken || !sub) return;
  const expire = ONE_DAY * 30; // The number of seconds in 30 days
  await redis.set(accessToken, sub, { ex: expire });
}
async function upsertUserAndGetInfo(token: JWT, account: Account) {
  console.log("[upsertUserAndGetInfo token]", token);

  const user = await upsertUser(token, account.provider);
  if (!user || !user.userId) return null;

  const subscriptionStatus = await getUserSubscriptionStatus({
    userId: user.userId,
    defaultUser: user,
  });

  return {
    ...user,
    role: subscriptionStatus.role,
    membershipExpire: subscriptionStatus.membershipExpire,
  };
}
async function upsertUser(token: JWT, provider: string) {
  const userData = {
    userId: token.sub,
    username: token.name,
    avatar: token.picture,
    email: token.email,
    platform: provider,
  };

  const user = await prisma.user.upsert({
    where: { userId: token.sub },
    update: userData,
    create: { ...userData, role: 0 },
  });

  return user || null;
}
async function getSessionUser(token: ExtendedToken): Promise<UserInfo> {
  const planRes = await getUserSubscriptionStatus({
    userId: token.userId as string,
  });
  return {
    userId: token.userId,
    username: token.username,
    avatar: token.avatar,
    email: token.email,
    platform: token.platform,
    role: planRes.role,
    membershipExpire: planRes.membershipExpire,
    accessToken: token.accessToken,
  } as UserInfo;
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="10" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          <strong>Welcome to LemonMe</strong> 🎉
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 5px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in now</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Button click without response? Try open this <a href="${url}" target="_blank">LemonMe</a> in your browser. If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

/** 不支持HTML 的邮件客户端会显示下面的文本信息 */
function text({ url, host }: { url: string; host: string }) {
  return `Welcome to LemonMe! This is a magic link, click on it to log in ${url}\n`;
}
