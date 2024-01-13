import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/components/UserAuthForm";
import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types/user";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <div className="h-screen bg-[#1f2023] flex w-screen flex-col items-center justify-center">
      <div className="mx-auto flex flex-1 w-full flex-col justify-center space-y-6 sm:w-[350px] px-4">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            alt="logo"
            src="/ce.svg"
            className="sm:w-12 sm:h-12 w-6 h-6 mx-auto"
            width={32}
            height={32}
          />
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
