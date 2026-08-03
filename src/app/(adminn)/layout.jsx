import "../(adminn)/dashboard/admin.css";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700']
// })

export const metadata = {
  title: "Admin Dashboard",
  description: "New Collections For Everyone",
};

export default function AdminLayout({ children }) {
  
  const currentTheme = "light";
  
  return (
 
        <div className={`main ${currentTheme}`}>
          
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>

          <div className="right-content">
            <Header />
            <div className="children-wrapper">
            {children}
            </div>
            
            </div>
        </div>

  );
}



