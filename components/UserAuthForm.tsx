"use client";

import { signIn } from "next-auth/react";
import * as React from "react";

import { Icons } from "@/components/Icons";
import DiscordIcon from "@/components/icons/Discord";
import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { cn, isEmail } from "@/lib/utils";
import { UserInfo } from "@/types/user";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: UserInfo;
}

export function UserAuthForm({ className, user, ...props }: UserAuthFormProps) {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [isDiscordLoading, setIsDiscordLoading] =
    React.useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSendSuccess, setIsSendSuccess] = React.useState(false);

  const login = async (platform: string) => {
    // user已登录，返回首页
    if (user && user.userId) {
      router.push("/");
      return;
    }
    if (platform === "github") {
      setIsGitHubLoading(true);
    }
    if (platform === "google") {
      setIsGoogleLoading(true);
    }
    if (platform === "discord") {
      setIsDiscordLoading(true);
    }
    if (platform === "email") {
      await handleSubmit();
      return;
    }
    signIn(platform, {
      callbackUrl: `${window.location.origin}`,
      // redirect: false,
    });
  };

  const handleSubmit = async () => {
    if (email === "") {
      toast("Empty email", {
        icon: "😅",
      });
      return;
    }
    if (!isEmail(email)) {
      toast("Invalid email format", {
        icon: "😅",
      });
      return;
    }

    setIsSendSuccess(false);
    setLoading(true);

    const sign_req = await signIn("email", {
      email: email,
      callbackUrl: window.location.origin,
      redirect: false,
    });
    setTimeout(() => {
      setLoading(false);
    }, 20000);
    if (sign_req?.ok) {
      setLoading(false);
      setIsSendSuccess(true);
    } else if (sign_req?.error) {
      toast("Sending failed, please try again", {
        icon: "😅",
      });
      setLoading(false);
      setIsSendSuccess(false);
    }
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Toaster />
      <Button
        variant="outline"
        className="border-gray-700 hover:bg-white/70"
        onClick={() => login("google")}
        disabled={isGoogleLoading}>
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button
        variant="outline"
        className="border-gray-700 hover:bg-white/70"
        onClick={() => login("discord")}
        disabled={isDiscordLoading}>
        {isDiscordLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <DiscordIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Discord
      </Button>
      <Button
        variant="outline"
        className="border-gray-700 hover:bg-white/70"
        onClick={() => login("github")}
        disabled={isGitHubLoading}>
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>

      {/* <div className="my-3 flex items-center justify-center">
        <span className="w-full border border-b-0"></span>
        <span className="px-3 text-gray-400">or</span>
        <span className="w-full border border-b-0"></span>
      </div>

      <input
        className=" rounded-md border border-slate-200 px-3 py-3 shadow-inner"
        type="text"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        disabled={loading}
        onClick={() => login("email")}
        className={`
        ${
          loading
            ? "border-gray-300 bg-gray-200"
            : ` ${
                isSendSuccess
                  ? "border-blue-500 bg-blue-500 hover:text-blue-500"
                  : "border-black bg-black hover:text-black"
              } hover:bg-gray-100`
        } 
        h-10 w-full rounded-md border px-2 py-1 text-sm text-slate-100 transition-all `}>
        {loading ? (
          <LoadingDots color="gray" />
        ) : (
          <span className="font-medium">
            {isSendSuccess && !loading
              ? "Successfully sent! please check email"
              : "Sign in with email"}
          </span>
        )}
      </button> */}
    </div>
  );
}
