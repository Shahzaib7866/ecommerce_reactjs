import { cookies } from 'next/headers';
import "../(adminn)/dashboard/admin.css";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Providers from '../../components/Providers'

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
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="right-content">
          <Header />
          <div className="children-wrapper">
            {children}
          </div>
        </div>
      </Providers>
    </div>
  );
}


