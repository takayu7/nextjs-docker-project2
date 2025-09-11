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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigation = (href: string, email: string, password: string) => {
    console.log(email, password);
    fetchUsers(email, password);
    if (users.length > 0) {
      router.push(href);
    }
  };

  const fetchUsers = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        setUsers(result.data);
        console.log(users);
      } else {
        setError(result.error || "データの取得に失敗しました");
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
          <Label className="text-title text-2xl">home</Label>
        </div>
      </div>
    </>
  );
}
