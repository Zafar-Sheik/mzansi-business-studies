"use client";
import { useState } from "react";
import { averageClause, rand } from "@/lib/biz/generators";
import { Explain, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

const C = "var(--t-cell)";

/** Under-insurance, over-insurance and the average clause – with the full exam calculation. */
export function InsuranceLab() {
  const touch = useToolUse();
  const [value, setValue] = useState(800000);
  const [insured, setInsured] = useState(600000);
  const [damage, setDamage] = useState(200000);
  const set = (f: (v: number) => void) => (v: number) => { touch(); f(v); };
  const loss = Math.min(damage, value);
  const pay = Math.round(averageClause(insured, value, loss));
  const status = insured < value ? "under" : insured > value ? "over" : "full";
  const pct = Math.round((insured / value) * 100);

  return (
    <WidgetFrame title="Insurance lab: the average clause" colour={C} instruction="Change the market value, the amount insured and the damage. Who pays for the loss?">
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label="Market value of the property" value={value} min={200000} max={2000000} step={50000} onChange={set(setValue)} colour={C} format={rand} />
        <Slider label="Amount insured" value={insured} min={100000} max={2500000} step={50000} onChange={set(setInsured)} colour={C} format={rand} />
        <Slider label="Damage (loss)" value={loss} min={25000} max={value} step={25000} onChange={set(setDamage)} colour={C} format={rand} />
      </div>

      <div className="mt-4 rounded-xl border border-line p-3">
        <div className="flex items-center justify-between text-sm"><span className="font-bold">{status === "under" ? "⚠️ Under-insured" : status === "over" ? "💸 Over-insured" : "✅ Fully insured"}</span><span className="text-muted">insured for {pct}% of the value</span></div>
        <div className="mt-2 flex h-8 overflow-hidden rounded-lg border border-line text-xs font-bold text-white" role="img" aria-label={`The insurer pays ${rand(pay)} and the owner carries ${rand(loss - pay)}`}>
          <div className="grid place-items-center bg-success transition-[width]" style={{ width: `${(pay / loss) * 100}%` }}>{pay / loss > 0.25 && `Insurer ${rand(pay)}`}</div>
          <div className="grid flex-1 place-items-center bg-danger">{(loss - pay) / loss > 0.25 && `Owner ${rand(loss - pay)}`}</div>
        </div>
        <p className="mt-1 text-xs text-muted">Who pays for the {rand(loss)} of damage.</p>
      </div>

      <Explain colour={C}>
        {status === "under" && <>
          <p><strong>Under-insurance:</strong> the property is insured for less than its market value, so the <strong>average clause</strong> applies – the owner is his or her own insurer for the part that is not covered.</p>
          <p className="mt-2 font-mono text-[13px]">Amount insured ÷ market value × amount of damage<br />= {rand(insured)} ÷ {rand(value)} × {rand(loss)}<br />= <strong>{rand(pay)}</strong></p>
          <p className="mt-2">The owner must carry the other <strong>{rand(loss - pay)}</strong>.</p>
        </>}
        {status === "over" && <p><strong>Over-insurance:</strong> the property is insured for more than its market value. The insurer still pays only the proven loss of <strong>{rand(pay)}</strong> – the principle of <strong>indemnification</strong> says you may not profit from insurance. The extra premium was wasted.</p>}
        {status === "full" && <p><strong>Fully insured:</strong> the amount insured equals the market value, so the proven loss of <strong>{rand(pay)}</strong> is paid out in full (less any excess).</p>}
      </Explain>
    </WidgetFrame>
  );
}
