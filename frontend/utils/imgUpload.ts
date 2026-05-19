import { supabase } from "@/lib/supabase";

export const uploadAvatar = async (file: File) => {
  const fileExt = file.name.split(".").pop();

  const filePath = `avatars/${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};

export const uploadRecipeImg = async (file: File) => {
  const fileExt = file.name.split(".").pop();

  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("recipe_images")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data: urlData } = supabase.storage
    .from("recipe_images")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
