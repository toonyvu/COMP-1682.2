import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

type Props = {
  searchParams: Promise<{ token?: string }>;
};
export default async function ResetPassword({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) return;

  return (
    <>
      <ResetPasswordForm token={token} />
    </>
  );
}
