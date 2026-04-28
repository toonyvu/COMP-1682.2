import { checkKey } from "./apiClient";

export async function createCheckoutSession() {
  const token = await checkKey();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
