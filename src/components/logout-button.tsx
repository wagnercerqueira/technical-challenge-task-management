"use client";

import { useRouter } from "next/navigation";
import { signOut } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="bg-white/10 backdrop-blur text-white hover:bg-white/20 border-white/20"
    >
      Logout
    </Button>
  );
}
