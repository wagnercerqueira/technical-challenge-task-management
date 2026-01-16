"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "~/lib/auth-client";
import { signUpSchema, type SignUpInput } from "~/lib/validations/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: SignUpInput = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const validatedData = signUpSchema.parse(data);

      const result = await signUp.email(validatedData);

      if (result.error) {
        setError(result.error.message || "An error occurred");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "issues" in err) {
        const zodError = err as { issues: Array<{ message: string }> };
        setError(zodError.issues[0]?.message ?? "Validation error");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Create an account</CardTitle>
          <CardDescription className="text-white/80">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-500/20 border border-red-500/50 p-3 text-sm text-white backdrop-blur">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isLoading}
                className="bg-white border-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isLoading}
                className="bg-white border-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                disabled={isLoading}
                className="bg-white border-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-white/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-white/10 backdrop-blur text-white hover:bg-white/20 border border-white/20" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
            <div className="text-center text-sm text-white/80">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-white underline hover:text-white/80">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
