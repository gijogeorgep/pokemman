import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="not-found-ball">?</span>
      <p className="eyebrow">WILD POKEMON NOT FOUND</p>
      <h1>
        Looks like it
        <br />
        got away<span>.</span>
      </h1>
      <p>That Pokemon isn’t in our PokemanHub records. Try another search.</p>
      <Link href="/" className="hero-cta">
        Back to PokemanHub
      </Link>
    </main>
  );
}
