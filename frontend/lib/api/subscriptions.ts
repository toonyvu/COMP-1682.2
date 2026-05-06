import { subscriptionPlans } from "@/constants/constants";
import { checkKey } from "./apiClient";

export async function createSubscriptionSession(tier: "premium" | "deluxe") {
  const token = await checkKey();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-subscription-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ prodId: subscriptionPlans[tier], tier: tier }),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create checkout session");
  }

  const data = await res.json();
  window.location.href = data.url;
}
