const NAV_LINKS = ["About", "Tracks", "Prizes", "Timeline", "Sponsors", "FAQ"] as const;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-brand-dot" />
        VCET<span style={{ color: "#fff" }}> ARCADE</span>
      </div>

      <ul className="nav-links">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>

      <a href="#register" className="nav-cta">
        Register Now
      </a>
    </nav>
  );
}
