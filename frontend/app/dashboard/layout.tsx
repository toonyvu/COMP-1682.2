import UserNavbar from "@/components/navbars/UserNavbar";

export default function DashboardLayout({
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
