"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CompanyProfileForm() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    let { data, error } = await supabase.from("company_profile").select("*").single();
    if (error && error.code !== "PGRST116") { // PGRST116 = No rows found
      alert("Fehler beim Laden: " + error.message);
    }
    setProfile(data || {});
    setLoading(false);
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Falls schon ein Eintrag existiert, updaten, sonst insert
    const { id, ...rest } = profile;
    let { error } = id
      ? await supabase.from("company_profile").update(rest).eq("id", id)
      : await supabase.from("company_profile").insert([rest]);
    setLoading(false);
    if (error) {
      alert("Fehler beim Speichern: " + error.message);
    } else {
      fetchProfile();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  if (loading) return <p className="text-center p-8">Lade...</p>;

  return (
    <form className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-10" onSubmit={saveProfile}>
      <h2 className="text-xl font-bold mb-6">Firmenprofil bearbeiten</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input className="border p-2 rounded" name="name" placeholder="Firmenname" value={profile.name || ""} onChange={handleChange} required />
        <input className="border p-2 rounded" name="street" placeholder="Straße" value={profile.street || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="postal_code" placeholder="PLZ" value={profile.postal_code || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="city" placeholder="Stadt" value={profile.city || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="country" placeholder="Land" value={profile.country || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="tax_number" placeholder="Steuernummer" value={profile.tax_number || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="bank_account" placeholder="Bankverbindung" value={profile.bank_account || ""} onChange={handleChange} />
        <input className="border p-2 rounded" name="logo_url" placeholder="Logo-URL" value={profile.logo_url || ""} onChange={handleChange} />
      </div>
      <button className="bg-blue-600 text-white rounded-xl px-6 py-2 font-bold shadow hover:bg-blue-700 transition" type="submit" disabled={loading}>
        {loading ? "Speichert..." : "Speichern"}
      </button>
    </form>
  );
}
