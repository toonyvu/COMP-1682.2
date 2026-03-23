import UserNavbar from "@/components/navbars/UserNavbar";

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
