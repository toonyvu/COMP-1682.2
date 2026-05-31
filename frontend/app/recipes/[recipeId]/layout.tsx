import UserNavbar from "@/components/[navbars]/UserNavbar";
import AdminSidebar from "@/components/[admin]/AdminSidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserNavbar />
      {children}
    </div>
  );
}
