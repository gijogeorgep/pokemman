"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { artwork, titleCase } from "@/lib/pokemon";
import Navbar from "./Navbar";

const typeNames = [
  "all",
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function PokemonExplorer({ pokemon = [] }) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return pokemon.filter((p) => {
      const matchesName =
        !q ||
        p.name.toLowerCase().includes(q) ||
        String(p.id).includes(q);
      const matchesType =
        activeType === "all" ||
        p.types?.some((t) => t.type.name === activeType);
      return matchesName && matchesType;
    });
  }, [pokemon, query, activeType]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">Field Guide & Database</span>
          <h1 className="hero-title">
            Explore <span>Pokemon</span>
          </h1>
          <p className="hero-subtitle">
            Search by name or number, filter by type, and inspect detailed battle stats,
            abilities, and complete movesets.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="search-wrapper">
          <div className="search-field">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Pokemon name or number (e.g. Pikachu, 025)..."
              aria-label="Search Pokemon"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="clear-btn"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="search-stats">
            Showing <strong>{filtered.length}</strong> of {pokemon.length} Pokemon
          </div>
        </div>

        {/* Filter Chips */}
        <div className="type-chips-wrapper" aria-label="Filter by elemental type">
          <div className="type-chips">
            {typeNames.map((type) => {
              const isSelected = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`chip ${isSelected ? "chip-active" : ""} chip-${type}`}
                >
                  {type === "all" ? "All Types" : titleCase(type)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pokemon Grid */}
      <section className="catalog-section">
        {filtered.length > 0 ? (
          <div className="pokemon-grid">
            {filtered.map((p) => {
              const primaryType = p.types?.[0]?.type?.name || "normal";
              return (
                <Link
                  href={`/pokemon/${p.id}`}
                  key={p.id}
                  className={`pokemon-card card-theme-${primaryType}`}
                >
                  <div className="card-header">
                    <span className="dex-number">#{String(p.id).padStart(3, "0")}</span>
                    <span className="card-link-icon">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>

                  <div className="card-artwork">
                    <div className="artwork-halo" />
                    <Image
                      src={artwork(p)}
                      alt={titleCase(p.name)}
                      width={160}
                      height={160}
                      loading="lazy"
                      unoptimized
                    />
                  </div>

                  <div className="card-body">
                    <h2 className="pokemon-name">{titleCase(p.name)}</h2>
                    <div className="type-badges">
                      {p.types?.map((t) => (
                        <span
                          key={t.type.name}
                          className={`type-badge badge-${t.type.name}`}
                        >
                          {titleCase(t.type.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No Pokemon Found</h3>
            <p>
              We couldn&apos;t find any Pokemon matching &ldquo;{query}&rdquo;
              {activeType !== "all" ? ` with type "${activeType}"` : ""}.
            </p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setQuery("");
                setActiveType("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Minimal Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} PokemanHub </p>
          <p className="footer-credits">
            Powered by{" "}
            <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
              PokeAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
