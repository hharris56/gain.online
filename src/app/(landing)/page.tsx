"use client";

import "./landing.css";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    // centered
    <div className="w-dvw h-dvh flex justify-center items-center">
      <img
        src="/logos/logo black.png"
        className="landing-logo logo-rotate w-80"
        id="logo"
        tabIndex={0}
        onClick={() => sleep(1000).then(() => router.push("/home"))}
      />
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
