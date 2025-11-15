"use server"
import { signIn, signOut } from "@/auth";



export const login = async () => {
    await signIn("google");


}
export const logout = async () => {
  try {
    // Call server endpoint to clear JWT cookie
    await fetch("/api/logout", { method: "POST" });

    // Redirect to home or refresh UI
    window.location.href = "/";
  } catch (err) {
    console.error("Logout failed", err);
  }
};
