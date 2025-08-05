"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout } from "lucide-react";
import { NavBar } from "@/src/components/NavBar";

interface SignUpResponse {
  userid: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-up`);

      const res = await axios.post<SignUpResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-up`,
        { name, email, password }
      );

      if (res.data.userid) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
      }
    } catch (error: unknown) {
      console.error("Sign-up error:", error);
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
              <Sprout className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
            Create Your Account 🌱
          </h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded border border-border bg-input px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center mt-4 text-green-700">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-green-600 cursor-pointer font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
