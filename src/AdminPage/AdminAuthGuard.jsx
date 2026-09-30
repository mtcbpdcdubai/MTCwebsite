import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import LinkButton from "../components/ui/LinkButton.jsx";
import Balatro from "../components/ui/Balatro.jsx";

function GuardScreen({ children }) {
  return (
    <div className="bg-transparent text-white min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center relative">
      <div className="fixed inset-0 -z-10">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#000000"
          color2="#0a0a0a"
          color3="#111111"
        />
      </div>
      {children}
    </div>
  );
}

// This is a UX convenience only -- the real security boundary is Row Level
// Security on every table (see the schema migrations). Even if this guard
// were bypassed entirely, an authenticated non-admin still can't read or
// write anything admin-only.
export default function AdminAuthGuard({ children }) {
  const [status, setStatus] = useState("checking"); // 'checking' | 'signed-out' | 'not-admin' | 'ok'

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (!cancelled) setStatus("signed-out");
        return;
      }

      const { data: isAdmin } = await supabase.rpc("is_admin");
      if (!cancelled) setStatus(isAdmin ? "ok" : "not-admin");
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (status === "checking") {
    return (
      <GuardScreen>
        <Loader2 className="animate-spin" size={22} />
        Checking access…
      </GuardScreen>
    );
  }

  if (status === "signed-out") {
    return (
      <GuardScreen>
        <p>You need to sign in to view this page.</p>
        <LinkButton
          to="/admin/login"
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white hover:scale-105 transition"
        >
          Go to Admin Login
        </LinkButton>
      </GuardScreen>
    );
  }

  if (status === "not-admin") {
    return (
      <GuardScreen>
        <p className="text-red-400 font-semibold">You don't have admin access.</p>
        <p className="text-gray-400 text-sm">
          If you believe this is a mistake, contact an existing MTC admin.
        </p>
      </GuardScreen>
    );
  }

  return children;
}
