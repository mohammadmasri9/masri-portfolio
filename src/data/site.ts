// Everything you see on the site lives here. Edit freely.

import type { StaticImageData } from "next/image";
import alasayelImg from "./Alasayel-Logo.png";
import sklrImg from "./SKLR.png";
import tadbeerImg from "./tadbeer-logo.png";
import uniconnectImg from "./UniConnect Education Logo.png";

export const profile = {
  name: "Mohammad Almasri",
  short: "Masri",
  role: "Product designer & full-stack developer",
  location: "Palestine — working worldwide",
  email: "masri.m7md33@gmail.com",
  whatsapp: "https://wa.me/972592621821",
  cv: "/cv.pdf",
  availability: "Available for new projects right away",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammad-almasri-5b606525a" },
    { label: "GitHub", href: "https://github.com/mohammadmasri9" },
    { label: "Instagram", href: "https://www.instagram.com/masri.m7md/" },
  ],
  headline: "I build software that thinks ahead.",
  intro:
    "I design and build websites, apps and brands end to end. One person, one conversation, from the first sketch to the live launch.",
};

export type ServiceId = "web" | "mobile" | "ai" | "automation" | "data";

export type Service = {
  id: ServiceId;
  title: string;
  lead: string;
  rest: string;
  deliverables: string[];
  timeline: string;
  color: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Websites & web apps",
    lead: "Full stack, one developer.",
    rest: "Responsive sites, dashboards and platforms on the MERN stack, from the database to the last pixel.",
    deliverables: ["React front end that works on every screen", "Node.js + Express REST API", "MongoDB database, designed for speed", "Deployment with CI/CD"],
    timeline: "3–8 weeks",
    color: "#4FD1FF",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    lead: "One codebase, both stores.",
    rest: "Cross-platform apps for iOS and Android in React Native or Flutter, backed by an API I build too.",
    deliverables: ["React Native or Flutter app", "Backend and API", "App Store and Google Play release", "Crash and usage reporting"],
    timeline: "6–12 weeks",
    color: "#59D499",
  },
  {
    id: "ai",
    title: "AI chatbots & assistants",
    lead: "Useful, not gimmicky.",
    rest: "LLM-powered assistants that answer from your own data, tuned with careful prompts, like the HR chatbot I worked on at Ooredoo.",
    deliverables: ["Chatbot trained on your documents", "Prompt design and testing", "Web or WhatsApp integration", "Admin panel and usage tracking"],
    timeline: "2–6 weeks",
    color: "#B57BFF",
  },
  {
    id: "automation",
    title: "Automation & DevOps",
    lead: "Let the computer do the boring part.",
    rest: "Python and Bash scripts that replace repetitive tasks, plus CI/CD pipelines that ship your code safely.",
    deliverables: ["Process audit: what to automate first", "Python and Bash automation scripts", "CI/CD pipeline with Git", "Monitoring and alerts"],
    timeline: "1–4 weeks",
    color: "#7C9CFF",
  },
  {
    id: "data",
    title: "Data & machine learning",
    lead: "Turn your data into decisions.",
    rest: "Dashboards that show what's happening and ML models that predict what's next, built right into your web app.",
    deliverables: ["Data cleaning and analysis with Pandas", "Interactive dashboards", "ML models with Scikit-learn or TensorFlow", "Model integrated into your app"],
    timeline: "2–6 weeks",
    color: "#FF6B8B",
  },
];

export type Project = {
  slug: string;
  name: string;
  client: string;
  year: string;
  summary: string;
  result: string;
  stack: string[];
  services: ServiceId[];
  color: string;
  /** Live site, repo or case study. Leave out to show the card without a link. */
  href?: string;
  /** Logo or screenshot shown on the card */
  image?: StaticImageData;
  /** Sub-projects, shown as a list inside one wide card */
  items?: ProjectItem[];
};

export type ProjectItem = {
  icon: "assets" | "score" | "chat" | "flow" | "monitor";
  name: string;
  summary: string;
  tags: string[];
  color: string;
};

