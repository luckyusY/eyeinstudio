"use client";

import { FormEvent, useState } from "react";

const fieldClass = "mt-2 w-full border border-black bg-white px-4 py-3 text-sm outline-none";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="border border-black p-8 text-black">
        <p className="text-xl font-bold">Thank you.</p>
        <p className="mt-3 text-sm">Your message is ready. Please email hello@eyeinstudio.com if you need an urgent reply.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 text-black">
      <div>
        <p className="text-[18px] font-medium">Name</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="text-[15px]">
            First Name <span className="text-black/55">(required)</span>
            <input required name="firstName" className={fieldClass} />
          </label>
          <label className="text-[15px]">
            Last Name <span className="text-black/55">(required)</span>
            <input required name="lastName" className={fieldClass} />
          </label>
        </div>
      </div>
      <label className="text-[18px]">
        Email <span className="text-black/55">(required)</span>
        <input required type="email" name="email" className={fieldClass} />
      </label>
      <label className="text-[18px]">
        Phone
        <input name="phone" className={fieldClass} />
      </label>
      <label className="text-[18px]">
        Message <span className="text-black/55">(required)</span>
        <textarea required name="message" className={`${fieldClass} min-h-32 resize-y`} />
      </label>
      <button className="w-fit border border-black px-8 py-5 text-[16px] text-black transition hover:bg-black hover:text-white">
        Submit
      </button>
    </form>
  );
}
