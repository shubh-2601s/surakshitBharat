# Surakshit Bharat: Unified National Safety Intelligence Platform
> *Measure. Route. Resolve.*

![Surakshit Bharat Core](apps/web/public/india-gate-hero.jpg)

Surakshit Bharat is a unified civic-intelligence and national safety platform connecting four foundational dimensions through a shared data model and the district-level **Safety Grid™**:

1. **Community Safety** — Citizen hazard telemetry, unique reference logging (`SB-2026-XXXXXX`), SLA dispatch tracking, and photo closure verification.
2. **Local Manufacturing** — Standard product-batch registry, BIS compliance tracking, cryptographic QR verification (`/verify/:batchCode`), and manufacturer audits.
3. **Transport Safety** — High-risk corridor monitoring, highway blackspot remediation, and emergency medical response latency.
4. **Digital Safety** — Cyber threat syndication, active phishing advisories, and direct triage with the National Cyber Crime Helpline (1930).
5. **Suraksha Assistant (AI)** — Context-grounded assistant powered by Google Gemini API (`@google/genai`), restricted to authenticated users.

---

## 🏛️ Monorepo Layout
```
/apps/web            React 18 + TypeScript + Vite + Tailwind CSS (National Design System)
/api                 Vercel serverless function handlers
/packages/shared     Shared Zod schemas, domain models, cartogram matrix
/supabase/migrations SQL migrations with Row Level Security (RLS)
/supabase/seed.sql   Realistic demonstration dataset (is_demo = true)
/docs                Methodology, Architecture, and Security documentation
```

---

## 🚀 Quickstart & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-1.5-flash
APP_URL=http://localhost:5173
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch on **`http://localhost:5173`**.

---

## 🛡️ Database & Security Rules
- **Row Level Security (RLS)** is enforced on all tables.
- Citizens can only view and manage their own filed reports.
- Manufacturers can register batches, but **cannot approve their own claims**.
- Audit log is **append-only** (no update or delete policies exist).
- Missing data coverage ($<60\%$) is strictly presented as **"Insufficient Data"** (hatch pattern), never as a false claim of safety.

---

## 🌐 Production Deployment to Vercel
1. Import repository into [Vercel](https://vercel.com).
2. Set Build Command: `npm run build --workspace=@surakshit-bharat/web`
3. Set Output Directory: `apps/web/dist`
4. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `GEMINI_API_KEY`, etc.).
5. Deploy!
