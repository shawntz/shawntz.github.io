import { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description: "Freelance consulting services - data science, research, and software development.",
};

// =============================================================================
// CONFIGURE YOUR SERVICES HERE
// =============================================================================

const services = [
  {
    title: "Research Consulting",
    description:
      "Data-driven insights for complex problems. Leveraging ML/AI and statistical methods to help orgs make informed decisions backed by rigorous analysis.",
    hourlyRate: "$200-300",
    projectRange: "$10K-75K",
    features: [
      "Research Design",
      "Data Analysis",
      "Statistical Modeling",
      "Insight Reports",
      "Presentation of Findings",
    ],
  },
  {
    title: "Web Design & Development",
    description:
      "Custom websites that convert. I create fast, responsive, and beautifully designed websites tailored to your brand and business objectives.",
    hourlyRate: "$125-200",
    projectRange: "$5K-50K",
    features: [
      "Design System",
      "Responsive Development",
      "SEO Optimization",
      "Performance Tuning",
      "CMS Integration",
    ],
  },
  {
    title: "App Design & Development",
    description:
      "End-to-end mobile (iOS) and web (JS / Electron) application development. From concept to deployment, I build scalable, user-centric apps.",
    hourlyRate: "$175-250",
    projectRange: "$15K-100K+",
    features: [
      "Product Strategy & Roadmap",
      "App Interface Design (iOS / Web)",
      "Full-Stack Development",
      "UI/UX Testing & Deployment",
      "Post-Launch Support",
    ],
  },
  {
    title: "Professional Coaching",
    description:
      "Career guidance and technical mentorship for engineers and researchers. One-on-one coaching to help you level up your skills, navigate career transitions, or break into tech/research.",
    hourlyRate: "$250-400",
    projectRange: "$2K-15K",
    features: [
      "1:1 Coaching Sessions",
      "Career Roadmap",
      "Portfolio Review",
      "Interview Prep",
      "Ongoing Support",
    ],
  },
];

const testimonials = [
  {
    quote: "Shawn's expertise in data science helped us understand our users at a much deeper level.",
    author: "Client Name",
    role: "VP of Product",
    company: "Tech Company",
  },
  // Add more testimonials as needed
];

// Contact email for inquiries
const contactEmail = "hello@shawnschwartz.com";

export default function ServicesPage() {
  return (
    <ServicesContent
      services={services}
      testimonials={testimonials}
      contactEmail={contactEmail}
    />
  );
}
