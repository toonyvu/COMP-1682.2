import UserNavbar from "@/components/[navbars]/UserNavbar";

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
