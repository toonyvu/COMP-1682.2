import { apiFetch } from "./apiFetch";

export async function createCheckoutSession() {
  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create checkout session");
  }

  const data = await res.json();
  window.location.href = data.url;
}
