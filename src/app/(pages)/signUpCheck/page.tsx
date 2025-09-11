"use client";
import { useState ,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const searchParams = useSearchParams();

useEffect(() => {
    const addr = searchParams.get("email");
    const pass = searchParams.get("password");
    if (addr) setEmail(addr);
    if (pass) setPassword(pass);
  }, [searchParams])

  const router = useRouter();
    const handleNavigation = (href: string) => {
      router.push(href);
  };

  const dataResultShow =(label:string,data:string) =>{
    return(
          <div className="w-full flex flex-col gap-1">
            <Label  className="text-sm font-medium text-maincolor">
              {label}
            </Label>
            <Label  className="text-sm font-medium">
              {data}
            </Label>
          </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-center my-auto h-full">
        <div className="flex flex-col gap-4 items-center justify-center w-[300px]">
          <Label className="text-title text-2xl">Sign Up</Label>
          {dataResultShow("Email",email || "")}
          {dataResultShow("Password",password || "")}
          <Button
            size="normal"
            className="mt-4"
            onClick={() => handleNavigation("/home")}
          >
            Continue
          </Button>
          <Button
            size="normal"
            variant="ghost"
            className="mt-2"
            onClick={() => router.back()}
          >
            back
          </Button>
        </div>
      </div>
    </>
  );
}
