"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Explain, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

const C = "var(--t-cell)";

export interface OwnershipForm {
  id: string; name: string; emoji: string; suffix: string;
  owners: string; liability: string; limited: boolean; capital: string; tax: string; management: string; continuity: string; has: boolean; legal: string; profit: string;
  plus: string[]; minus: string[];
}

export const FORMS: OwnershipForm[] = [
  { id: "sole", name: "Sole trader", emoji: "🧍", suffix: "No special ending", owners: "One owner", liability: "Unlimited – the owner is personally liable for all debts", limited: false,
    capital: "Limited to the owner's savings and loans – difficult to raise capital", tax: "The business is not taxed; the owner pays personal income tax on the profit", management: "The owner manages alone and makes quick decisions", continuity: "No continuity – the business ends if the owner dies or retires", has: false,
    legal: "No legal formalities to start (only licences); not a separate legal person", profit: "All the profit belongs to the owner",
    plus: ["Easy and cheap to establish", "Quick decisions – the owner has full control", "The owner keeps all the profit, which motivates hard work", "Personal contact with customers"],
    minus: ["Unlimited liability – personal assets can be lost", "Limited capital restricts growth", "No continuity", "The owner needs all the skills and carries a heavy workload"] },
  { id: "partnership", name: "Partnership", emoji: "👥", suffix: "No special ending", owners: "Two or more partners", liability: "Unlimited – partners are jointly and severally liable for the debts", limited: false,
    capital: "Partners combine capital, skills and labour – more capital than a sole trader", tax: "The partnership is not taxed; each partner pays personal income tax on his or her share", management: "Partners share management, responsibilities and decision-making", continuity: "No continuity – it dissolves if a partner dies, retires or a new partner joins", has: false,
    legal: "No legal formalities, but a written partnership agreement is advisable; not a separate legal person", profit: "Shared according to the partnership agreement",
    plus: ["Easy and inexpensive to establish", "Workload, skills and risks are shared", "More capital and better access to loans", "Partners are motivated because they share the profit"],
    minus: ["Unlimited liability – jointly and severally liable", "Disagreements can delay decisions", "No continuity", "Each partner is bound by the actions of the others"] },
  { id: "pty", name: "Private company", emoji: "🏬", suffix: "(Pty) Ltd / Proprietary Limited", owners: "One or more shareholders", liability: "Limited – shareholders can lose only what they invested", limited: true,
    capital: "Shares are sold privately – it may NOT offer shares to the public", tax: "The company pays company tax on its profit, and shareholders pay tax on dividends (double taxation)", management: "Managed by at least one director, appointed by the shareholders", continuity: "Continuity of existence – a separate legal person", has: true,
    legal: "Register a Memorandum of Incorporation (MOI) with the CIPC; financial statements are audited or independently reviewed", profit: "Paid to shareholders as dividends",
    plus: ["Limited liability protects personal assets", "Continuity – the life of the business is not linked to its owners", "More capital can be raised by issuing shares to new shareholders", "It does not have to publish its financial statements"],
    minus: ["More legal requirements and costs to register", "Shares are not freely transferable, and it cannot raise capital from the public", "Double taxation", "Directors may not have a personal interest in the profit"] },
  { id: "inc", name: "Personal liability company", emoji: "⚖️", suffix: "Inc. / Incorporated", owners: "One or more shareholders (usually professionals, e.g. attorneys, doctors)", liability: "Directors (present and past) are jointly and severally liable for the debts of the company", limited: false,
    capital: "Shares are sold privately, as in a private company", tax: "Company tax plus tax on dividends", management: "At least one director", continuity: "Continuity of existence – a separate legal person", has: true,
    legal: "Register an MOI with the CIPC; the MOI states that it is a personal liability company", profit: "Paid to shareholders as dividends",
    plus: ["Continuity of existence", "Clients trust it more because directors are personally liable", "Suitable for professional practices"],
    minus: ["Directors can lose personal assets", "Same registration costs and formalities as a private company", "Double taxation"] },
  { id: "ltd", name: "Public company", emoji: "🏛️", suffix: "Ltd / Limited", owners: "One or more shareholders – the public may buy shares", liability: "Limited – shareholders can lose only what they invested", limited: true,
    capital: "Raises large amounts of capital by selling shares to the public (may list on the JSE); must issue a prospectus", tax: "Company tax plus tax on dividends (double taxation)", management: "At least three directors; must appoint a company secretary and an audit committee, and hold an AGM", continuity: "Continuity of existence – a separate legal person", has: true,
    legal: "Register an MOI and a prospectus with the CIPC; financial statements must be audited and published", profit: "Paid to shareholders as dividends",
    plus: ["Large amounts of capital for expansion", "Limited liability", "Shares are freely transferable", "Managed by a competent, professional board of directors"],
    minus: ["Many legal requirements – expensive and difficult to form", "Financial statements must be audited and made public", "Large management structure can slow down decisions", "Risk of a hostile take-over because shares are freely traded"] },
  { id: "soc", name: "State-owned company", emoji: "🏗️", suffix: "SOC Ltd", owners: "The government (state) is the shareholder", liability: "Limited – the state's liability is limited", limited: true,
    capital: "Funded by the government (taxpayers), loans and its own income", tax: "Pays company tax on profits (some are exempt)", management: "At least three directors, appointed by the government", continuity: "Continuity of existence", has: true,
    legal: "Registered with the CIPC as a public entity; must be audited and must hold an AGM", profit: "Used to finance other state departments or reinvested",
    plus: ["Provides essential services (electricity, water, transport) that may not be profitable", "Profits can reduce the tax burden on citizens", "Jobs are created and prices can be kept reasonable"],
    minus: ["Losses must be paid for by taxpayers", "Often inefficient because of the lack of competition and of a profit motive", "Risk of mismanagement and political interference"] },
  { id: "npc", name: "Non-profit company", emoji: "🎗️", suffix: "NPC", owners: "Three or more incorporators – it has no shareholders who benefit", liability: "Limited – members are not liable for its debts", limited: true,
    capital: "Donations, grants and fundraising", tax: "May be exempt from tax if registered as a public benefit organisation", management: "At least three directors", continuity: "Continuity of existence", has: true,
    legal: "Register an MOI with the CIPC", profit: "No dividends – all income is used to promote its stated public-benefit goal",
    plus: ["Profits are used only for its primary objective", "Donors may receive tax deductions", "Limited liability and continuity", "Provides social services to communities"],
    minus: ["Depends on donations, which are not guaranteed", "Members and directors may not share in any surplus", "Assets may not be distributed to members when it closes"] },
  { id: "coop", name: "Co-operative", emoji: "🌾", suffix: "Limited / Ltd", owners: "At least five members with a common need", liability: "Limited – members can lose only their share contributions", limited: true,
    capital: "Members' share contributions – it can be difficult to grow", tax: "The co-operative is taxed as a separate entity", management: "At least three directors; democratic control – one member, one vote", continuity: "Continuity of existence – a separate legal person", has: true,
    legal: "Registered with the CIPC under the Co-operatives Act", profit: "Surplus is shared among members according to their use of the co-operative",
    plus: ["Members share resources, skills and buying power", "Democratic decision-making – each member has an equal say", "Limited liability and continuity", "Can get support and grants from the government"],
    minus: ["Decisions take long because all members must be consulted", "Difficult to raise capital, as shares are not freely sold", "Success depends on the support of its members", "Members may lack management skills"] },
];

