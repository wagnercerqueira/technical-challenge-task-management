import { auth } from "./auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return session;
}
