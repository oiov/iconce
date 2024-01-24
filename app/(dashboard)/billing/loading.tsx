import { CardSkeleton } from "@/components/dashboard/card-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell className=" mt-24 px-4 md:px-10">
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
