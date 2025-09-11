import Link from "next/link";
import Image from "next/image";
import "./googlefont.css";
import { ArrowRight } from "lucide-react";
import "./arrow-animate.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <Image
            src="/yubi.png"
            alt="yubi"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h1 className="text-6xl font-bold text-gray-900 mb-4 drop-shadow-lg story-script">
            Moneta
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl w-full">
          {/* ユーザー一覧カード */}
          <Link
            href="/login"
            className="group relative bg-gray-900 flex flex-col justify-center backdrop-blur-md border border-white/20 rounded-full p-6 hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-center mb-4 text-center">
              <h2 className="story-script text-2xl font-semibold text-orange-500 group-hover:text-gray-900">
                Go Moneta
              </h2>
              <ArrowRight className="text-orange-500 group-hover:text-gray-900 animate-arrow-x" />
            </div>
            <p className="text-blue-100 text-center group-hover:text-white transition-colors story-script">
              Manage your expenses with Moneta
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
