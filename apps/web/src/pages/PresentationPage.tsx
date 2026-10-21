import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Layers,
  Activity,
  Factory,
  Car,
  Lock,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Database,
  ArrowRight,
  FileText,
  Users,
  Compass,
  Zap,
  Globe,
  Share2,
  Download,
  HelpCircle,
  QrCode,
  ShieldAlert,
  PhoneCall,
  Camera,
  ShieldCheck,
  MapPin,
  Check,
  Copy
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  category: string;
  accent: string;
  bgImage: string;
  bgCaption: string;
  content: {
    heading: string;
    description: string;
    keyPoints: { title: string; desc: string; icon: React.ElementType }[];
    metrics?: { label: string; value: string; sub: string }[];
    pipelineSteps?: { step: string; action: string; time: string }[];
  };
  speakerNotes: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Surakshit Bharat (सुरक्षित भारत)',
    subtitle: 'Unified National Safety Intelligence & Civic Hazard Resolution Platform',
    badge: 'EXECUTIVE OVERVIEW • 2026 PILOT',
    category: 'Vision & Inception',
    accent: '#FF8A1F',
    bgImage: '/india-gate-hero.jpg',
    bgCaption: 'India Gate National Monument, New Delhi',
    content: {
      heading: 'Safer People. Stronger Communities. A Surakshit Bharat.',
      description:
        'A unified digital public infrastructure engineered to dismantle administrative silos across civic infrastructure, local manufacturing standards, arterial transport corridors, and national cybersecurity defense.',
      keyPoints: [
        {
          title: 'Direct Citizen Empowerment',
          desc: 'Zero-barrier incident intake with EXIF geo-coordinates, tamper-proof audit trails, and automatic SLA escalation.',
          icon: Users
        },
        {
          title: 'The 4-Pillar Unified Data Mesh',
          desc: 'Physical hazards, product authenticity, transport corridors, and cyber advisories connected into one index.',
          icon: Layers
        },
        {
          title: 'The Safety Grid™ Cartogram',
          desc: 'Equal-area demographic map representing all 36 States & UTs with transparent district safety metrics.',
          icon: Compass
        },
        {
          title: 'Executive AI Advisory',
          desc: 'Suraksha AI with strict fair-share rate limits and structured safety briefings.',
          icon: Bot
        }
      ],
      metrics: [
        { label: 'Pilot Reports Logged', value: '11,362', sub: '1,114 Active • 10,248 Solved' },
        { label: 'Districts Monitored', value: '788', sub: '100% Coverage (36 States/UTs)' },
        { label: 'Verified Batches', value: '3,820', sub: 'BIS IS Standards Correlated' },
        { label: 'Active Nodal Authorities', value: '750+', sub: 'Police, NHAI, Cyber Desks' }
      ]
    },
    speakerNotes:
      "Good morning distinguished panel and members. I am proud to introduce Surakshit Bharat—our unified national safety intelligence platform. In a nation of 1.4 billion citizens across 788 districts, safety cannot function in disconnected silos. Surakshit Bharat creates a single digital nervous system connecting four core pillars: community civic hazards, local manufacturing authenticity, transport road safety, and digital financial defense."
  },
  {
    id: 2,
    title: 'The Problem: Fragmented Safety Silos',
    subtitle: 'Why Traditional Municipal & National Safety Governance Fails Today',
    badge: 'PROBLEM STATEMENT & GAP ANALYSIS',
    category: 'Context & Urgency',
    accent: '#D7263D',
    bgImage: '/secretariat-bg.jpg',
    bgCaption: 'Central Secretariat & North Block, New Delhi',
    content: {
      heading: 'Critical Breakdowns Across the Current Governance Ecosystem',
      description:
        'Citizens face four major structural friction points when confronting hazardous public conditions, counterfeit industrial goods, highway blackspots, and sophisticated cyber syndicates.',
      keyPoints: [
        {
          title: '1. The Intake Black Hole',
          desc: 'Citizen reports submitted to fragmented municipal helplines disappear without tracking numbers, timestamps, or public accountability.',
          icon: AlertTriangle
        },
        {
          title: '2. Proliferation of Counterfeits',
          desc: 'Local markets are flooded with counterfeit electrical wiring, TMT rebars, and spurious goods with zero instant QR verification for end-users.',
          icon: Factory
        },
        {
          title: '3. Unaudited Highway Corridors',
          desc: 'Expressway blackspots, unlit culverts, and dangerous potholes recur along freight routes with emergency response latencies exceeding 35 minutes.',
          icon: Car
        },
        {
          title: '4. Rapid Cyber Syndicate Spread',
          desc: 'Phishing rings, fake electricity bill APKs, and fraud syndicates siphon life savings before traditional police FIRs can even be filed.',
          icon: Lock
        }
      ]
    },
    speakerNotes:
      "To understand why Surakshit Bharat is transformative, look at the ground reality today. When a citizen sees a snapped high-tension wire or an unbarricaded trench, they have no easy way to report it with location proof. Furthermore, local manufacturers face unfair competition from counterfeit goods. Highway accidents recur in the exact same blind spots, and digital scams outpace traditional bureaucracy. Surakshit Bharat solves all four simultaneously."
  },
  {
    id: 3,
    title: 'The Solution: The 4-Pillar Unified Mesh',
    subtitle: 'Four Interlocking Dimensions of National Public Defense',
    badge: 'CORE ARCHITECTURE',
    category: 'Platform Pillars',
    accent: '#FF8A1F',
    bgImage: '/civic-smartcity-bg.jpg',
    bgCaption: 'Indian Smart City Infrastructure & Metro Network',
    content: {
      heading: 'A Single Digital Nervous System Across Physical & Cyber Spaces',
      description:
        'Rather than building separate isolated apps, Surakshit Bharat harmonizes four key pillars into a composite, real-time safety score.',
      keyPoints: [
        {
          title: 'Pillar 01 • Community Safety',
          desc: 'Broken utilities, open manholes, hazardous wiring, and civic anomalies with guaranteed 45-minute jurisdictional dispatch.',
          icon: Users
        },
        {
          title: 'Pillar 02 • Local Manufacturing',
          desc: 'Cryptographic QR batch lookup, BIS (Bureau of Indian Standards) IS license validation, and counterfeit containment.',
          icon: Factory
        },
        {
          title: 'Pillar 03 • Transport Corridors',
          desc: 'National Highway corridor auditing, blackspot remediation tracking, and emergency ambulance dispatch latency metrics.',
          icon: Car
        },
        {
          title: 'Pillar 04 • Digital Safety Command',
          desc: 'Live CERT-In and I4C verified fraud bulletins, malicious APK warnings, and direct emergency routing to National Helpline 1930.',
          icon: Lock
        }
      ]
    },
    speakerNotes:
      "Surakshit Bharat is structured into four distinct pillars. Pillar 1 addresses community civic hazards. Pillar 2 safeguards local manufacturing and product standards via cryptographic batch verification. Pillar 3 tracks transport corridor hazards and ambulance response times. Pillar 4 protects digital citizens with live threat advisories and direct 1930 cyber helpline integration. Each pillar contributes 25% to a district's overall Safety Index."
  },
  {
    id: 4,
    title: 'Pillar 1: Community Hazard Triage',
    subtitle: 'Geo-Referenced Intake & SLA-Bound Municipal Escalation',
    badge: 'PILLAR DEEP-DIVE • COMMUNITY',
    category: 'Features & Workflow',
    accent: '#FF8A1F',
    bgImage: '/civic-smartcity-bg.jpg',
    bgCaption: 'Urban Infrastructure Corridor & Municipal Wards',
    content: {
      heading: 'Zero-Barrier Reporting with Cryptographic Accountability',
      description:
        'Citizens can file a geo-verified hazard report in under 60 seconds with no mandatory registration barrier, protecting user privacy.',
      keyPoints: [
        {
          title: 'Instant GPS & Camera Verification',
          desc: 'Browser-native geolocation lock plus EXIF timestamp validation to eliminate prank or stale incident reports.',
          icon: Compass
        },
        {
          title: '32+ Municipal Jurisdictions Pre-Mapped',
          desc: 'Quick-select pills for major municipal wards across Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, and Kolkata.',
          icon: Compass
        },
        {
          title: 'Automated 72-Hour SLA Timer',
          desc: 'Dispatched to assigned departmental engineers with countdown timers and automated escalation to district magistrates.',
          icon: Zap
        },
        {
          title: 'Unique Incident Reference Ref #',
          desc: 'Generates ref numbers like SB-2026-00412 for public tracking without exposing the citizen’s mobile number or identity.',
          icon: FileText
        }
      ]
    },
    speakerNotes:
      "Let's look at how a citizen interacts with Community Safety. A citizen spots a broken high-voltage cable. They open Surakshit Bharat on their mobile browser, take a photo, and click 'Auto-Detect Location'. The platform captures the GPS coordinates, hashes the report into our municipal queue, and hands the citizen a tracking reference like SB-2026-00418. No account registration is forced, removing all friction."
  },
  {
    id: 5,
    title: 'Pillar 2: Manufacturing Integrity & QR Batch Verification',
    subtitle: 'Cryptographic Supply Chain Audits & BIS Standard Conformance',
    badge: 'PILLAR DEEP-DIVE • MANUFACTURING',
    category: 'Features & Standards',
    accent: '#0F9D8A',
    bgImage: '/manufacturing-bg.jpg',
    bgCaption: 'Advanced Precision Certification & Materials Testing Lab',
    content: {
      heading: 'Protecting Genuine Indian Industry from Illicit Counterfeits',
      description:
        'Local manufacturers register certified product batches backed by Bureau of Indian Standards (BIS) and FSSAI license numbers.',
      keyPoints: [
        {
          title: 'Instant QR / Barcode Scan',
          desc: 'Consumers or field inspectors scan batch codes on construction rebars, electrical conduits, or fire safety valves.',
          icon: QrCode
        },
        {
          title: 'Cryptographic Hash Verification',
          desc: 'Validates SHA-256 digital signatures matching manufacturer license records (e.g. BIS IS 694:2010).',
          icon: CheckCircle2
        },
        {
          title: 'Spurious Goods Alert System',
          desc: 'When an unregistered batch is detected, consumers can lodge an instant counterfeit report alerting standard enforcement officers.',
          icon: AlertTriangle
        },
        {
          title: 'Public Manufacturer Directory',
          desc: 'Ranked registry of verified domestic manufacturers with transparent compliance scores and active license validity.',
          icon: Factory
        }
      ]
    },
    speakerNotes:
      "Pillar 2 focuses on industrial and consumer protection. Counterfeit electrical wiring and substandard TMT steel rebars cause thousands of residential fires and structural failures every year. Under Surakshit Bharat, legitimate manufacturers generate cryptographic QR codes for every batch. An electrician or homeowner simply scans the QR code on the packaging to confirm BIS IS compliance instantly."
  },
  {
    id: 6,
    title: 'Pillar 3: Transport Corridors & Road Safety',
    subtitle: 'Corridor Risk Indexing, Blackspot Remediations & EMS Latency',
    badge: 'PILLAR DEEP-DIVE • TRANSPORT',
    category: 'Highways & Telemetry',
    accent: '#F2B705',
    bgImage: '/expressway-hero.jpg',
    bgCaption: 'Modern National Freight Expressway & Arterial Corridor',
    content: {
      heading: 'Transforming Golden Quadrilateral & National Expressways',
      description:
        'Continuous road condition auditing, dynamic pothole resurfacing logs, and real-time ambulance dispatch telemetry across high-speed sectors.',
      keyPoints: [
        {
          title: 'Arterial Corridor Audits',
          desc: 'Monitors 44,120 km of national highways including NH-44, NH-48, NH-66, and the Delhi-Mumbai Expressway.',
          icon: Car
        },
        {
          title: 'Accident Blackspot Curing',
          desc: 'Identifies high-frequency collision clusters, enforcing barrier installation and reflective studs within 14 days.',
          icon: AlertTriangle
        },
        {
          title: 'EMS Golden-Hour Latency Tracking',
          desc: 'Measures highway ambulance dispatch speed (averaging 13.8 minutes) to preserve trauma survival rates.',
          icon: Zap
        },
        {
          title: 'Live NHAI & Traffic Police Feeds',
          desc: 'Direct integration with National Highway Helpline (1033) and regional transport command centres.',
          icon: Shield
        }
      ]
    },
    speakerNotes:
      "Turning to Pillar 3: Road safety. India accounts for roughly 11% of global road fatalities. Surakshit Bharat maps highway corridors such as the NH-48 Mumbai-Pune Expressway and NH-44. We track identified blackspots, road maintenance tickets, and average ambulance response times, helping regional transport offices reduce fatalities through data-driven engineering."
  },
  {
    id: 7,
    title: 'Pillar 4: Digital Vigilance & Cyber Command',
    subtitle: 'Real-Time Fraud Advisories, Malicious APK Triage & 1930 Integration',
    badge: 'PILLAR DEEP-DIVE • DIGITAL SAFETY',
    category: 'Cyber Defense',
    accent: '#4C5BD4',
    bgImage: '/digital-safety-bg.jpg',
    bgCaption: 'NCSC National Cyber Security Command Operations Room',
    content: {
      heading: 'Protecting Digital India from Evolving Cyber Crime Syndicates',
      description:
        'Coordinating citizen vigilance with CERT-In and Indian Cyber Crime Coordination Centre (I4C) official security directives.',
      keyPoints: [
        {
          title: 'Verified Threat Bulletins',
          desc: 'Real-time advisories against active malware syndicates, fake electricity bill SMS APKs, and fake job rings.',
          icon: ShieldAlert
        },
        {
          title: 'National Helpline 1930 Integration',
          desc: 'One-tap dialer for rapid financial fraud reporting to freeze stolen funds within the golden hour.',
          icon: PhoneCall
        },
        {
          title: 'Inter-Bank Mule Account Coordination',
          desc: 'Highlights the national recovery framework that has currently safeguarded ₹48.2 Crores in pilot districts.',
          icon: Database
        },
        {
          title: 'Citizen Cyber Hygiene Guides',
          desc: 'Practical, step-by-step guidance on reporting fake WhatsApp callers, loan shark APKs, and unauthorized UPI debits.',
          icon: CheckCircle2
        }
      ]
    },
    speakerNotes:
      "Pillar 4 addresses our digital lifeline. As digital payments reach hundreds of millions of citizens, cyber syndicates have become organized. Surakshit Bharat publishes verified alerts from CERT-In and I4C regarding phishing APKs and fake government schemes. Crucially, we provide direct one-tap calling to the 1930 Cyber Crime Helpline so stolen funds can be frozen within the golden hour."
  },
  {
    id: 8,
    title: 'The Safety Grid™ Cartogram',
    subtitle: 'Demographic Equal-Area Tile Matrix Benchmarking 36 States & UTs',
    badge: 'DATA VISUALIZATION & SCORING',
    category: 'Analytics & Maps',
    accent: '#FF8A1F',
    bgImage: '/civic-hero-bg.jpg',
    bgCaption: 'National Cartogram Telemetry & Defense Mesh',
    content: {
      heading: 'Visualizing National Safety without Geographical Area Distortion',
      description:
        'Traditional geographic maps overemphasize large, sparsely populated regions while shrinking dense states. The Safety Grid™ uses an 8x9 equal-area tile cartogram.',
      keyPoints: [
        {
          title: 'Equal-Representation Matrix',
          desc: 'Every state and union territory from Ladakh (LA) to Kerala (KL) receives equal visual weight in telemetry evaluation.',
          icon: Compass
        },
        {
          title: 'Interactive Pillar Filter',
          desc: 'Toggle between Overall Safety, Community Safety, Manufacturing Standards, Transport, and Digital Safety scores.',
          icon: Layers
        },
        {
          title: 'Insufficient Data Guardrails',
          desc: 'States with less than 60% verifiable telemetry are rendered with diagonal hatching to maintain scientific integrity.',
          icon: AlertTriangle
        },
        {
          title: 'Side-by-Side Comparison & CSV Export',
          desc: 'Compare up to 4 states simultaneously and export full raw dataset for urban planners and research institutes.',
          icon: Download
        }
      ]
    },
    speakerNotes:
      "Here is one of our proudest innovations: The Safety Grid Cartogram. On a standard map, Ladakh and Rajasthan look huge, while Delhi and Goa almost disappear, despite having massive population densities. Our 8 by 9 cartogram gives every state equal visual representation. Users can filter by individual pillars, inspect district counts, and even export raw CSV data for public auditability."
  },
  {
    id: 9,
    title: 'Suraksha AI: Executive Intelligence Briefing',
    subtitle: 'Senior National Safety Intelligence Advisor',
    badge: 'ARTIFICIAL INTELLIGENCE & GOVERNANCE',
    category: 'AI Advisory',
    accent: '#10B981',
    bgImage: '/digital-safety-bg.jpg',
    bgCaption: 'Executive Intelligence & Command Terminal',
    content: {
      heading: 'Context-Aware National Safety Assistant with Fair-Use Quotas',
      description:
        'An executive intelligence agent providing regulatory guidance, ticket lookups, and incident remediation procedures in natural language.',
      keyPoints: [
        {
          title: 'Executive Briefing Demeanor',
          desc: 'Calm, authoritative, objective advice quoting Indian safety statutes (BIS Act 2016, Motor Vehicles Act, IT Act 2000).',
          icon: Bot
        },
        {
          title: 'Structured Professional Layout',
          desc: 'Renders response cards with status chips, step-by-step procedural badges, and urgent hotline callouts.',
          icon: FileText
        },
        {
          title: 'Sliding-Window Rate Limiter',
          desc: 'Protects compute resources with a client-side limiter: 30 requests/day per user with max 2 requests/minute burst.',
          icon: Zap
        },
        {
          title: 'Emergency Life-Safety Protocol',
          desc: 'Immediately emphasizes dialing 112 or 1930 before providing informational AI responses for dangerous emergencies.',
          icon: AlertTriangle
        }
      ]
    },
    speakerNotes:
      "Suraksha AI is not just a standard chatbot; it is an executive national safety intelligence officer. It provides clear, structured briefings referencing statutory acts like the Motor Vehicles Act and BIS standard codes. To prevent resource abuse, we built a custom sliding-window rate limiter enforcing 30 requests per user per day with real-time countdown meters."
  },
  {
    id: 10,
    title: 'The End-to-End Incident Lifecycle',
    subtitle: 'The 5-Stage Pipeline from Citizen Detection to Composite Indexing',
    badge: 'OPERATIONAL PIPELINE',
    category: 'Incident Resolution',
    accent: '#FF8A1F',
    bgImage: '/civic-smartcity-bg.jpg',
    bgCaption: 'Municipal Rapid Action Units & Metropolitan Operations',
    content: {
      heading: 'How a Civic Anomaly is Ingested, Validated, and Measured',
      description:
        'Every single reported incident progresses through a strict, transparent 5-stage cryptographic lifecycle.',
      keyPoints: [
        {
          title: 'Stage 01 • INGESTION (Citizen Detection)',
          desc: 'Citizen captures coordinates, timestamp, and photograph. Ingestion latency < 1.4 seconds.',
          icon: Camera
        },
        {
          title: 'Stage 02 • TRIAGE (Spatial Deduplication)',
          desc: 'Spatial clustering matches reports within a 50m radius with 99.2% duplicate suppression accuracy.',
          icon: CheckCircle2
        },
        {
          title: 'Stage 03 • DISPATCH (Departmental SLA)',
          desc: 'Dispatched to zonal engineers with mandatory 72-hour countdown timers bound to officer credentials.',
          icon: Zap
        },
        {
          title: 'Stage 04 • RESOLUTION (Photographic Proof)',
          desc: 'Field teams upload GPS-locked after-photos. Citizen receives notification to approve or dispute work.',
          icon: ShieldCheck
        }
      ],
      pipelineSteps: [
        { step: '01. Ingestion', action: 'EXIF Timestamp & Coordinates Hashed', time: '0 min' },
        { step: '02. Triage', action: 'Spatial Clustering & Nodal Officer Verification', time: '12 min' },
        { step: '03. Dispatch', action: 'Assigned to Field Unit with 72-hr SLA Timer', time: '45 min' },
        { step: '04. Resolution', action: 'Rectification & GPS After-Photos Uploaded', time: '48 hrs' },
        { step: '05. Synthesis', action: 'District Score Recalculated in Public Grid', time: 'Instant' }
      ]
    },
    speakerNotes:
      "Let's trace the full pipeline: Stage 1 is Ingestion, where photos and coordinates are securely recorded. Stage 2 is Triage, where our spatial clustering engine filters duplicates within 50 meters. Stage 3 is Dispatch, routing the ticket to municipal road or power engineers with a strict SLA. Stage 4 is Resolution, requiring geo-tagged after-photos. Finally, Stage 5 is Synthesis, which instantly recalculates that district's live safety index."
  },
  {
    id: 11,
    title: 'Technical Architecture & Security Stack',
    subtitle: 'Engineered for Scale, Privacy, and Sovereign Data Integrity',
    badge: 'TECHNICAL SPECIFICATIONS',
    category: 'Engineering & Stack',
    accent: '#4C5BD4',
    bgImage: '/secretariat-bg.jpg',
    bgCaption: 'Sovereign Digital Architecture & Ministry Infrastructure',
    content: {
      heading: 'Enterprise Web Stack Designed for Resilient Public Deployment',
      description:
        'Built with an ultra-fast, modern reactive architecture supporting offline-first edge interactions, robust cryptographic hashing, and dual-layer multilingual translation.',
      keyPoints: [
        {
          title: 'Frontend: React 18 & Vite & Framer Motion',
          desc: 'High-performance SPA with client-side routing, animated page transitions, responsive mobile drawer navigation, and dark/editorial theme toggles.',
          icon: Zap
        },
        {
          title: 'Backend & Data: Supabase & PostgreSQL',
          desc: 'Row-Level Security (RLS) policies enforcing role-based permissions (Citizen, Authority, Manufacturer, Admin) with cryptographic audit logging.',
          icon: Database
        },
        {
          title: 'AI Intelligence & Executive Advisory Engine',
          desc: 'Zero-secret frontend architecture utilizing serverless proxy routing and client-side sliding window quota limiters.',
          icon: Bot
        },
        {
          title: 'Dual-Layer Multilingual Engine',
          desc: 'Instant switching between English, हिन्दी (Hindi), and தமிழ் (Tamil) across all DOM nodes and telemetry badges.',
          icon: Globe
        }
      ]
    },
    speakerNotes:
      "Our engineering architecture is built on React 18, Vite, and TailwindCSS with Framer Motion animations. We use Supabase with PostgreSQL and strict Row-Level Security policies. For intelligence, we integrate sovereign executive AI models with sanitized server environment variables. Crucially, the platform includes a dual-layer neural translation engine, allowing instant translation into Hindi and Tamil for true national accessibility."
  },
  {
    id: 12,
    title: 'How to Use: Citizen, Officer & Inspector Guide',
    subtitle: 'Step-by-Step Practical Workflows for Every Stakeholder Persona',
    badge: 'USER GUIDE & DEMONSTRATION WORKFLOWS',
    category: 'User Guide',
    accent: '#10B981',
    bgImage: '/civic-hero-bg.jpg',
    bgCaption: 'Stakeholder Portals & Citizen Engagement Console',
    content: {
      heading: 'Intuitive Journeys for Citizens, Manufacturers, and Field Authorities',
      description:
        'Every user persona has a dedicated, tailored operational interface to ensure fast adoption and zero training friction.',
      keyPoints: [
        {
          title: 'For Citizens: Spot, Snap, Track',
          desc: '1. Click "Report Hazard" on mobile or desktop.\n2. Pick domain (Community, Transport, etc.).\n3. Upload photo or auto-detect GPS location.\n4. Save reference (e.g. SB-2026-00412) to track live status anytime.',
          icon: Users
        },
        {
          title: 'For Field Officers: Command & Audit Console',
          desc: '1. Sign in as Officer.\n2. Review incoming ticket queues sorted by urgency.\n3. Reassign engineers, adjust status, and submit photographic resolution proof with notes.\n4. Inspect tamper-proof cryptographic audit log.',
          icon: Shield
        },
        {
          title: 'For Consumers & Inspectors: Batch QR Check',
          desc: '1. Navigate to "Verify QR".\n2. Scan or enter manufacturer batch code.\n3. Verify official BIS license, testing lab endorsement, and expiration hash.',
          icon: QrCode
        },
        {
          title: 'For Decision Makers: Safety Grid Cartogram',
          desc: '1. Open "Safety Grid".\n2. Compare state rankings side-by-side.\n3. Filter by individual pillars and export CSV for administrative review.',
          icon: Compass
        }
      ]
    },
    speakerNotes:
      "How do different stakeholders use Surakshit Bharat? Citizens simply click 'Report Hazard', upload a photo, and receive a tracking reference. Field officers log into the Authority Console to review tickets, update resolution notes, and inspect audit logs. Consumers scan QR codes on manufactured goods to check BIS certifications. And administrators use the Safety Grid to identify districts that need urgent civic funding."
  },
  {
    id: 13,
    title: 'Impact, Current Metrics & Future Roadmap',
    subtitle: 'From Demonstration Pilot to Nationwide Sovereign Deployment',
    badge: 'IMPACT & FUTURE HORIZONS',
    category: 'Roadmap & Next Steps',
    accent: '#FF8A1F',
    bgImage: '/india-gate-hero.jpg',
    bgCaption: 'India Gate National Monument, Twilight Horizon',
    content: {
      heading: 'Empowering 1.4 Billion Citizens with Data-Driven Safety',
      description:
        'Surakshit Bharat has validated core workflows across 788 simulated districts. Our roadmap targets integration with DigiLocker, drone highway surveillance, and automated IoT water telemetry.',
      keyPoints: [
        {
          title: '11,362 Pilot Incidents Logged',
          desc: 'Demonstrating real-time ingestion, triage deduplication, and SLA resolution across metropolitan and rural corridors.',
          icon: CheckCircle2
        },
        {
          title: 'Next: Drone & Satellite Road Auditing',
          desc: 'Automating highway pothole detection using satellite high-res imagery and drone LiDAR scans along national expressways.',
          icon: Zap
        },
        {
          title: 'Next: DigiLocker & Aadhaar Sign-off',
          desc: 'Enabling verified citizens to digitally endorse municipal resolution certificates directly via DigiLocker credentials.',
          icon: ShieldCheck
        },
        {
          title: 'Conclusion: Measure. Route. Resolve.',
          desc: 'Surakshit Bharat delivers transparency, accountability, and unified protection for every Indian neighborhood.',
          icon: Shield
        }
      ],
      metrics: [
        { label: 'Demonstrated Resolution Rate', value: '91.4%', sub: 'Within 72-hour statutory window' },
        { label: 'Duplicate Suppression', value: '99.2%', sub: 'Zero redundant field dispatch' },
        { label: 'Multi-Lingual Coverage', value: '3 Languages', sub: 'English, हिन्दी, தமிழ்' },
        { label: 'Pilot National Score', value: '78.4 / 100', sub: 'Composite National Baseline' }
      ]
    },
    speakerNotes:
      "In conclusion, Surakshit Bharat proves that modern technology can transform public safety from a reactive grievance process into an intelligent, proactive data mesh. With 11,362 pilot records verified across 788 districts, our next steps include drone highway audits and DigiLocker integration. We invite everyone to explore the live platform and join our mission: Measure, Route, and Resolve. Jai Hind!"
  }
];

