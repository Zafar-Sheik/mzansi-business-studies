import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="hide-in-focus mt-24 border-t border-line pb-28 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-md text-sm text-muted">
            An interactive Grade 12 Business Studies companion for South African learners, built around the CAPS curriculum and the NSC
            papers (Paper 1 and Paper 2), with labs, tappable models, scenarios and exam questions with marking guidelines – plus the exam
            skills that earn marks in both papers. Built for every learner, especially those who learn differently.
            The sister app of MathsMzansi, PhysicsMzansi, EnglishMzansi, AccountingMzansi, LifeMzansi, GeoMzansi and CodeMzansi.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-bold">Study</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li><Link href="/learn?paper=1" className="hover:text-fg">Paper 1 lessons</Link></li>
            <li><Link href="/learn?paper=2" className="hover:text-fg">Paper 2 lessons</Link></li>
            <li><Link href="/learn?strand=skills" className="hover:text-fg">Exam skills</Link></li>
            <li><Link href="/toolkit" className="hover:text-fg">Labs &amp; tools</Link></li>
            <li><Link href="/flashcards" className="hover:text-fg">Flashcards</Link></li>
            <li><Link href="/games" className="hover:text-fg">Games room</Link></li>
            <li><Link href="/exam" className="hover:text-fg">Exam Room &amp; mock papers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-bold">For teachers</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li><Link href="/teachers" className="hover:text-fg">Teacher guide</Link></li>
            <li><Link href="/teachers/docs/curriculum-map" className="hover:text-fg">CAPS curriculum map</Link></li>
            <li><Link href="/teachers/worksheets" className="hover:text-fg">Worksheet generator</Link></li>
            <li><Link href="/teachers/docs/overview" className="hover:text-fg">Documentation</Link></li>
          </ul>
        </div>
      </div>
      <p className="px-4 text-center text-xs text-muted">Your progress is stored only on this device. No accounts, no tracking. An independent study aid – always check with your teacher and the latest DBE exam guidelines.</p>
    </footer>
  );
}
