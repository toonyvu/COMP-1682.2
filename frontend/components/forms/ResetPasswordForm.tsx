type Props = {
  token: string;
};

export default function ResetPasswordForm({ token }: Props) {
  return (
    <div>
      <h1>Hi!</h1>
      <h1>{token}</h1>
    </div>
  );
}
