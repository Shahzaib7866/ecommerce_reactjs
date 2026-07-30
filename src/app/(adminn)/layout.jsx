import "../(adminn)/dashboard/admin.css";
import Sidebar from "../../components/admin/Sidebar";

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700']
// })

export const metadata = {
  title: "Admin Dashboard",
  description: "New Collections For Everyone",
};

export default function AdminLayout({ children }) {
  return (
 
        <div className="main">
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>

          <div className="right-content">{children}</div>
        </div>

  );
}



