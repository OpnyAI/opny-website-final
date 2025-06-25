import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const router = useRouter();

  // Für Google OAuth: Onboarding-Prüfung nach Redirect
  useEffect(() => {
    async function checkAfterOAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await redirectAfterLogin(user.id);
      }
    }
    checkAfterOAuth();
    // eslint-disable-next-line
  }, []);

  // Hilfsfunktion: Nach Login/Signup auf richtige Seite weiterleiten
  async function redirectAfterLogin(userId) {
    const { data: profiles, error } = await supabase
      .from("generator_profiles")
      .select("id")
      .eq("user_id", userId);

    if (profiles && profiles.length > 0) {
      router.replace("/offer-generator");
    } else {
      router.replace("/onboarding/angebot");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      const userId = data?.user?.id;
      if (userId) {
        await redirectAfterLogin(userId);
      } else {
        // Fallback (sollte selten nötig sein)
        const { data: { user } } = await supabase.auth.getUser();
        if (user) await redirectAfterLogin(user.id);
      }
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    // reCAPTCHA prüfen
    const verify = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: recaptchaToken }),
    });
    const result = await verify.json();

    if (!result.success) {
      alert("Bitte löse das reCAPTCHA korrekt.");
      setLoading(false);
      return;
    }

    // Supabase Signup
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      const userId = data.user?.id;
      if (!userId) {
        alert("Fehler: Keine User-ID nach Registrierung gefunden.");
        return;
      }

      // Trial-Ende berechnen (heute + 3 Monate)
      const trialEnd = new Date();
      trialEnd.setMonth(trialEnd.getMonth() + 3);

      // In user_profiles speichern
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert([
          {
            id: userId,
            trial_ends_at: trialEnd.toISOString(),
          },
        ]);

      if (profileError) {
        alert("Fehler beim Anlegen des Profils: " + profileError.message);
        return;
      }

      // Direkt nach Signup weiterleiten
      await redirectAfterLogin(userId);
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: {
      redirectTo: "https://opny.ai/auth/callback" 
    // Nach dem Login kommt der User per OAuth-Redirect wieder auf /auth,
    // dort läuft dann der useEffect und übernimmt die Weiterleitung!
  }
});
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8fa] px-2">
      <div className="relative w-full max-w-md">
        {/* Apple Glow/Reflex */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-36 h-36 bg-white/70 rounded-full blur-2xl opacity-60 z-0 pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-36 h-36 bg-black/10 rounded-full blur-2xl opacity-30 z-0 pointer-events-none" />
        {/* Panel */}
        <div className="relative z-10 rounded-3xl border border-white/60 shadow-2xl bg-white/80 backdrop-blur-xl px-8 md:px-12 py-10">
          <h1 className="font-extrabold text-2xl text-center mb-8 tracking-tight text-black drop-shadow font-sans">
            Willkommen bei Opny
          </h1>
          <div className="space-y-6">
            {/* Google Auth Button */}
            <button
              onClick={handleGoogle}
              className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl border border-gray-300 bg-white text-black hover:bg-gray-100 transition font-semibold text-base shadow-sm mb-2"
            >
              <svg width={22} height={22} viewBox="0 0 48 48" className="inline-block mr-2">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.44 1.48 8.4 2.73l6.24-6.1C35.4 2.99 29.98 0 24 0 14.61 0 6.44 6.18 2.72 14.49l7.68 5.96C12.38 13.82 17.69 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.13 24.55c0-1.68-.15-3.29-.43-4.82H24v9.13h12.4c-.53 2.82-2.13 5.13-4.55 6.73v5.54h7.37C43.57 36.26 46.13 30.92 46.13 24.55z"/>
                  <path fill="#FBBC05" d="M10.4 28.31c-1.19-3.57-1.19-7.45 0-11.02v-5.97H2.72a24.05 24.05 0 0 0 0 22.93l7.68-5.94z"/>
                  <path fill="#EA4335" d="M24 47.5c6.5 0 11.95-2.16 15.93-5.86l-7.37-5.54c-2.07 1.39-4.71 2.21-8.56 2.21-6.31 0-11.62-4.32-13.6-10.06l-7.68 5.97C6.44 41.82 14.61 47.5 24 47.5z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
              Mit Google anmelden
            </button>
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="px-2 text-gray-400 text-xs">oder mit E-Mail</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {/* Login */}
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none bg-white transition text-base"
                placeholder="E-Mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none bg-white transition text-base"
                placeholder="Passwort"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                className="w-full py-3 rounded-xl bg-black text-white font-bold text-base shadow hover:bg-neutral-900 transition mt-2"
                type="submit"
                disabled={loading}
              >
                Login
              </button>
            </form>
            {/* Sign Up */}
            <form onSubmit={handleSignup} className="space-y-3">
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none bg-white transition text-base"
                placeholder="E-Mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none bg-white transition text-base"
                placeholder="Passwort"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <div className="bg-white rounded-xl mt-1 p-2 shadow z-20">
                <ReCAPTCHA
                  sitekey="6LdZfmYrAAAAAOF2Fqe65aLMheWECb1qiuQjDJlA"
                  ref={recaptchaRef}
                  onChange={token => setRecaptchaToken(token || "")}
                  className="scale-95"
                />
              </div>
              <button
                className="w-full py-3 rounded-xl bg-black text-white font-bold text-base shadow hover:bg-neutral-900 transition mt-2"
                type="submit"
                disabled={loading || !recaptchaToken}
              >
                Registrieren (3 Monate kostenlos testen)
              </button>
            </form>
          </div>
          <div className="text-gray-400 text-xs mt-7 text-center">
            Mit der Registrierung akzeptierst du die <a href="#" className="underline hover:text-black">AGB</a> und <a href="#" className="underline hover:text-black">Datenschutz</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
