# Surakshit Bharat: Safety Grid Methodology & Scoring Index

> **Classification:** Public Technical Reference  
> **Platform Tagline:** *Measure. Route. Resolve.*  
> **Status:** Demonstration Reference System (v1.0-DEMO)

---

## 1. Philosophical Mandate & Honesty Rules

Surakshit Bharat aggregates civic safety metrics across four foundational pillars:
1. **Community Safety (CS)** — civic hazards, public infrastructure, sanitation, and street lighting status.
2. **Local Manufacturing (LM)** — registered batch compliance, BIS/FSSAI certification coverage, and verified QR authenticity claims.
3. **Transport Safety (TS)** — arterial road risk, pothole and structural hazard density, blackspot resolution, and emergency medical response latency.
4. **Digital Safety (DS)** — active phishing syndrome advisories, cyber fraud grievance turnaround, and verified grievance resolution.

### Strict Honesty Constraints
- **Demonstration Data Disclosure:** All initial state and district figures in this prototype are demonstration records (`is_demo = true`). Every chart, table, and data grid prominently renders a "DEMO DATA" badge.
- **No False Assurances:** Incomplete data is **never** presented as an endorsement of safety. Districts with data completeness under the coverage threshold ($C < 60\%$) are classified as **"Insufficient Data"** and depicted using a distinct diagonal hatch pattern.
- **Auditability:** Every index computation exposes its raw sub-indicators, weighting coefficients, confidence intervals, and data source timestamps.

---

## 2. Mathematical Formulation

### 2.1 Sub-Indicator Normalization (Min-Max Scaling)
For any indicator $x_{i}$ in a district $d$:
$$z_{i,d} = \frac{x_{i,d} - \min(X_i)}{\max(X_i) - \min(X_i)} \times 100$$
Where lower values are desirable (e.g., average emergency response time, hazard backlog days), the indicator is inverted:
$$z_{i,d}^{\text{inv}} = 100 - z_{i,d}$$

### 2.2 Pillar Scores ($S_P$)
Each pillar score is the arithmetic mean of its normalized constituent sub-indicators:
$$S_{P,d} = \frac{1}{N_P} \sum_{i=1}^{N_P} z_{i,d}$$
Where $N_P$ is the number of active indicators for pillar $P \in \{\text{CS}, \text{LM}, \text{TS}, \text{DS}\}$.

### 2.3 Composite Safety Index ($S_{\text{composite}}$)
A composite score is evaluated **only** when data coverage $C_d \ge 60\%$:
$$S_{\text{composite},d} = \begin{cases} 
w_{\text{CS}} S_{\text{CS},d} + w_{\text{LM}} S_{\text{LM},d} + w_{\text{TS}} S_{\text{TS},d} + w_{\text{DS}} S_{\text{DS},d} & \text{if } C_d \ge 0.60 \\
\text{NULL (Insufficient Data)} & \text{otherwise}
\end{cases}$$

Default Weights:
- $w_{\text{CS}} = 0.25$
- $w_{\text{LM}} = 0.25$
- $w_{\text{TS}} = 0.25$
- $w_{\text{DS}} = 0.25$

---

## 3. Data Ingestion & Audit Trail

| Pillar | Ingestion Source (Demo Mock) | Sync Cadence | Confidence Threshold |
| :--- | :--- | :--- | :--- |
| Community Safety | Municipal Hazard Telemetry & Citizen Reports | Hourly | 95% Geo-tagged |
| Local Manufacturing | National Certification Registry & Batch Verification Logs | Daily | Cryptographic QR Salt |
| Transport Safety | Arterial Highway Monitoring & Police First Response Log | Realtime (15 min) | Telematics / Dispatch Timestamp |
| Digital Safety | Indian Cyber Crime Coordination Centre (I4C) & Advisories | 30 minutes | Authority Verified Source |

---

## 4. Limitations & Known Caveats
1. **Reporting Density Bias:** Higher smartphone penetration in urban districts may artificially elevate hazard report counts compared to rural districts.
2. **Verification Latency:** Manufacturing batch verification logs require physical lab sampling for dispute resolutions.
3. **Temporal Sensitivity:** Monsoon weather patterns temporarily increase road risk factors across coastal corridors.
