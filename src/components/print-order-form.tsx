"use client";

import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const prices: Record<string, number> = {
  "10×15 cm": 500,
  A4: 3000,
  A3: 6500,
  A2: 14000,
  "Canvas 60×90": 45000,
};

const labelClass = "text-[11px] font-bold uppercase tracking-[.12em] text-black";

export function PrintOrderForm() {
  const [size, setSize] = useState("10×15 cm");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const total = useMemo(() => (prices[size] ?? 0) * quantity, [size, quantity]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const upload = await fetch("/api/upload", { method: "POST", body: data });
    if (!upload.ok) {
      setLoading(false);
      return;
    }
    const uploaded = await upload.json();
    const order = Object.fromEntries(data);
    delete order.file;
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...order, fileUrl: uploaded.url, total }),
    });
    setLoading(false);
    if (response.ok) {
      setDone(true);
      form.reset();
    }
  }

  if (done)
    return (
      <div className="border border-black/25 bg-white p-12 text-center">
        <CheckCircle2 className="mx-auto size-12 text-black" />
        <h2 className="mt-5 text-4xl font-black uppercase tracking-[-.04em] text-black">Order received.</h2>
        <p className="mt-3 text-black/70">We&apos;ll review your file and contact you for payment and collection details.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-5 bg-white md:grid-cols-2">
      <label className={`${labelClass} md:col-span-2`}>
        Photo or artwork
        <input
          required
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/tiff,application/pdf"
          className="field mt-2 file:mr-4 file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
        />
      </label>
      <label className={labelClass}>
        Full name<input required name="name" className="field mt-2" />
      </label>
      <label className={labelClass}>
        Phone<input required name="phone" className="field mt-2" />
      </label>
      <label className={labelClass}>
        Print size
        <select name="size" value={size} onChange={(e) => setSize(e.target.value)} className="field mt-2">
          {Object.keys(prices).map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        Quantity
        <input
          name="quantity"
          type="number"
          min="1"
          max="100"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="field mt-2"
        />
      </label>
      <label className={labelClass}>
        Paper
        <select name="paper" className="field mt-2">
          <option>Premium photo</option>
          <option>Fine art</option>
          <option>Canvas</option>
        </select>
      </label>
      <label className={labelClass}>
        Finish
        <select name="finish" className="field mt-2">
          <option>Gloss</option>
          <option>Matte</option>
        </select>
      </label>
      <label className="flex items-center gap-3 text-sm text-black">
        <input type="checkbox" name="lamination" /> Add lamination
      </label>
      <label className="flex items-center gap-3 text-sm text-black">
        <input type="checkbox" name="frame" /> Request a frame quote
      </label>
      <div className="border-t border-black/25 pt-5 md:col-span-2">
        <div className="flex items-end justify-between">
          <span className="text-sm text-black/65">Estimated print total</span>
          <strong className="text-3xl font-black tracking-[-.04em] text-black">RWF {total.toLocaleString()}</strong>
        </div>
        <p className="mt-2 text-xs text-black/45">Framing, delivery and custom finishing are quoted separately.</p>
      </div>
      <button disabled={loading} className="btn-primary md:col-span-2">
        {loading ? <Loader2 className="animate-spin" /> : <Upload className="size-4" />}
        {loading ? "Uploading securely..." : "Place print order"}
      </button>
    </form>
  );
}
