"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";  // ← Correct import for App Router

export default function Home() {
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);  // ← Runs only in browser, not during build

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Go to the dashboard</p>
      <a href="/dashboard" className="text-blue-500 underline">
        Dashboard
      </a>
    </main>
  );
}