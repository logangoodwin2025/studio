import { redirect } from 'next/navigation';

export default function DashboardRedirectPage({ params }: { params: { company: string }}) {
  redirect(`/${params.company}/dashboard`);
}
