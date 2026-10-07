# Shiv AI — 3D Scroll-Driven AI Image Generation SaaS

Turn your imagination into stunning images. **Shiv AI** is a futuristic, highly interactive full-stack AI image generation web application featuring an animated AI doodle universe, 3D scroll-driven storytelling, an atomic server-side credit ledger, daily free credit replenishments, and multi-provider AI generation architecture.

---

## ✨ Key Features & Architecture

- 🤖 **3D AI Mascot & Storytelling Universe**: Cute animated AI Doodle Robot with blinking digital eyes, glowing paintbrush, expressive speech bubbles, and mouse parallax 3D particle vortex.
- ⚡ **Atomic Server-Side Credit Ledger**: 
  - Free users receive **50 Free Credits every 24 hours** via server UTC timestamps (tamper-proof).
  - Standard Generation: **5 Credits**
  - High Detail: **7 Credits**
  - Ultra 8K Octane: **9 Credits**
  - Concurrency-safe atomic deductions + automatic credit refund on generation failure.
- 🎨 **11 Visual Styles & 5 Aspect Ratios**: Photorealistic, 3D Animated, Cinematic, Anime-inspired, Watercolor, Fantasy, Studio Product, Vintage Poster, Cartoon, Digital Illustration, Pixel Art.
- 🪄 **AI Prompt Assistant**: Expands simple prompts (`"dog in space"`) into hyper-descriptive 8K prompts with lighting, composition, and rendering tags.
- 🇮🇳 **Indian Rupee Pricing & Payment Integration**:
  - Free Starter: **₹0** (50 Daily Credits)
  - Weekly Creator: **₹50 / week** (120 Daily Credits)
  - Pro Studio Monthly: **₹200 / month** (300 Daily Credits, 8K Ultra)
  - Razorpay order creation, signature verification, and idempotent webhook handlers.
- 🛡️ **Public Figure Responsible AI Policy**: Artistic & historical depiction support for public figures (e.g. Narendra Modi, Mahatma Gandhi, Elon Musk, Cristiano Ronaldo) with digital watermarking and safety screening.
- 🎛️ **Full-Stack SaaS Capabilities**:
  - Creator Studio Workspace (`/create`)
  - Community & 3D Floating Gallery (`/gallery`)
  - History & Deletion Confirmation (`/history`)
  - Favorites Library (`/favorites`)
  - Creator Analytics Dashboard (`/dashboard`)
  - Protected Admin Control Panel (`/admin`)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS (Cosmic Dark Mode, Glassmorphism, Neon Glows)
- **3D & Visuals**: Three.js, Canvas Particles, Canvas Confetti, SVG Character Animations
- **Database & ORM**: PostgreSQL / SQLite with Prisma ORM
- **Authentication**: JWT Session Cookies with bcrypt password hashing
- **Payments**: Razorpay Indian Gateway SDK + Webhook Verification

---

## 🚀 Quick Start (Local Setup)

### 1. Clone & Install Dependencies
```bash
cd "Shiv Ai"
npm install
```

### 2. Configure Database & Seed Initial Showcase
```bash
# Push schema to SQLite database (dev.db) & seed demo users and gallery images
npx prisma db push
node prisma/seed.js
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables Reference

Create a `.env` file in the root directory:

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Prisma DB URL (`file:./dev.db` for SQLite or `postgresql://...`) | `"file:./dev.db"` |
| `AUTH_SECRET` | Secret key used to sign JWT authentication cookies | `"shiv_ai_jwt_super_secret_session_key_production_2026"` |
| `NEXT_PUBLIC_APP_URL` | Public application URL | `"http://localhost:3000"` |
| `AI_PROVIDER` | Provider mode: `auto`, `openai`, `replicate`, `fal`, `procedural` | `"auto"` |
| `OPENAI_API_KEY` | OpenAI API Key for DALL-E 3 (Optional: fallback engine active if unset) | `""` |
| `REPLICATE_API_TOKEN` | Replicate API Key for SDXL / Flux (Optional) | `""` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID for payments | `""` |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret Key | `""` |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Webhook Signing Secret | `""` |
| `ADMIN_SECRET_KEY` | Admin dashboard access protection key | `"shiv_admin_2026_super_key"` |

---

## 👥 Demo Login Credentials

- **Admin Account**:
  - Email: `admin@shivai.com`
  - Password: `ShivAdmin2026!`
  - Access: Full admin statistics, user management, and manual credit adjustment at `/admin`.
- **Demo User Account**:
  - Email: `creator@shivai.com`
  - Password: `demo1234`
  - Access: 50 Daily credits, history, and favorites.

---

## 🌐 Production Deployment (Google Cloud / Vercel / Railway)

1. Set `DATABASE_URL` to your production PostgreSQL instance (e.g. Google Cloud SQL for PostgreSQL or Supabase).
2. Run `npx prisma migrate deploy` or `npx prisma db push`.
3. Set your live `OPENAI_API_KEY` and `RAZORPAY_KEY_ID`.
4. Deploy using standard Next.js build: `npm run build` followed by `npm start`.
