import type { Metadata } from "next";
import { Toolkit } from "@/components/pages/toolkit";

export const metadata: Metadata = { title: "Labs & tools", description: "Interactive Grade 12 Business Studies labs and tools: Act Finder, SWOT, Porter and PESTLE models, the interest lab, the average-clause lab, force-field analysis, forms of ownership compared, an essay planner and a paper planner." };

export default function ToolkitPage() {
  return <Toolkit />;
}
