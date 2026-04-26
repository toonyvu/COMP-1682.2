import UserNavbar from "@/components/navbars/UserNavbar";

export default function SuccessLayout({
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
