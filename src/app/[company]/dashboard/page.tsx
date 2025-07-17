import { redirect } from 'next/navigation';

export default function DashboardPage({ params }: { params: { company: string }}) {
  redirect(`/${params.company}/financial-dashboard`);
}
