import React from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  sub?: string;
  /** Centre-align the label and title. Defaults to false (left-aligned). */
  centred?: boolean;
}

/**
 * Reusable section header used across About, Tracks, Prizes, Timeline,
 * Sponsors, and FAQ sections.
 *
 * Renders:
 *  - a `.section-label` eyebrow
 *  - an `<h2 className="section-title">`
 *  - an optional `<p className="section-sub">`
 */
export default function SectionHeader({ label, title, sub, centred = false }: SectionHeaderProps) {
  const centreStyle = centred ? { textAlign: "center" as const } : undefined;

  return (
    <div style={centreStyle}>
      <div className="section-label" style={centred ? { justifyContent: "center" } : undefined}>
        {label}
      </div>
      <h2 className="section-title">{title}</h2>
      {sub && (
        <p className="section-sub" style={centred ? { margin: "1rem auto 0" } : undefined}>
          {sub}
        </p>
      )}
    </div>
  );
}
