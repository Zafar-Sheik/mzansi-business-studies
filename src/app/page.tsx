import { Hero } from "@/components/home/hero";
import { AdhdSection, Features, FinalCta, LessonFlow, ExamShelf, PracticeStrip, StrandTracks, TermMarquee, type TopicSummary } from "@/components/home/sections";
import { EXAM_QUESTIONS, GLOSSARY, LESSONS, lessonsForTopic } from "@/content";
import { WIDGET_CATALOGUE } from "@/components/widgets/catalogue";
import { TOPICS, topicMeta } from "@/lib/topics";
import { shuffle } from "@/lib/utils";

export default function HomePage() {
  const topics: TopicSummary[] = TOPICS.map((t) => ({
    topic: t.topic,
    lessons: lessonsForTopic(t.topic).map((l) => ({ slug: l.slug, title: l.title, emoji: l.emoji })),
  }));
  const marquee = shuffle(GLOSSARY, "home").slice(0, 14).map((g) => ({ title: g.term, text: g.def, colour: topicMeta(g.topic).colour }));
  const examParts = EXAM_QUESTIONS.reduce((n, q) => n + q.parts.length, 0);
  const card = (l: (typeof LESSONS)[number]) => ({ slug: l.slug, title: l.title, emoji: l.emoji, tagline: l.tagline });
  return (
    <>
      <Hero stats={{ lessons: LESSONS.length, tools: WIDGET_CATALOGUE.length, exam: examParts, terms: GLOSSARY.length }} />
      <TermMarquee terms={marquee} />
      <StrandTracks topics={topics} />
      <PracticeStrip />
      <ExamShelf lessons={LESSONS.filter((l) => topicMeta(l.topic).paper === 3).map(card)} />
      <Features tools={WIDGET_CATALOGUE.length} />
      <LessonFlow />
      <AdhdSection />
      <FinalCta firstSlug={LESSONS[0].slug} />
    </>
  );
}
