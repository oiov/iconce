import { HomeLayoutProps } from "@/types/layout";

export const HomeLayout = ({ children, user }: HomeLayoutProps) => {
  return <main>{children}</main>;
};
