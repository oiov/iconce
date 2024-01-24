import Header from "@/components/Header";
import { AboutLayout } from "@/components/layout/AboutLayout";
import { getCurrentUser } from "@/lib/session";
import { HomeLayoutChildren } from "@/types/layout";
import { UserInfo } from "@/types/user";

export default async function AboutPageLayout({
  children,
}: HomeLayoutChildren) {
  const user = (await getCurrentUser()) as UserInfo;

  return (
    <>
      <AboutLayout>
        <Header user={user} />
        {children}
      </AboutLayout>
    </>
  );
}
