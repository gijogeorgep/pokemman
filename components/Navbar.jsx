import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar({
  badgeText = null,
  badgeIcon: BadgeIcon = Sparkles,
  rightContent = null,
  className = "",
}) {
  return (
    <header className={`site-header ${className}`.trim()}>
      <Link href="/" className="logo" aria-label="PokemanHub Home">
        <div className="pokeball-icon" aria-hidden="true">
          <span className="pokeball-top" />
          <span className="pokeball-center" />
          <span className="pokeball-bottom" />
        </div>
        <span className="logo-text">
          Pokeman<strong>Hub</strong>
        </span>
      </Link>

      {(rightContent || badgeText) && (
        <div className="header-meta">
          {rightContent ?? (
            <span className="badge-pill">
              {BadgeIcon && <BadgeIcon size={13} />}
              <span>{badgeText}</span>
            </span>
          )}
        </div>
      )}
      F    </header>
  );
}
