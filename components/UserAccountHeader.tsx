"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { UserAvatar } from "@/components/UserAvatar";
import CrownIcon from "@/components/icons/CrownIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/user";
import dayjs from "dayjs";
import { useCallback } from "react";

export interface UserAccountNavProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<
    UserInfo,
    "username" | "avatar" | "email" | "role" | "membershipExpire"
  >;
}

export default function UserAccountHeader({ user }: UserAccountNavProps) {
  const getMembershipExpire = useCallback(() => {
    return dayjs(user.membershipExpire).format("YYYY-MM-DD HH:mm");
  }, [user.membershipExpire]);

  return (
    <>
      {user && user.username ? (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <UserAvatar
                user={{
                  username: user.username,
                  avatar: user.avatar,
                  role: user.role,
                  email: user.email,
                }}
                className="h-8 w-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#2e3031] border border-[#ffffff0d] text-sm text-white"
              align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <div className="">
                    <div className="font-medium">{user.username}</div>
                    {user.email && (
                      <p className="w-[200px] truncate mt-2 text-sm text-gray-400">
                        {user.email}
                      </p>
                    )}
                    <div className="mr-2 mt-2 flex items-center gap-2">
                      {user.role > 0 ? (
                        <>
                          <CrownIcon />
                          <span className="text-sm text-gray-300">
                            on {getMembershipExpire()}
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="bg-gray-500/50" />
              <DropdownMenuItem
                className="DropdownMenuItem cursor-pointer"
                asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="DropdownMenuItem cursor-pointer"
                disabled
                asChild>
                <Link href="/billing">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-500/50" />
              <DropdownMenuItem
                className="DropdownMenuItem cursor-pointer"
                onSelect={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  });
                }}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 text-sm bg-white/80  backdrop-blur-xl text-black py-[5px] font-semibold hover:bg-white rounded">
          Login
        </Link>
      )}
    </>
  );
}
