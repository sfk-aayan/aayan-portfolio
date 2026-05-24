/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SystemModule,
  PhilosophyNode,
  WorkExperience,
  DeveloperProfile,
  Education,
  Publication,
  Certification,
} from "./types";

export const BACKEND_PROFILE: DeveloperProfile = {
  name: "SFK // FAIYAZ KARIM",
  title: "Software Engineer",
  bio: "Backend-focused software engineer with hands-on production experience in Django, Go, and cloud-native systems. Passionate about clean API design, AI tooling, and building reliable distributed services.",
  skills: {
    LANGUAGES: ["Python", "Go", "Java", "JavaScript", "C#", "HTML", "CSS"],
    "FRAMEWORKS & LIBRARIES": [
      "Django",
      "DRF",
      "Gin",
      "GORM",
      "React",
      "ASP.NET",
      "Qiskit",
    ],
    DATABASES: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Oracle SQL",
      "Cloud Firestore",
    ],
    "TOOLS & PLATFORMS": [
      "Docker",
      "Git",
      "n8n",
      "Supabase",
      "Firebase",
      "GraphQL",
      "SSLCommerz",
    ],
  },
};

export const EDUCATION: Education[] = [
  {
    id: "EDU-01",
    institution: "Islamic University of Technology",
    location: "Gazipur, Bangladesh",
    degree: "Bachelor of Science, Computer Science and Engineering",
    cgpa: "3.74",
    period: "Jan 2020 – Jun 2024",
  },
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: "EXP-01",
    company: "Guardian Life Insurance Limited",
    role: "Software Engineer (Senior Officer)",
    period: "Dec 2024 – Present",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Helped launch Probashi Prohori, enabling non-resident Bangladeshis to purchase insurance online, expanding digital access.",
      "Enhanced system interoperability by developing DRF-based APIs for multiple third-party partners.",
      "Partnered with BRAC to co-develop a loan insurance portal using Django, speeding up employee onboarding.",
      "Integrated SSLCommerz payment gateways into two flagship platforms, boosting payment reliability and conversion rates.",
      "Both high-impact web solutions supported a 20% revenue increase in the microfinance department.",
      "Increased automated claims processing speed by 15% through backend workflow optimisations.",
      "Reduced claim submission time by 25% by building APIs for automated submissions via the company mobile app.",
      "Led R&D on internal AI integration — built an advisory agent using n8n + Supabase, improving user guidance.",
    ],
    technologies: [
      "Python",
      "Django",
      "DRF",
      "SSLCommerz",
      "n8n",
      "Supabase",
      "PostgreSQL",
    ],
  },
  {
    id: "EXP-02",
    company: "Intelligent Machines",
    role: "Software Engineering Intern",
    period: "May 2023 – Aug 2023",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Boosted data retrieval efficiency by 50% through optimised GraphQL queries across multiple database tables.",
      "Conducted R&D on GraphQL adoption in Django, enabling more flexible and efficient retrieval of client data.",
      "Contributed to the back-end development of Biponon, a white-label mobile application.",
    ],
    technologies: ["Python", "Django", "GraphQL", "PostgreSQL"],
  },
  {
    id: "EXP-03",
    company: "Freelance",
    role: "Software Engineer",
    period: "Dec 2022 – Mar 2023",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Delivered reliable back-end functionality for HLV, a medical service application.",
      "Increased API robustness and maintainability by building Go-based endpoints using GORM and Gin.",
    ],
    technologies: ["Go", "Gin", "GORM", "REST APIs"],
  },
];

