import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Ruler,
  Weight,
  Zap,
  Swords,
  Sparkles,
} from "lucide-react";
import { artwork, getPokemon, getPokemonList, titleCase } from "@/lib/pokemon";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const pokemon = await getPokemon(id);
    return {
      title: `${titleCase(pokemon.name)} — PokemanHub`,
      description: `Detailed stats, abilities, and moves for ${titleCase(pokemon.name)}.`,
    };
  } catch {
    return {
      title: "Pokemon Details — PokemanHub",
    };
  }
}

// SSG: pre-render top Pokemon at build time
export async function generateStaticParams() {
  try {
    const list = await getPokemonList(48, 0);
    return list.map((_, index) => ({
      id: String(index + 1),
    }));
  } catch {
    return [];
  }
}

export default async function PokemonDetailPage({ params }) {
  const { id } = await params;
  let pokemon;
  try {
    pokemon = await getPokemon(id);
  } catch {
    notFound();
  }

  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const maxStat = 180;

  // Process moves (sorted: level-up moves first, then by level)
  const moves = (pokemon.moves || [])
    .map((m) => {
      const details = m.version_group_details?.at(-1);
      return {
        name: m.move.name,
        learnMethod: details?.move_learn_method?.name || "level-up",
        levelLearned: details?.level_learned_at || 0,
      };
    })
    .sort(
      (a, b) =>
        (b.learnMethod === "level-up") - (a.learnMethod === "level-up") ||
        a.levelLearned - b.levelLearned
    );

  const totalStats = pokemon.stats?.reduce((sum, s) => sum + s.base_stat, 0) || 0;

  return (
    <div className="app-container detail-page-container">
      {/* Top Navigation */}
      <header className="detail-header">
        <Link href="/" className="back-button">
          <ArrowLeft size={16} />
          <span>Back to PokemanHub</span>
        </Link>
        <div className="detail-dex-tag">#{String(pokemon.id).padStart(3, "0")}</div>
      </header>

      {/* Hero Showcase Card */}
      <section className={`detail-hero-card hero-type-${primaryType}`}>
        <div className="detail-hero-info">
          <div className="detail-meta-pill">Pokemon #{String(pokemon.id).padStart(3, "0")}</div>
          <h1 className="detail-title">{titleCase(pokemon.name)}</h1>

          <div className="type-badges detail-type-badges">
            {pokemon.types?.map((t) => (
              <span key={t.type.name} className={`type-badge badge-${t.type.name}`}>
                {titleCase(t.type.name)}
              </span>
            ))}
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">
                <Ruler size={16} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Height</span>
                <strong className="metric-value">{(pokemon.height / 10).toFixed(1)} m</strong>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Weight size={16} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Weight</span>
                <strong className="metric-value">{(pokemon.weight / 10).toFixed(1)} kg</strong>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon">
                <Sparkles size={16} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Base EXP</span>
                <strong className="metric-value">{pokemon.base_experience ?? "—"} XP</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-hero-visual">
          <div className="visual-backdrop" />
          <Image
            src={artwork(pokemon)}
            alt={titleCase(pokemon.name)}
            width={320}
            height={320}
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Two Column Layout: Stats and Abilities */}
      <div className="detail-columns">
        {/* Base Stats Card */}
        <section className="content-card">
          <div className="card-title-row">
            <div className="card-title-group">
              <Zap className="section-icon" size={18} />
              <h2>Base Stats</h2>
            </div>
            <span className="stat-pill-bst">BST: {totalStats}</span>
          </div>
          <p className="section-subtitle">Core battle parameters and distribution.</p>

          <div className="stats-list">
            {pokemon.stats?.map((s) => {
              const statPercent = Math.min((s.base_stat / maxStat) * 100, 100);
              const statKey = s.stat.name;
              return (
                <div className="stat-item" key={statKey}>
                  <div className="stat-name-label">{titleCase(statKey)}</div>
                  <div className="stat-bar-track">
                    <div
                      className={`stat-bar-fill stat-color-${statKey}`}
                      style={{ width: `${statPercent}%` }}
                    />
                  </div>
                  <span className="stat-number">{s.base_stat}</span>
                </div>
              );
            })}
          </div>

          <div className="stats-summary-footer">
            <span>Total Base Stats</span>
            <strong>{totalStats}</strong>
          </div>
        </section>

        {/* Abilities Card */}
        <section className="content-card">
          <div className="card-title-row">
            <div className="card-title-group">
              <Sparkles className="section-icon" size={18} />
              <h2>Abilities</h2>
            </div>
          </div>
          <p className="section-subtitle">Passive combat effects and traits.</p>

          <div className="abilities-stack">
            {pokemon.abilities?.map((a) => (
              <div className="ability-card" key={a.ability.name}>
                <div className="ability-info">
                  <h3 className="ability-title">{titleCase(a.ability.name)}</h3>
                  <span className="ability-description">
                    {a.is_hidden
                      ? "Special hidden ability unlocked via specific conditions."
                      : "Standard natural ability active during battle."}
                  </span>
                </div>
                <span className={`ability-badge ${a.is_hidden ? "badge-hidden" : "badge-standard"}`}>
                  {a.is_hidden ? "Hidden" : "Standard"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Moves Arsenal Section */}
      <section className="content-card moves-section">
        <div className="card-title-row">
          <div className="card-title-group">
            <Swords className="section-icon" size={18} />
            <h2>Moveset ({moves.length})</h2>
          </div>
          <span className="section-badge-counter">{moves.length} moves recorded</span>
        </div>
        <p className="section-subtitle">
          Techniques and battle moves that can be learned by this Pokemon.
        </p>

        {moves.length > 0 ? (
          <div className="moves-chip-grid">
            {moves.slice(0, 48).map((m, idx) => (
              <div className="move-item-pill" key={`${m.name}-${idx}`}>
                <span className="move-title">{titleCase(m.name)}</span>
                <span className="move-category">
                  {m.learnMethod === "level-up" && m.levelLearned > 0
                    ? `Lv. ${m.levelLearned}`
                    : titleCase(m.learnMethod)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-moves-text">No move data recorded for this entry.</p>
        )}

        {moves.length > 48 && (
          <div className="moves-overflow-note">
            + {moves.length - 48} more moves available in the Pokedex database
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <div className="detail-bottom-nav">
        <Link href="/" className="back-button bottom-back">
          <ArrowLeft size={16} />
          <span>Back to all Pokemon</span>
        </Link>
      </div>
    </div>
  );
}
