"use client";
import dynamic from "next/dynamic";
import type { WidgetName } from "@/content/types";

const loading = () => <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface-2" />;

/** Widgets are code-split so each lesson only downloads what it uses. */
const REGISTRY: Record<WidgetName, React.ComponentType<Record<string, unknown>>> = {
  sorter: dynamic(() => import("./sorter").then((m) => m.Sorter as never), { loading }),
  drill: dynamic(() => import("./drill").then((m) => m.Drill as never), { loading }),
  model: dynamic(() => import("./model-explorer").then((m) => m.ModelExplorer as never), { loading }),
  "interest-lab": dynamic(() => import("./interest-lab").then((m) => m.InterestLab as never), { loading }),
  "insurance-lab": dynamic(() => import("./insurance-lab").then((m) => m.InsuranceLab as never), { loading }),
  "force-field-lab": dynamic(() => import("./force-field-lab").then((m) => m.ForceFieldLab as never), { loading }),
  "ownership-lab": dynamic(() => import("./ownership-lab").then((m) => m.OwnershipLab as never), { loading }),
  "essay-planner": dynamic(() => import("./essay-planner").then((m) => m.EssayPlanner as never), { loading }),
  "act-finder": dynamic(() => import("./act-finder").then((m) => m.ActFinder as never), { loading }),
  "paper-planner": dynamic(() => import("./paper-planner").then((m) => m.PaperPlanner as never), { loading }),
};

export function Widget({ name, props }: { name: WidgetName; props?: Record<string, unknown> }) {
  const C = REGISTRY[name];
  if (!C) return <p className="text-danger">Unknown widget: {name}</p>;
  return <C {...(props ?? {})} />;
}
