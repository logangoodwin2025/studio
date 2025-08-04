
import { DashboardHeader } from "@/components/dashboard-header";
import { MembershipForm } from "@/components/data-entry/membership-form";

export default function MembershipDataEntryPage() {
  return (
    <>
      <DashboardHeader
        title="Membership Data Entry"
        description="Input membership and customer metrics"
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
            <MembershipForm />
        </div>
      </main>
    </>
  );
}
