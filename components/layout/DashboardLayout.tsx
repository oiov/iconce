import { HomeLayoutProps } from "@/types/layout";
import { notFound } from "next/navigation";

export const DashboardLayout = ({ children, user }: HomeLayoutProps) => {
  if (!user) {
    return notFound();
  }
  return (
    <div className="h-screen bg-[#1f2023] w-full mx-auto">
      <main className="flex-1">{children}</main>
    </div>
  );
};
