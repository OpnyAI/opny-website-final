"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProductsForm() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", unit: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    let { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) alert("Fehler beim Laden: " + error.message);
    setProducts(data || []);
    setLoading(false);
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("products").insert([form]);
    setLoading(false);
    if (error) {
      alert("Fehler beim Speichern: " + error.message);
    } else {
      setForm({ name: "", description: "", price: "", unit: "" });
      fetchProducts();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="text-xl font-bold mb-6">Produkt anlegen</h2>
      <form onSubmit={addProduct} className="grid grid-cols-2 gap-4 mb-8">
        <input className="border p-2 rounded col-span-2" name="name" placeholder="Produktname" value={form.name} onChange={handleChange} required />
        <input className="border p-2 rounded col-span-2" name="price" placeholder="Preis (z. B. 199.00)" value={form.price} onChange={handleChange} required />
        <input className="border p-2 rounded" name="unit" placeholder="Einheit (z. B. Stück)" value={form.unit} onChange={handleChange} />
        <textarea className="border p-2 rounded col-span-2" name="description" placeholder="Beschreibung" value={form.description} onChange={handleChange} rows={2} />
        <button className="bg-blue-600 text-white rounded-xl px-6 py-2 font-bold shadow hover:bg-blue-700 transition col-span-2" type="submit" disabled={loading}>
          {loading ? "Speichert..." : "Produkt hinzufügen"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Bestehende Produkte</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id} className="border-b py-2">
            <strong>{p.name}</strong> ({p.price} € / {p.unit})<br />
            <span className="text-gray-600 text-sm">{p.description}</span>
          </li>
        ))}
        {products.length === 0 && <li className="text-gray-500 py-2">Noch keine Produkte angelegt.</li>}
      </ul>
    </div>
  );
}
