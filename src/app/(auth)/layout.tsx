import { getSession } from "~/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
