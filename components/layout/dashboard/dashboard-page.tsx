import { DashboardNav } from "./dashboard-nav";
import { DashboardMain } from "./dashboard-main";
import { DashboardRoot } from "./dashboard-root";
import { DashboardSidebar } from "./dashboard-sidebar";
import { AuthUserContext } from "next-firebase-auth";

type Props = {
  children?: React.ReactNode;
  user: AuthUserContext;
};
export const DashboardPage: React.FC<Props> = ({ children, user }) => {
  return (
    <DashboardRoot>
      <DashboardSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <DashboardNav user={user} />
        <DashboardMain>{children}</DashboardMain>
      </div>
    </DashboardRoot>
  );
};
