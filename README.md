# Arne Slot Out - Petition Campaign

A viral-ready, high-conversion petition landing page demanding the removal of Arne Slot from Liverpool FC. Built with modern web technologies focusing on an emotional, cinematic user experience.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Animations
- **Motion:** Framer Motion
- **Database Integration:** Supabase ready (with built-in local mock fallback)

## Features
- Cinematic dark mode design with glowing Liverpool red accents
- Real-time animated signature counter
- Zero-friction one-click signing (no registration required)
- Spam prevention (localStorage & basic IP fingerprinting)
- "Fake" live activity feed to increase FOMO and momentum
- Social sharing integrations
- Fully responsive and mobile-first

## Getting Started

### Prerequisites
- Node.js 18+

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (optional, for Supabase integration):
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup (Supabase)
To make the petition fully functional in production:
1. Create a Supabase project
2. Create a `signatures` table with the following columns:
   - `id` (uuid, primary key)
   - `created_at` (timestamp with time zone)
   - `ip_hash` (text, unique constraint to prevent duplicates)
   - `user_agent` (text)
3. Add your Supabase URL and Service Role Key to `.env.local`

Note: If no Supabase environment variables are provided, the application will run in "mock" mode, storing the count in memory for testing purposes.

## Deployment
### GitHub Pages
This repository is configured to export a static Next.js site and deploy it to GitHub Pages.

1. Push your code to GitHub.
2. Ensure the repository is named `Arne-Slot-OUT-Petition` or update `homepage` and `basePath` accordingly.
3. Run:
   ```bash
   npm install
   npm run deploy
   ```
4. The site will be published to `https://yohannes1230.github.io/Arne-Slot-OUT-Petition`.

> Note: GitHub Pages only hosts static content. The petition button is now handled locally in the browser for deployment on GitHub Pages.
