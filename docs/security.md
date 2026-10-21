# Surakshit Bharat: Security Architecture & Access Control

## Defense in Depth (3 Layers)
1. **Supabase PostgreSQL Row Level Security (RLS)**: Enforced directly on the database engine.
2. **Serverless Function Guarding (`/api`)**: All mutations verify the Supabase JWT, authenticate claims, and validate input payloads with Zod.
3. **Client-side Route Guards**: Smooth UI experience for citizens, manufacturers, authorities, and administrators.

## Role Permissions Matrix

| Resource / Action | Public | Citizen | Manufacturer | Authority | Admin |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Read Safety Grid Aggregates | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit Hazard Report | ❌ | ✅ | ❌ | ❌ | ❌ |
| View Own Hazard Reports | ❌ | ✅ | ❌ | ❌ | ❌ |
| Update Hazard Status | ❌ | ❌ | ❌ | ✅ (In District) | ✅ |
| Submit Batch Claim | ❌ | ❌ | ✅ (Own batches) | ❌ | ❌ |
| Approve Batch Claim | ❌ | ❌ | ❌ (Strictly Prohibited) | ❌ | ✅ |
| Publish Digital Advisories | ❌ | ❌ | ❌ | ❌ | ✅ |
| Access Suraksha Assistant | ❌ | ✅ (Signed In) | ✅ (Signed In) | ✅ (Signed In) | ✅ (Signed In) |
