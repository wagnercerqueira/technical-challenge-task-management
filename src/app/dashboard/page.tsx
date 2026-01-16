import { requireAuth } from "~/lib/auth-server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { LogoutButton } from "~/components/logout-button";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container mx-auto p-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/80">
              Welcome back, {session.user.name}!
            </p>
          </div>
          <LogoutButton />
        </div>

        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Account</CardTitle>
            <CardDescription className="text-white/80">Account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-white">
            <div>
              <span className="font-semibold">Name:</span> {session.user.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {session.user.email}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