export const SYSTEM_MODULES: SystemModule[] = [
  {
    id: "SYS-01",
    title: "Probashi Prohori — Non-Resident Insurance Portal",
    category: "FINTECH & INSURANCE",
    description:
      "A secure digital platform enabling non-resident Bangladeshis to purchase insurance policies online, backed by SSLCommerz payment integration and a multi-partner API layer.",
    technicalBreakdown: [
      "Architected DRF-based RESTful APIs consumed by multiple third-party partners with token-based authentication.",
      "Integrated SSLCommerz payment gateway with webhook handling for reliable asynchronous payment confirmation.",
      "Built automated claim submission pipelines that cut submission time by 25% across the company mobile app.",
    ],
    metrics: [
      { label: "Revenue impact", value: "+20% dept." },
      { label: "Claim speed boost", value: "+15% auto-processing" },
    ],
    status: "OPERATIONAL",
    version: "v2.1.0-prod",
  },
  {
    id: "SYS-02",
    title: "AI Advisory Agent — n8n + Supabase",
    category: "AI & AUTOMATION",
    description:
      "An internal advisory AI agent built on n8n workflow automation and Supabase as the vector/relational backend, designed to improve employee guidance and support operations.",
    technicalBreakdown: [
      "Designed end-to-end n8n workflow pipelines for multi-step AI query resolution with fallback logic.",
      "Integrated Supabase as the vector store and relational backend for agent memory and knowledge retrieval.",
      "Led R&D evaluation of LLM-based tooling for internal deployment within a regulated insurance environment.",
    ],
    metrics: [
      { label: "Deployment scope", value: "Internal enterprise" },
      { label: "Knowledge sources", value: "Multi-domain" },
    ],
    status: "ACTIVE",
    version: "v1.0.0-internal",
  },
  {
    id: "SYS-03",
    title: "Deen-dar — Android Dating App",
    category: "MOBILE & AUTHENTICATION",
    description:
      "A fully functional Android dating application built in Java using Firebase Authentication and Cloud Firestore for real-time user data and matchmaking.",
    technicalBreakdown: [
      "Implemented user authentication using Firebase Authentication with email/password and social login flows.",
      "Designed Firestore data models for user profiles, matches, and real-time messaging with security rules.",
      "Built native Android UI with custom RecyclerView adapters for swipe-based match discovery.",
    ],
    metrics: [
      { label: "Platform", value: "Android (Java)" },
      { label: "Backend", value: "Firebase / Firestore" },
    ],
    status: "ACTIVE",
    version: "v1.0.0-beta",
  },
];

export const PHILOSOPHY_NODES: PhilosophyNode[] = [
  {
    title: "API FIRST",
    principle: "Clean Contracts, Reliable Systems",
    description:
      "Good software starts with well-defined interfaces. Whether building for third-party partners or internal tools, the API contract is the foundation of trust between services.",
    metric: "DRF · GraphQL · REST",
  },
  {
    title: "AUTOMATION BIAS",
    principle: "Manual Work Is a Bug",
    description:
      "If a process is repeated more than twice, it should be automated. Workflow orchestration and AI tooling are force multipliers that free engineers to solve harder problems.",
    metric: "n8n · AI Agents · CI/CD",
  },
  {
    title: "PRODUCTION MINDSET",
    principle: "Ship Reliable, Not Just Fast",
    description:
      "Performance metrics and reliability benchmarks are not vanity numbers — they are engineering commitments. Every optimization should be measurable and reproducible.",
    metric: "25% faster · 50% more efficient",
  },
];

// Peer-reviewed / conference publications
export const PUBLICATIONS: Publication[] = [
  {
    id: "PUB-01",
    title: "Quantum Machine Learning for Anomaly Detection in IoT Devices",
    venue:
      "IEEE — 5th International Conference on AI-ML Systems, Quantum Symposium",
    date: "2025",
    authors:
      "Chowdhury, Sajid Ahmed†; Karim, Shaikh Faiyaz†; Bhuiyan, Md. Shahriar Islam; Shuvro, Ali Abir; Hossen, Md. Sakhawat",
    authorNote: "† Co-first author",
    summary:
      "Explored quantum ML models for anomaly detection in IoT datasets. The UU-† circuit achieved up to 99.62% precision on the TWTDUS dataset; the VQC achieved 92.00% accuracy on the anoML-IoT dataset — demonstrating the potential of quantum ML in anomaly detection.",
    tags: [
      "Quantum Computing",
      "Machine Learning",
      "IoT",
      "Anomaly Detection",
      "Qiskit",
    ],
    link: "#",
  },
];

// Courses & certifications
export const CERTIFICATIONS: Certification[] = [
  {
    id: "CERT-01",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Jul 2025",
    summary:
      "Certification in advanced AI-assisted software engineering workflows using Claude, covering code generation, debugging, and agentic development pipelines.",
    tags: ["AI Tooling", "LLM", "Agentic Engineering"],
    link: "#",
  },
  {
    id: "CERT-02",
    title: "Complete Web Developer Bootcamp",
    issuer: "Udemy",
    date: "Jun 2025",
    summary:
      "Comprehensive full-stack web development certification covering modern JavaScript, React, Node.js, and database integration patterns.",
    tags: ["React", "JavaScript", "Full-Stack"],
    link: "#",
  },
  {
    id: "CERT-03",
    title: "Qiskit Global Summer School 2023 — Quantum Excellence",
    issuer: "IBM",
    date: "Sep 2023",
    summary:
      "Intensive quantum computing programme covering quantum circuit design, quantum algorithms, and practical implementations using the Qiskit framework.",
    tags: ["Quantum Computing", "Qiskit", "IBM", "Algorithms"],
    link: "#",
  },
];
