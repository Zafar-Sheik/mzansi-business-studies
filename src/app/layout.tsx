import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PrefsApplier, themeBootScript } from "@/components/layout/prefs-applier";
import { ReadingRuler } from "@/components/layout/reading-ruler";
import { RewardLayer } from "@/components/layout/reward-layer";
import { ProgressBootstrap } from "@/components/layout/progress-bootstrap";
import { TOPIC_INDEX } from "@/content";

export const metadata: Metadata = {
  title: { default: "BusinessMzansi – Grade 12 Business Studies (CAPS)", template: "%s · BusinessMzansi" },
  description:
    "Interactive CAPS Grade 12 Business Studies for Paper 1 and Paper 2 – legislation, business strategies, sectors, human resources, quality of performance, leadership, investment, insurance, forms of ownership, presentation, ethics, creative thinking, social responsibility, human rights, teams and conflict management – in small steps, with labs, scenarios, exam questions with marking guidelines, mock papers and an essay planner. Built for learners with ADHD, dyslexia and other learning differences.",
  applicationName: "BusinessMzansi",
  keywords: ["Business Studies", "CAPS", "Grade 12", "NSC", "matric", "Paper 1", "Paper 2", "legislation", "business strategies", "human resources", "TQM", "leadership", "insurance", "forms of ownership", "CSR", "LASO", "ADHD", "dyslexia", "South Africa"],
  openGraph: { title: "BusinessMzansi", description: "Grade 12 Business Studies – the interactive way. Small steps, labs, scenarios, exam questions and an essay planner.", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0a16" }, { media: "(prefers-color-scheme: light)", color: "#f7f7fb" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen">
        <PrefsApplier />
        <ProgressBootstrap topicIndex={TOPIC_INDEX} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ReadingRuler />
        <RewardLayer />
      </body>
    </html>
  );
}
