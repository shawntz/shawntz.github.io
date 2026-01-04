import { Metadata } from "next";
import Image from "next/image";
import { Mail, Github, Linkedin, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Shawn Schwartz - software engineer and researcher.",
};

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
    </svg>
  );
}

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  );
}

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/shawnts", icon: Linkedin },
  { name: "Bluesky", href: "https://bsky.app/profile/shawnschwartz.bsky.social", icon: BlueskyIcon },
  { name: "GitHub", href: "https://github.com/shawntz", icon: Github },
  { name: "Google Scholar", href: "https://scholar.google.com/citations?user=xII63_wAAAAJ&hl=en&oi=ao", icon: GoogleScholarIcon },
  { name: "Email", href: "mailto:hey@shawnschwartz.com", icon: Mail },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/shawn/sts-portrait.jpg"
              alt="Shawn Schwartz"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">About</h1>
            <p className="mt-4 text-lg text-foreground-secondary">
              Software engineer, researcher, and lifelong learner.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        <p className="text-xl text-foreground-secondary leading-relaxed">
          Hi, I&apos;m Shawn Schwartz. I&apos;m a software engineer, data scientist, and researcher
          passionate about building tools that make a difference.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">What I Do</h2>
          <p className="text-foreground-secondary leading-relaxed">
            I work at the intersection of technology and research. My work spans
            from building production software systems to conducting academic
            research, publishing papers, and teaching at the university level.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Background</h2>
          <p className="text-foreground-secondary leading-relaxed">
            I have a background in neuroscience and computer science with a focus on building
            scalable systems and exploring novel approaches to solving complex
            problems. I enjoy learning new technologies and sharing what I learn
            through writing and open source contributions. 
          </p>
          <p className="mt-4 text-foreground-secondary leading-relaxed">
            Since I started coding at age 12, I've been fascinated by the power of software to transform ideas
            into reality. From building iOS apps to developing data pipelines, I love
            creating tools that empower others. I work across the full stack, from
            front-end interfaces to back-end infrastructure. I believe in using the right
            tool for the job, whether that's a cutting-edge framework or a simple script. 
            As such, I'm continuously exploring new technologies and methodologies to stay at the forefront of the field. 
          </p>
          <p className="mt-4 text-foreground-secondary leading-relaxed">
            As I wrap up my PhD at Stanford, I'm excited to apply my skills to new challenges and opportunities in the industry.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Interests</h2>
          <ul className="space-y-3 text-foreground-secondary ml-1">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Building developer tools and productivity software
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Machine learning and artificial intelligence
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Open source development
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Technical writing and knowledge sharing
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Ultimate frisbee and outdoor adventures
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              SoulCycle and fitness
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Long beach walks with my corgi
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-16 rounded-2xl border border-border-light bg-surface p-8">
        <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
        <p className="text-foreground-secondary mb-6">
          I&apos;m always happy to connect with fellow developers, researchers,
          and anyone interested in my work.
        </p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-background transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
