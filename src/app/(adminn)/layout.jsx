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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={poppins.className} suppressHydrationWarning={true}> */}
      <body>
        <div className="main">
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>

          <div className="right-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
