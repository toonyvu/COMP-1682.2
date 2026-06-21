import UserNavbar from "@/components/[navbars]/UserNavbar";

export default function ProfileLayout({
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
