import { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import { UserAuthForm } from "@/components/UserAuthForm";
import LogoSVG from "@/components/icons/LogoSVG";
import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types/user";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <div className="h-screen bg-[#1f2023] flex w-screen flex-col items-center justify-center">
      <Header user={user} />
      <div className="mx-auto flex flex-1 w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <LogoSVG className="w-8 h-8" />
          <h1 className="text-2xl text-white font-semibold tracking-tight">
            ICONCE
          </h1>
          <p className="text-sm text-muted-foreground">
            Please select your login method.
          </p>
        </div>
        <UserAuthForm user={user} />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
