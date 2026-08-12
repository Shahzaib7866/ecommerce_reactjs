import { cookies } from 'next/headers';
import "../(adminn)/dashboard/admin.css";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Providers from '../../components/Providers'
import LayoutWrapper from '../../components/admin/AdminDashboardWrapper'

export const metadata = {
  title: "Admin Dashboard",
  description: "New Collections For Everyone",
};

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('app_theme')?.value || 'light';

  return (
    <div className="main">
      <Providers theme={theme}>
        <LayoutWrapper sidebar={<Sidebar />} header={<Header />}>
          {children}
        </LayoutWrapper>
      </Providers>
    </div>
  );
}

