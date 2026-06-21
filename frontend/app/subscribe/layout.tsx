import UserNavbar from "@/components/[navbars]/UserNavbar";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar />
      {children}
    </div>
  );
}
