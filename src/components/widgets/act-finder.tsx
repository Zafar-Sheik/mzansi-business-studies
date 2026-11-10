"use client";
import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { ACTS, BUSINESSES, fill, PEOPLE } from "@/lib/biz/banks";
import { addXp } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToolUse } from "./sim-kit";
import { Feedback, Toggle, WidgetFrame } from "./widget-frame";

const C = "var(--t-diversity)";

export const ACT_CARDS: { short: string; name: string; emoji: string; purpose: string; key: string }[] = [
  { short: "SDA", name: "Skills Development Act", emoji: "🎓", purpose: "Develops the skills of the workforce and improves productivity.", key: "SETAs · learnerships · 1% skills development levy · NQF" },
  { short: "LRA", name: "Labour Relations Act", emoji: "🤝", purpose: "Promotes sound labour relations between employers and employees.", key: "Trade unions · collective bargaining · strikes and lock-outs · CCMA · workplace forums" },
  { short: "EEA", name: "Employment Equity Act", emoji: "⚖️", purpose: "Promotes equal opportunity and fair treatment; eliminates unfair discrimination.", key: "Affirmative action · designated groups · equity plan · equal pay for work of equal value" },
  { short: "BCEA", name: "Basic Conditions of Employment Act", emoji: "⏰", purpose: "Sets the minimum conditions of employment.", key: "45 hours a week · overtime · leave · meal intervals · notice · child labour" },
  { short: "COIDA", name: "Compensation for Occupational Injuries and Diseases Act", emoji: "🦺", purpose: "Compensates employees for injuries and diseases caused at work.", key: "Compensation Fund · report accidents · dependants are paid if the worker dies" },
  { short: "BBBEE", name: "Broad-Based Black Economic Empowerment Act", emoji: "📈", purpose: "Gives previously disadvantaged people a fair share in the economy.", key: "Five pillars · scorecard · tenders · ownership and management control" },
  { short: "NCA", name: "National Credit Act", emoji: "💳", purpose: "Promotes responsible lending and borrowing; protects consumers of credit.", key: "Affordability checks · reckless lending · debt counselling · National Credit Regulator" },
  { short: "CPA", name: "Consumer Protection Act", emoji: "🛍️", purpose: "Protects consumers against unfair business practices.", key: "Consumer rights · refunds and returns · plain language · National Consumer Commission" },
];

const shortOf = (answer: string) => {
  const alts = answer.split(" | ");
  return ACT_CARDS.find((a) => alts.some((x) => x === a.short || x === a.name || x === `${a.short} Act`))!.short;
};

/** Scenario → which Act? The quickest way to earn "identify the Act" marks. */
export function ActFinder() {
  const touch = useToolUse();
  const [seed, setSeed] = useState(1);
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [stats, setStats] = useState({ right: 0, tried: 0, streak: 0 });
  const [sheet, setSheet] = useState(false);
  useEffect(() => setSeed(Math.floor(Math.random() * 1e6)), []);
  const deck = useMemo(() => shuffle(ACTS.items, seed), [seed]);
  const item = deck[n % deck.length];
  const text = fill(item.s, BUSINESSES[(seed + n) % BUSINESSES.length], PEOPLE[(seed + n * 3) % PEOPLE.length]);
  const right = shortOf(item.a);

  const choose = (short: string) => {
    if (picked) return;
    touch();
    const ok = short === right;
    setPicked(short);
    setStats((s) => {
      const streak = ok ? s.streak + 1 : 0;
      if (ok && streak % 5 === 0) addXp(15, `Act Finder streak ×${streak}`);
      return { right: s.right + (ok ? 1 : 0), tried: s.tried + 1, streak };
    });
  };

  return (
    <WidgetFrame title="Act Finder" colour={C} instruction="Read the scenario and tap the Act that applies. Five in a row earns bonus XP.">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold">{stats.right}/{stats.tried} correct</span>
        <span className="flex items-center gap-1 font-semibold"><Flame className={cn("h-4 w-4", stats.streak >= 3 ? "text-exam" : "text-muted")} /> streak {stats.streak}</span>
        <span className="ml-auto"><Toggle on={sheet} onChange={setSheet}>Act cheat sheet</Toggle></span>
      </div>
      {sheet && (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {ACT_CARDS.map((a) => <li key={a.short} className="rounded-xl border border-line p-2 text-sm"><strong>{a.emoji} {a.short}</strong> – {a.purpose}<div className="text-xs text-muted">{a.key}</div></li>)}
        </ul>
      )}
      <blockquote className="mt-3 rounded-xl border-l-4 bg-surface-2/60 p-4 text-base font-medium" style={{ borderColor: C }}>{text}</blockquote>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ACT_CARDS.map((a) => (
          <button key={a.short} disabled={Boolean(picked)} onClick={() => choose(a.short)} title={a.name}
            className={cn("rounded-xl border-2 px-2 py-2 text-sm font-bold transition", picked && a.short === right ? "border-success bg-success/10" : picked === a.short ? "border-danger bg-danger/10" : "border-line hover:border-brand/50")}>
            <span aria-hidden>{a.emoji}</span> {a.short}<span className="sr-only"> – {a.name}</span>
          </button>
        ))}
      </div>
      <Feedback ok={picked ? picked === right : null}>
        <strong>{picked === right ? "Correct!" : `Not yet – it is the ${ACT_CARDS.find((a) => a.short === right)!.name} (${right}).`}</strong> {item.why}
        <div className="mt-2"><Button size="sm" onClick={() => { setPicked(null); setN((x) => x + 1); }}>Next scenario</Button></div>
      </Feedback>
    </WidgetFrame>
  );
}
