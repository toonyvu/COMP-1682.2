export async function checkKey() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("User not logged in.");
  }

  return token;
}
