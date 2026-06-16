export async function apiFetch(url: string, options?: RequestInit) {
  let res = await fetch(url, {
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (refreshRes.ok) {
      res = await fetch(url, {
        credentials: "include",
        ...options,
      });
    }
  }

  return res;
}
