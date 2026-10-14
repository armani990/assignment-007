import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://bazar-dor-assignment-007.vercel.app",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
} = authClient;