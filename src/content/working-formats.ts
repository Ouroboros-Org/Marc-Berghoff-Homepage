import type { SiteLocale } from "@/config/routes";
import { ENGAGEMENTS, type EngagementId } from "@/content/engagements";

export type WorkingFormatId = EngagementId;

export type WorkingFormat = {
  id: WorkingFormatId;
  title: string;
  responsibility: string;
  signal: string;
  summary: string;
  href: string;
  meta: string;
  kind: "core";
};

export const WORKING_FORMATS: readonly WorkingFormat[] = ENGAGEMENTS.map(
  (engagement) => ({
    id: engagement.id,
    title: engagement.title,
    responsibility: engagement.situation,
    signal: engagement.summary,
    summary: engagement.summary,
    href: engagement.href,
    meta: engagement.rhythm,
    kind: "core",
  }),
);

// Keep the existing caller contract while public content moves to English only.
export const getWorkingFormats: (
  locale: SiteLocale,
) => readonly WorkingFormat[] = () => WORKING_FORMATS;
