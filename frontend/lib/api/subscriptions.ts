import { subscriptionPlans } from "@/constants/constants";
import { apiFetch } from "./apiFetch";

export async function createSubscriptionSession(
  tier: "free" | "premium" | "deluxe",
) {
  if (tier === "free") return;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-subscription-session`,
    {
      headers: {
        "Content-Type": "application/json",
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
