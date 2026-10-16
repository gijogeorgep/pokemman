# Pokemon Explorer (Take-Home Assignment)

A responsive, high-performance Pokemon Explorer web application built with **Next.js** and **JavaScript (JSX)**, fetching live data from the public [PokeAPI](https://pokeapi.co/).

---

## 🚀 Features

### 1. Homepage (`/`)
- **Pokemon List**: Displays a catalog of Pokemon fetched from PokeAPI with official high-resolution artwork and Pokedex numbers.
- **Search Bar**: Real-time filtering by Pokemon name (and Pokedex ID) with instant results.
- **Type Filter Pills**: Quick filter by elemental type (Normal, Fire, Water, Grass, Electric, Psychic, Dragon, etc.).
- **Visually Appealing UI**: Modern card layout with dynamic glowing halos, type-tinted badges, micro-animations, and full mobile responsiveness.

### 2. Detail Page (`/pokemon/[id]`)
- **Dynamic Routing**: Accessible via dynamic Next.js routes (`/pokemon/[id]` and supports Pokemon name or ID).
- **Comprehensive Details**:
  - **Image**: High-resolution official artwork and sprites.
  - **Types**: Colored elemental badges.
  - **Abilities**: Both standard and hidden abilities.
  - **Stats**: Animated stat progress bars (HP, Attack, Defense, Special Attack, Special Defense, Speed) plus Base Stat Total (BST).
  - **Moves**: Complete arsenal breakdown with learn method (Level-up, TM, etc.) and required level.
  - **Physical Characteristics**: Height (m) and Weight (kg) with metric conversions.

### 3. Performance & Architecture
- **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Fast initial page loads with Next.js App Router server components.
- **Incremental Static Revalidation (ISR)**: Configured revalidation to minimize redundant API requests.
- **Pure JavaScript**: Clean, idiomatic JavaScript (`.js` and `.jsx`) with modern ES modules.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript (JSX / ES Modules)
- **Styling**: Vanilla CSS (Custom responsive design system with CSS variables)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [PokeAPI v2](https://pokeapi.co/)

---

## 📁 Project Structure

```text
├── app/
│   ├── globals.css              # Design system, type colors, animations & responsive styling
│   ├── layout.jsx               # Root layout & meta tags
│   ├── loading.jsx              # Custom loading spinner state
│   ├── not-found.jsx            # 404 page for non-existent Pokemon
│   ├── page.jsx                 # Homepage server component (SSR/SSG list fetch)
│   └── pokemon/
│       └── [id]/
│           └── page.jsx         # Dynamic detail page (Images, Abilities, Stats, Moves)
├── components/
│   └── PokemonExplorer.jsx      # Client component (live search, type filter, card grid)
├── lib/
│   └── pokemon.js               # PokeAPI data fetching helpers & formatters
├── jsconfig.json                # Module path alias configuration (@/*)
├── next.config.mjs              # Next.js configuration (Remote image domains)
├── package.json                 # Scripts and dependencies
└── README.md                    # Documentation
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.18 or v20+ recommended)
- `npm`

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 📤 GitHub Submission Instructions

To push to your own GitHub repository:

```bash
git init
git add .
git commit -m "feat: complete Pokemon Explorer with Next.js and JavaScript"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```