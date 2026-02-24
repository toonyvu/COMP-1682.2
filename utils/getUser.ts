import client from "@/utils/server";

export async function getUser() {
  const supabase = await client();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return { supabase, user };
}
