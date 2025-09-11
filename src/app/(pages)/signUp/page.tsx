"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import InputLabelSet from "@/components/InputLabelSet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MESSAGE_LIST, formatMessage } from "@/app/lib/messages";

const formSchema = z.object({
  email: z.string().min(1, MESSAGE_LIST.E010100)
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(1, MESSAGE_LIST.E010100)
    .max(10, formatMessage(MESSAGE_LIST.E010106, "10")),
});
// 型の定義
export type SingupValues = z.infer<typeof formSchema>;

const defaultData = {
  email: "",
  password: "",
};

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

    //フォームの設定
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema), //zodとuseHooksを連携するためのライブラリ
    defaultValues: defaultData, // 初期値を設定
  });

    //フォームの各機能を取得
  const {
    register, //入力フィールドとフォーム管理をつなぐため
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch, //フォーム内の値を随時取得できる
    reset, //フォーム内の値をリセット
  } = form;

  const handleNavigation = (href: string, email: string, password: string) => {
    router.push(
      `${href}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
        password
      )}`
    );
  };

  return (
    <>
      <div className="flex items-center justify-center my-auto h-full">
        <div className="flex flex-col gap-4 items-center justify-center w-[300px]">
          <Label className="text-title text-2xl">Sign Up</Label>
          <InputLabelSet
          {...register("email")}
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
            onClick={() => handleNavigation("/signUpCheck", email, password)}
          >
            Continue
          </Button>
          <div className="flex items-center">
            <Label className="font-light text-sm gap-1">Have an Account?</Label>
            <Button variant="ghost" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
