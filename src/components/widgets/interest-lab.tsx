"use client";
import { useState } from "react";
import { compoundAmount, rand, simpleInterest } from "@/lib/biz/generators";
import { Explain, useToolUse } from "./sim-kit";
import { Slider, Toggle, WidgetFrame } from "./widget-frame";

const C = "var(--t-cell)";

/** Simple vs compound interest, year by year – drag the sliders and watch the gap open up. */
export function InterestLab() {
  const touch = useToolUse();
  const [p, setP] = useState(10000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [working, setWorking] = useState(true);
  const set = (f: (v: number) => void) => (v: number) => { touch(); f(v); };
  const rows = Array.from({ length: years }, (_, i) => ({ year: i + 1, simple: p + simpleInterest(p, rate, i + 1), compound: compoundAmount(p, rate, i + 1) }));
  const last = rows[rows.length - 1];
  const max = last.compound;

  return (
    <WidgetFrame title="Interest lab: simple vs compound" colour={C} instruction="Drag the sliders. The same money, the same rate – but two very different results.">
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label="Amount invested (P)" value={p} min={1000} max={100000} step={1000} onChange={set(setP)} colour={C} format={rand} />
        <Slider label="Interest rate per year (r)" value={rate} min={1} max={20} onChange={set(setRate)} colour={C} format={(v) => `${v}%`} />
        <Slider label="Years (n)" value={years} min={1} max={10} onChange={set(setYears)} colour={C} format={(v) => `${v} ${v === 1 ? "year" : "years"}`} />
      </div>

      <div className="mt-4 space-y-2" role="img" aria-label={`After ${years} years: simple interest gives ${rand(last.simple)}, compound interest gives ${rand(last.compound)}`}>
        {rows.map((r) => (
          <div key={r.year} className="grid grid-cols-[3.2rem_1fr] items-center gap-2 text-xs">
            <span className="font-semibold text-muted">Year {r.year}</span>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2"><div className="h-3 rounded-r-md bg-skills transition-[width]" style={{ width: `${(r.simple / max) * 78}%` }} /><span className="font-mono tabular-nums">{rand(r.simple)}</span></div>
              <div className="flex items-center gap-2"><div className="h-3 rounded-r-md transition-[width]" style={{ width: `${(r.compound / max) * 78}%`, background: C }} /><span className="font-mono font-bold tabular-nums">{rand(r.compound)}</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-skills" /> Simple interest</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{ background: C }} /> Compound interest</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-line p-3"><div className="text-xs font-bold text-muted uppercase">Simple – total</div><div className="font-display text-xl font-bold">{rand(last.simple)}</div><div className="text-xs text-muted">interest {rand(last.simple - p)}</div></div>
        <div className="rounded-xl border border-line p-3"><div className="text-xs font-bold text-muted uppercase">Compound – total</div><div className="font-display text-xl font-bold" style={{ color: C }}>{rand(last.compound)}</div><div className="text-xs text-muted">interest {rand(Math.round((last.compound - p) * 100) / 100)}</div></div>
        <div className="rounded-xl border border-line p-3"><div className="text-xs font-bold text-muted uppercase">Compound earns extra</div><div className="font-display text-xl font-bold text-success">{rand(Math.round((last.compound - last.simple) * 100) / 100)}</div><div className="text-xs text-muted">interest on interest</div></div>
      </div>

      <div className="mt-3"><Toggle on={working} onChange={setWorking}>Show the exam working</Toggle></div>
      {working && (
        <Explain colour={C}>
          <p><strong>Simple interest:</strong> Interest = P × r × n = {rand(p)} × {String(rate / 100).replace(".", ",")} × {years} = <strong>{rand(simpleInterest(p, rate, years))}</strong>. Total = {rand(p)} + {rand(simpleInterest(p, rate, years))} = <strong>{rand(last.simple)}</strong>.</p>
          <p className="mt-2"><strong>Compound interest:</strong> A = P(1 + r)ⁿ = {rand(p)} × (1 + {String(rate / 100).replace(".", ",")})<sup>{years}</sup> = <strong>{rand(last.compound)}</strong>. Or year by year: add each year&apos;s interest to the capital before you calculate the next year.</p>
          <p className="mt-2 text-muted">{years === 1 ? "After one year the two are the same – the difference only starts in year 2." : "Simple interest grows in a straight line. Compound interest grows faster every year because you earn interest on your interest."} Always write the formula first – it earns a mark.</p>
        </Explain>
      )}
    </WidgetFrame>
  );
}
