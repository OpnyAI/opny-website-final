"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CustomersForm() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    let { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
    if (error) alert("Fehler beim Laden: " + error.message);
    setCustomers(data || []);
    setLoading(false);
  }

  async function addCustomer(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("customers").insert([form]);
    setLoading(false);
    if (error) {
      alert("Fehler beim Speichern: " + error.message);
    } else {
      setForm({ name: "", email: "", address: "" });
      fetchCustomers();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="text-xl font-bold mb-6">Kunde anlegen</h2>
      <form onSubmit={addCustomer} className="grid grid-cols-2 gap-4 mb-8">
        <input className="border p-2 rounded col-span-2" name="name" placeholder="Kundenname" value={form.name} onChange={handleChange} required />
        <input className="border p-2 rounded col-span-2" name="email" placeholder="E-Mail" value={form.email} onChange={handleChange} />
        <input className="border p-2 rounded col-span-2" name="address" placeholder="Adresse" value={form.address} onChange={handleChange} />
        <button className="bg-blue-600 text-white rounded-xl px-6 py-2 font-bold shadow hover:bg-blue-700 transition col-span-2" type="submit" disabled={loading}>
          {loading ? "Speichert..." : "Kunde hinzufügen"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Bestehende Kunden</h3>
      <ul>
        {customers.map((c) => (
          <li key={c.id} className="border-b py-2">
            <strong>{c.name}</strong> ({c.email})<br />
            <span className="text-gray-600 text-sm">{c.address}</span>
          </li>
        ))}
        {customers.length === 0 && <li className="text-gray-500 py-2">Noch keine Kunden angelegt.</li>}
      </ul>
    </div>
  );
}
