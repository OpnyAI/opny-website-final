"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseTest() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    let { data, error } = await supabase.from("customers").select("*");
    if (error) {
      console.error(error);
    } else {
      setCustomers(data || []);
    }
  }

  async function addCustomer(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("customers").insert([
      { name, email, logo_url: logoUrl }
    ]);
    setLoading(false);
    if (!error) {
      setName("");
      setEmail("");
      setLogoUrl("");
      fetchCustomers();
    } else {
      alert("Fehler beim Eintragen: " + error.message);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Kundenliste aus Supabase:</h2>
      <form className="mb-6" onSubmit={addCustomer}>
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 mr-2"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 mr-2"
          placeholder="Logo-URL"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Speichern..." : "Kunde hinzufügen"}
        </button>
      </form>
      <ul>
        {customers.map((c) => (
          <li key={c.id} className="border-b py-2">
            <strong>Name:</strong> {c.name} <br />
            <strong>E-Mail:</strong> {c.email} <br />
            <strong>Logo-URL:</strong> {c.logo_url}
          </li>
        ))}
      </ul>
      {customers.length === 0 && <p>Noch keine Kunden gefunden.</p>}
    </div>
  );
}
