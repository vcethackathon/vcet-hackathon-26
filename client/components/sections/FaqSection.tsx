"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/data";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section"
      style={{ background: "rgba(0,0,0,.15)" }}
    >
      <SectionHeader label="Help Center" title="FAQ" centred />

      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
            <button
              className="faq-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