export const PresentationPage: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);

  const slide = SLIDES[currentSlideIndex];
  const totalSlides = SLIDES.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  // Keyboard Navigation: Arrow Left, Arrow Right, Spacebar, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [autoPlay, currentSlideIndex]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const copyNotesToClipboard = () => {
    navigator.clipboard.writeText(slide.speakerNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  return (
    <div className="relative min-h-[92vh] w-full bg-ink text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Dynamic Animated Landmark Photographic Background with Crossfade Transition (Matching Hero Section exactly) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.bgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.9, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.bgImage}
              alt={slide.bgCaption}
              className="w-full h-full object-cover object-center brightness-95 contrast-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft Cinematic Vignettes - Matches HeroSection so landmark is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="absolute inset-0 bg-grain opacity-30" />

        {/* Dynamic Topic-Specific Ambient Glows */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse transition-colors duration-700"
          style={{ backgroundColor: slide.accent }}
        />
        <div
          className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse transition-colors duration-700"
          style={{ backgroundColor: slide.accent }}
        />
      </div>

      {/* Top Presentation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 border-b border-hairline border-white/10 flex items-center justify-between backdrop-blur-md bg-ink/75 shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-saffron transition-colors"
          >
            <Shield className="w-4 h-4 text-saffron" />
            <span className="font-bold text-white font-serif text-sm">Surakshit Bharat</span>
            <span className="hidden sm:inline text-[10px] text-neutral-400">• National Presentation</span>
          </Link>
        </div>

        {/* Slide Counter & Progress Pills */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 hidden md:flex">
            {SLIDES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                title={`Slide ${idx + 1}: ${s.title}`}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'w-7 bg-saffron shadow-sm'
                    : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-saffron font-bold text-[11px] shadow-sm">
            Slide {slide.id} of {totalSlides}
          </span>
        </div>

        {/* Controls: AutoPlay, Speaker Notes, Fullscreen */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            title={autoPlay ? "Pause Auto-play" : "Start Auto-play (8s)"}
            className={`p-2 rounded-lg border transition-all ${
              autoPlay
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm'
                : 'border-white/15 hover:bg-white/10 text-neutral-300'
            }`}
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            title="Toggle Speaker Notes (N key)"
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              showNotes
                ? 'bg-saffron text-ink font-bold border-saffron shadow-sm'
                : 'border-white/15 hover:bg-white/10 text-neutral-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Script</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen (F key)"
            className="p-2 rounded-lg border border-white/15 hover:bg-white/10 text-neutral-300 transition-all hidden sm:block"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Slide Canvas with Open Cinematic 2-Column Layout */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Editorial Headline & Overview (Directly over vivid landmark background) */}
              <div className="lg:col-span-5 flex flex-col justify-center text-white">
                {/* Setting & Category Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-xs">
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border shadow-sm backdrop-blur-md"
                    style={{
                      color: slide.accent,
                      borderColor: `${slide.accent}50`,
                      backgroundColor: `${slide.accent}20`
                    }}
                  >
                    {slide.badge}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ink/75 border border-white/15 text-neutral-300 text-[10px] backdrop-blur-md">
                    <MapPin className="w-3 h-3 text-saffron shrink-0" />
                    <span>{slide.bgCaption}</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.12] mb-3 text-paper drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {slide.title}
                </h1>

                <p className="font-sans text-sm sm:text-base text-neutral-200 leading-relaxed mb-4 font-light drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)] max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="p-4 rounded-2xl bg-ink/75 border border-white/15 backdrop-blur-md mb-4 shadow-xl">
                  <h3
                    className="font-serif text-base sm:text-lg font-bold mb-1"
                    style={{ color: slide.accent }}
                  >
                    {slide.content.heading}
                  </h3>
                  <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                    {slide.content.description}
                  </p>
                </div>

                {/* Optional Metrics Row */}
                {slide.content.metrics && (
                  <div className="grid grid-cols-2 gap-2.5 font-mono">
                    {slide.content.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-ink/75 border border-white/15 backdrop-blur-md shadow-md"
                      >
                        <div className="text-xl sm:text-2xl font-bold font-serif text-white">{m.value}</div>
                        <div className="text-[10.5px] text-neutral-300 font-sans font-medium mt-0.5">{m.label}</div>
                        <div className="text-[9px] text-neutral-400 font-mono mt-0.5">{m.sub}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Feature Cards with Airy Semi-Transparent Glass */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {slide.content.keyPoints.map((point, idx) => {
                    const Icon = point.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * idx, duration: 0.3 }}
                        className="p-4 rounded-2xl bg-ink/70 hover:bg-ink/85 border border-white/15 hover:border-saffron/50 backdrop-blur-md transition-all shadow-xl flex items-start gap-3.5 group hover:scale-[1.02]"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-md group-hover:scale-110 transition-transform"
                          style={{
                            backgroundColor: `${slide.accent}20`,
                            borderColor: `${slide.accent}50`,
                            color: slide.accent
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-mono text-xs sm:text-sm font-bold text-white mb-1 drop-shadow-sm">
                            {point.title}
                          </h4>
                          <p className="font-sans text-xs text-neutral-300 leading-relaxed whitespace-pre-line">
                            {point.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Optional Pipeline Steps Strip */}
                {slide.content.pipelineSteps && (
                  <div className="p-4 rounded-2xl bg-ink/75 border border-white/15 backdrop-blur-md shadow-xl">
                    <div className="text-[11px] font-mono uppercase text-neutral-300 font-bold mb-2.5">
                      5-Stage Operational Pipeline:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                      {slide.content.pipelineSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 flex flex-col justify-between"
                        >
                          <div className="text-saffron font-bold text-[10px] uppercase mb-1">
                            {step.step}
                          </div>
                          <div className="text-[10.5px] text-neutral-200 font-sans leading-tight mb-1.5">
                            {step.action}
                          </div>
                          <div className="text-[9.5px] text-neutral-400 font-mono">
                            SLA: <strong className="text-emerald-400">{step.time}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Speaker Notes Drawer (Collapsible) with Copy Script Action */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="relative z-20 w-full bg-ink-card/95 border-t border-saffron/40 px-4 sm:px-8 py-3.5 backdrop-blur-xl shadow-2xl"
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 flex-1">
                <span className="p-1 rounded bg-saffron/20 text-saffron font-mono text-[10px] font-bold uppercase shrink-0 mt-0.5">
                  SPEAKER TALKING POINTS
                </span>
                <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  "{slide.speakerNotes}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={copyNotesToClipboard}
                  className="px-2.5 py-1 rounded-lg border border-white/15 hover:border-saffron text-neutral-300 hover:text-white font-mono text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copiedNotes ? (
                    <>
                      <Check className="w-3 h-3 text-indiagreen" />
                      <span className="text-indiagreen font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-saffron" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] font-mono text-neutral-500 hidden md:inline">
                  Press <strong>N</strong> to toggle • Use <strong>← / →</strong> or <strong>Space</strong>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Dock */}
      <footer className="relative z-20 w-full px-4 sm:px-8 py-3.5 border-t border-white/10 flex items-center justify-between backdrop-blur-md bg-ink/70">
        <button
          onClick={prevSlide}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-all hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Slide</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <span className="hidden md:inline">
            Use keyboard arrows <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">→</kbd> to navigate slides
          </span>
        </div>

        <button
          onClick={nextSlide}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-saffron hover:bg-saffron-muted text-ink font-mono text-xs font-bold shadow-md transition-all hover:scale-105"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
