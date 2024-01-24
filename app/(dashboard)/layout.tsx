import Header from "@/components/Header";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getCurrentUser } from "@/lib/session";
import { HomeLayoutChildren } from "@/types/layout";
import { UserInfo } from "@/types/user";

export default async function HomePageLayout({ children }: HomeLayoutChildren) {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <>
      <DashboardLayout user={user}>
        <Header user={user} />
        {children}
      </DashboardLayout>
    </>
  );
}
