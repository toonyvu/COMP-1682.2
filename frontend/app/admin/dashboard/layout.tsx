import AdminNavbar from "@/components/navbars/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <AdminNavbar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
