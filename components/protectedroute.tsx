"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push("/auth");
    }
  }, [session]);

  if (session === null) {
    // Optional: Spinner oder "Bitte einloggen"
    return <div className="p-10 text-center">Bitte einloggen...</div>;
  }

  return <>{children}</>;
}
