"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { NavBar } from "@/src/components/NavBar";

interface SignInResponse {
  message: string;
  token: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post<SignInResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-in`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Sign-in error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md shadow-lg border border-border bg-card">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
            Welcome Back 🌱
          </h1>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded border border-border bg-input px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded border border-border bg-input px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center mt-4 text-green-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-green-600 cursor-pointer font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
