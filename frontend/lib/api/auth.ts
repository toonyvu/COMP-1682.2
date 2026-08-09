export async function login(email: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);
  return { ok: res.ok, data: data };
}

export async function signup(
  email: string,
  username: string,
  password: string,
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await res.json();

  return { ok: res.ok, data: data };
}

export async function logout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  return data;
}

export async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  const data = await res.json();

  return data;
}

export async function forgotPassword(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  return res.json();
}

export async function resetPassword(password: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${token}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    },
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      message: data?.message ?? "Error changing password.",
    };
  }

  return {
    success: true,
    message:
      "Password changed successfully. Go back to the login page to log in!",
  };
}