export const projects: Project[] = [
  {
    slug: "alasayel",
    name: "Al-Asayel Equestrian Center",
    client: "Equestrian center, Palestine",
    year: "2026",
    summary:
      "Horse marketplace and event-ticketing platform. Visitors book seats or VIP tables, get a QR ticket, and staff scan it at the gate. The center edits its own site from an admin panel.",
    result: "321 automated tests, zero overselling",
    stack: ["React 19", "Node.js + Express", "MongoDB", "Cloudinary"],
    services: ["web"],
    color: "#4FD1FF",
    image: alasayelImg,
  },
  {
    slug: "tadbeer",
    name: "Tadbeer",
    client: "Graduation project, Al-Quds University",
    year: "2026",
    summary:
      "AI-driven ticket management system with separate workflows for employees, managers and admins. Generative AI suggests each ticket's priority, summarizes it and guides the fix.",
    result: "AI triage on every ticket",
    stack: ["MERN", "TypeScript", "Generative AI"],
    services: ["web", "ai"],
    color: "#B57BFF",
    image: tadbeerImg,
    href: "https://github.com/mohammadmasri9/TADBEER-Ticket-Management-System1",
  },
  {
    slug: "ooredoo",
    name: "Ooredoo Palestine",
    client: "Internal tools",
    year: "2023 – now",
    summary:
      "Tools I built for teams inside Ooredoo Palestine during three years of traineeships, from support desks to data science and DevOps.",
    result: "5 internal systems in daily use",
    stack: ["Python", "LLMs", "n8n", "Airflow", "Prometheus"],
    services: ["web", "ai", "automation", "data"],
    color: "#FF6B8B",
    items: [
      {
        icon: "assets",
        name: "Assets System",
        summary: "Tracks every laptop, printer and device the technical support team hands out, and who has it.",
        tags: ["Full stack", "Support team"],
        color: "#4FD1FF",
      },
      {
        icon: "score",
        name: "Prediction Scoring LLM",
        summary: "Uses a large language model to score records and predict outcomes, so teams can prioritise the right cases.",
        tags: ["LLM", "Machine learning"],
        color: "#B57BFF",
      },
      {
        icon: "chat",
        name: "HR Chatbot",
        summary: "Answers employees' HR questions. I tuned its answers with NLP and prompt engineering.",
        tags: ["LLM", "NLP"],
        color: "#FF6B8B",
      },
      {
        icon: "flow",
        name: "Workflow automation",
        summary: "n8n workflows and Apache Airflow pipelines that run repetitive tasks and data jobs on schedule.",
        tags: ["n8n", "Apache Airflow"],
        color: "#59D499",
      },
      {
        icon: "monitor",
        name: "Monitoring with Prometheus",
        summary: "Collects metrics from internal services and raises alerts before something breaks.",
        tags: ["Prometheus", "DevOps"],
        color: "#7C9CFF",
      },
    ],
  },
  {
    slug: "sklr",
    name: "SKLR",
    client: "Mälardalen University, Sweden",
    year: "2025",
    summary:
      "Peer-to-peer skill-sharing app: teach what you know, earn time credits, spend them learning from others. Reputation scores keep the exchange fair.",
    result: "Built during my exchange in Sweden",
    stack: ["Flutter", "Node.js", "Dart"],
    services: ["mobile"],
    color: "#59D499",
    image: sklrImg,
    href: "https://github.com/mohammadmasri9/SKLR",
  },
  {
    slug: "uniconnect",
    name: "UniConnect",
    client: "University project",
    year: "2025",
    summary: "Appointment booking for students and academic staff. Students pick a free slot instead of chasing office hours.",
    result: "Office hours, booked in a few clicks",
    stack: ["React", "MongoDB", "Node.js"],
    services: ["web"],
    color: "#7C9CFF",
    image: uniconnectImg,
    href: "https://github.com/mohammadmasri9/UniConnect-",
  },
];

