import { Metadata } from "next";
import { ResumeContent } from "@/components/resume/ResumeContent";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional experience and background of Shawn Schwartz.",
};

// =============================================================================
// CONFIGURE YOUR RESUME DATA HERE
// =============================================================================

const experiences = [
  {
    company: "Stanford University",
    title: "PhD Computational Research & Teaching Fellow",
    period: "2021 – Present",
    description:
      "Designed and executed large-scale causal experiments in VR environments, fMRI, EEG, and eye-tracking/pupillometry studies, end-to-end. Built a production real-time biofeedback platform for causal interventions on attention and memory. Instructed 1,000+ undergraduate students as head teaching fellow across 9 courses in statistics, data science, and the neurobiology of attention and episodic memory.",
  },
  {
    company: "Slack",
    title: "PhD Data Science Intern",
    period: "June – Oct 2025",
    description:
      "Designed and deployed experimentation-ready segmentation models for 100K+ WAUs using unsupervised learning across 300+ behavioral and attitudinal features, driving product strategy for activation, retention, and engagement.",
  },
  {
    company: "UCLA",
    title: "Data Scientist & Teaching Associate",
    period: "2019 – 2021",
    description:
      "Developed computer vision models using TensorFlow to automate biological image analysis (100K+ images). Architected scalable data pipelines for high-throughput computing environments. Instructed 1000+ undergraduate students across 12 courses in statistics, data science, computational methods, and machine learning.",
  },
  {
    company: "UCLA Health",
    title: "Data Science Intern",
    period: "2017 – 2018",
    description:
      "Built and deployed automated SQL data pipeline for patient transition tracking, reducing manual entry time by 25% and reporting latency from days to hours.",
  },
  {
    company: "UCLAstore.com & asucla.ucla.edu",
    title: "Part-Time Software Engineer",
    period: "2016 – 2020",
    description:
      "Built and maintained e-commerce platform serving 1M+ MAUs with custom CMS, payment processing integration, and inventory management system. Developed content management tools and event registration system for UCLA's student association serving 400K+ MAUs.",
  },
];

// Path to your CV PDF in /public folder
const cvPdfPath = "/files/cv.pdf";

export default function ResumePage() {
  return <ResumeContent experiences={experiences} cvPdfPath={cvPdfPath} />;
}
