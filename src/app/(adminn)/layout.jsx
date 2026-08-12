import { cookies } from 'next/headers';
import "../(adminn)/dashboard/admin.css";
import Providers from '../../components/Providers';
import AdminDashboardWrapper from '../../components/admin/AdminDashboardWrapper';

export const metadata = {
  title: "Admin Dashboard",
  description: "New Collections For Everyone",
};

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('app_theme')?.value || 'light';

  return (
    <Providers theme={theme}>
      <AdminDashboardWrapper>
        {children}
      </AdminDashboardWrapper>
    </Providers>
  );
}