export const process = [
  {
    title: "Discover",
    prompt: "I need a booking site for my travel agency.",
    tasks: ["Interviewing your team and customers", "Mapping the booking journey", "Writing a one-page scope"],
    reply: "Scope is ready: 6 pages, online payments, admin panel. Fixed price, 5 weeks.",
  },
  {
    title: "Design",
    prompt: "Can I see how it will look?",
    tasks: ["Sketching key screens", "Building the Figma prototype", "Testing it with 5 real customers"],
    reply: "Prototype link sent. Customers booked a trip in under 90 seconds.",
  },
  {
    title: "Build",
    prompt: "When can I try it?",
    tasks: ["Developing in weekly releases", "Connecting payments and email", "Sharing a live preview every Friday"],
    reply: "Preview is live. Your team can start adding trips today.",
  },
  {
    title: "Launch",
    prompt: "Let's go live.",
    tasks: ["Moving to your domain", "Setting up analytics and backups", "Training your team"],
    reply: "You're live. I'll check in weekly for the next month.",
  },
];

export const stack = [
  ["Next.js", "React", "TypeScript", "Tailwind", "Node"],
  ["Figma", "Framer", "Motion", "Postgres", "Prisma"],
  ["Flutter", "React Native", "Firebase", "Stripe"],
];

export type Experience = {
  role: string;
  org: string;
  place: string;
  dates: string;
  kind: "work" | "study";
  points: string[];
};

// Newest first
export const experience: Experience[] = [
  {
    role: "Automation & DevOps Trainee",
    org: "Ooredoo Palestine",
    place: "Ramallah",
    dates: "May 2026 – now",
    kind: "work",
    points: [
      "Automating internal processes and operational tasks with Python and Bash",
      "Working with CI/CD pipelines, Git, containers and monitoring",
    ],
  },
  {
    role: "Data Science Trainee",
    org: "Ooredoo Palestine",
    place: "Ramallah",
    dates: "Jun 2025 – May 2026",
    kind: "work",
    points: [
      "Trained classification, regression and clustering models with Scikit-learn, TensorFlow and Keras",
      "Improved the Ooredoo HR Chatbot with NLP and prompt engineering",
      "Built dashboards and integrated ML models into web apps",
    ],
  },
  {
    role: "Computer Science Exchange Student",
    org: "Mälardalen University",
    place: "Västerås, Sweden",
    dates: "Oct 2024 – Jan 2025",
    kind: "study",
    points: ["Built SKLR, a Flutter and Node.js skill-sharing platform, with an international team"],
  },
  {
    role: "Help Desk & Technical Support Trainee",
    org: "Ooredoo Palestine",
    place: "Ramallah",
    dates: "May 2024 – Jun 2025",
    kind: "work",
    points: [
      "Supported Windows, Linux, Microsoft 365 and enterprise software",
      "Managed accounts in Active Directory and documented fixes in the knowledge base",
    ],
  },
  {
    role: "Full Stack Development Trainee",
    org: "Ooredoo Palestine",
    place: "Ramallah",
    dates: "Jun 2023 – May 2024",
    kind: "work",
    points: [
      "Built interfaces in React and React Native and REST APIs in Node.js and Express",
      "Designed and optimised MongoDB databases in an Agile team",
    ],
  },
  {
    role: "Front-End Trainee",
    org: "Buthor Company",
    place: "Hebron",
    dates: "Dec 2022 – Feb 2023",
    kind: "work",
    points: ["Turned designs into responsive React interfaces alongside senior developers"],
  },
  {
    role: "Bachelor of Information Technology",
    org: "Al-Quds University",
    place: "Abu Dis",
    dates: "Sep 2022 – Sep 2026",
    kind: "study",
    points: ["Graduation project: Tadbeer, an AI-driven ticket management system"],
  },
];

export const certifications = [
  "IBM Z Day 2025: AI & Data",
  "IBM Z Day 2025: Security",
  "Udacity Data Science program",
  "Bug Bounty & Cybersecurity Bootcamp, SED",
  "Software Engineering & Ethics of Coding, SED",
];
