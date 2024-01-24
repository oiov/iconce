import MainHeader from "@/components/MainHeader";
import UserAccountHeader from "@/components/UserAccountHeader";
import { UserInfo } from "@/types/user";
import Link from "next/link";

export default function Header({ user }: { user?: UserInfo }) {
  return (
    <div
      className="fixed top-0 z-10 h-14 w-full bg-[#1f2023] first-letter:shadow-sm"
      style={{
        backdropFilter: "saturate(50%) contrast(2) blur(5px)",
      }}>
      <header className="flex h-14 justify-between items-center text-white w-full pb-0 sm:px-4 px-2">
        <MainHeader />
        <div className="flex items-center gap-4 text-sm">
          <Link className=" hover:text-gray-300" href="/">
            Home
          </Link>
          <Link className=" hover:text-gray-300" href="/privacy">
            Privacy
          </Link>
          <Link className=" hover:text-gray-300" href="/contact">
            Contact
          </Link>
          <UserAccountHeader
            user={{
              username: user?.username || "",
              avatar: user?.avatar || "",
              email: user?.email || "",
              role: user?.role || 0,
              membershipExpire: user?.membershipExpire,
            }}
          />
        </div>
      </header>
    </div>
  );
}
