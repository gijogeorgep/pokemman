import "./globals.css";

export const metadata = {
  title: "PokemanHub ",
  description: "Explore Pokemon, discover their types, abilities, stats, and moves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
