import UserNavbar from "@/components/navbars/UserNavbar";

export default function CancelLayout({
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
