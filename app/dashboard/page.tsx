import UserDashboard from "@/pages/Dashboard";
import { getUser } from "@/utils/getUser";

export default async function Dashboard() {
  const { supabase, user } = await getUser();

  if (!user) return <div>Not logged in.</div>;

  const [profileRes, recipesRes] = await Promise.all([
    supabase
      .from("users")
      .select("username")
      .eq("auth_id", user.id)
      .maybeSingle(),

    supabase.from("recipes").select("*"),
  ]);

  if (profileRes.error) {
    console.error("Profile error:", profileRes.error);
  }

  if (recipesRes.error) {
    console.error("Recipes error:", recipesRes.error);
  }

  const username = profileRes.data?.username ?? "";
  const recipes = recipesRes.data ?? [];

  return <UserDashboard username={username} recipes={recipes} />;
}
