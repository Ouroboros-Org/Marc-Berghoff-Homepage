import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPageView } from "@/components/case-study-page";
import { createPageMetadata } from "@/config/metadata";
import { CASE_STUDIES, getCaseStudy } from "@/content/proof";

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};

  return createPageMetadata({
    title: `${caseStudy.client}: ${caseStudy.title}`,
    description: caseStudy.summary,
    path: `/results/${caseStudy.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return <CaseStudyPageView caseStudy={caseStudy} />;
}
