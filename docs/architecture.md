# Surakshit Bharat: System Architecture Overview

```mermaid
graph TD
    Client["React 18 + Vite (apps/web)"]
    VercelEdge["Vercel Edge & Serverless Functions (/api)"]
    Supabase["Supabase (PostgreSQL, Auth, Storage, RLS)"]
    Gemini["Google Gemini 1.5/Flash AI Engine (@google/genai)"]

    Client -->|HTTP/REST / JWT| VercelEdge
    Client -->|Direct Read Anon RLS| Supabase
    VercelEdge -->|Service Role Key & Mutation RLS| Supabase
    VercelEdge -->|Server-side SSE streaming| Gemini
```

## Directory Structure
- `/apps/web`: React 18, Tailwind CSS, Lucide icons, Framer Motion, TanStack Query, React Router, Cartogram & Chart visualizers.
- `/packages/shared`: Domain types, Zod schemas, cartogram coordinates, indicator calculation helpers.
- `/api`: Node 20 TypeScript serverless functions with Zod validation, JWT verification, and Gemini assistant endpoints.
- `/supabase/migrations`: SQL schema migrations with RLS enabled on all tables.
- `/supabase/seed.sql`: Realistic demonstration dataset (`is_demo = true`).
