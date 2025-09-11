"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputLabelSet from "@/components/InputLabelSet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/app/types/type";

// APIレスポンスの型定義
interface ApiResponse {
  success: boolean;
  data?: User[];
  error?: string;
  details?: string;
}

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (href: string, email: string, password: string) => {
    fetchUsers(href, email, password);
  };

  const fetchUsers = async (
    href: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/users?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
        router.push(href);
        console.log(users);
      } else {
        setError(result.error || "There is an error in your email or password.");
      }
    } catch (err) {
      setError("ネットワークエラーが発生しました");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center my-auto h-full">
        <div className="flex flex-col gap-4 items-center justify-center w-[300px]">
          <Label className="text-title text-2xl">Sign In</Label>
          <Label className="font-light text-sm">
            In Hi there! Nice to see you again.
          </Label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <InputLabelSet
            name="email"
            label="Email"
            type="email"
            placeholder="xxx_xxx@example.com"
            onChange={setEmail}
            value={email}
          />
          <InputLabelSet
            name="password"
            label="Password"
            type="password"
            placeholder="please password"
            onChange={setPassword}
            value={password}
          />
          <Button
            size="normal"
            className="mt-4"
            onClick={() => handleNavigation("/home", email, password)}
            disabled={loading}
          >
            Sign in
          </Button>
          <div className="flex items-center">
            <Label className="font-light text-sm gap-1">
              Sign Up to create a new account.
            </Label>
            <Button variant="ghost" onClick={() => router.push("/signUp")}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