const ROWS: { key: keyof OwnershipForm; label: string }[] = [
  { key: "suffix", label: "Name ends with" }, { key: "owners", label: "Owners" }, { key: "liability", label: "Liability" }, { key: "capital", label: "Capital" },
  { key: "tax", label: "Taxation" }, { key: "management", label: "Management" }, { key: "continuity", label: "Continuity" }, { key: "legal", label: "Legislation / formalities" }, { key: "profit", label: "Division of profits" },
];

/** Compare any two forms of ownership on the criteria the exam uses for "success or failure". */
export function OwnershipLab() {
  const touch = useToolUse();
  const [a, setA] = useState("sole");
  const [b, setB] = useState("pty");
  const fa = FORMS.find((f) => f.id === a)!;
  const fb = FORMS.find((f) => f.id === b)!;

  const picker = (value: string, onChange: (v: string) => void, label: string) => (
    <div>
      <div className="mb-1 text-xs font-bold text-muted uppercase">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {FORMS.map((f) => (
          <button key={f.id} onClick={() => { touch(); onChange(f.id); }} aria-pressed={value === f.id}
            className={cn("rounded-lg border px-2 py-1 text-xs font-semibold transition", value === f.id ? "text-white" : "border-line text-muted hover:text-fg")}
            style={value === f.id ? { background: C, borderColor: C } : undefined}>{f.emoji} {f.name}</button>
        ))}
      </div>
    </div>
  );

  return (
    <WidgetFrame title="Forms of ownership: compare two" colour={C} instruction="Pick two forms of ownership. The rows are the criteria examiners use: capital, taxation, management, legislation and division of profits.">
      <div className="grid gap-3 md:grid-cols-2">{picker(a, setA, "Form A")}{picker(b, setB, "Form B")}</div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[32rem] border-collapse text-sm">
          <thead className="bg-surface-2"><tr><th className="w-36 px-3 py-2 text-left">Criteria</th><th className="px-3 py-2 text-left">{fa.emoji} {fa.name}</th><th className="px-3 py-2 text-left">{fb.emoji} {fb.name}</th></tr></thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key} className="border-t border-line/60 align-top">
                <th className="px-3 py-2 text-left text-xs font-bold text-muted">{r.label}</th>
                <td className="px-3 py-2">{String(fa[r.key])}</td>
                <td className="px-3 py-2">{String(fb[r.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {[fa, fb].map((f, i) => (
          <div key={`${f.id}-${i}`} className="rounded-xl border border-line p-3 text-sm">
            <div className="font-display font-bold">{f.emoji} {f.name}</div>
            <div className="mt-2 text-xs font-bold text-success uppercase">Contributes to success</div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">{f.plus.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="mt-2 text-xs font-bold text-danger uppercase">May lead to failure</div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">{f.minus.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <Explain colour={C}>
        {fa.limited !== fb.limited
          ? <p><strong>Biggest difference: liability.</strong> In a {(fa.limited ? fb : fa).name.toLowerCase()} the owners can lose personal assets; in a {(fa.limited ? fa : fb).name.toLowerCase()} the business is a separate legal person and liability is limited.</p>
          : <p>Both have {fa.limited ? "limited" : "personal (unlimited)"} liability{fa.has === fb.has ? ` and ${fa.has ? "continuity of existence" : "no continuity"}` : ""} – look at <strong>capital</strong> and <strong>management</strong> to tell them apart.</p>}
        <p className="mt-2 text-muted">Exam tip: when asked how a form of ownership contributes to the <em>success or failure</em> of a business, write under the criterion in the question (e.g. “Capital”) and give both positives and negatives.</p>
      </Explain>
    </WidgetFrame>
  );
}
