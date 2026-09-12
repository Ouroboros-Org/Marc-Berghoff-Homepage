import { FractionalPeopleLeadershipPageView } from "@/components/service-pages/fractional-people-leadership-page";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Fractional CPO & Ongoing Strategic People Advisory",
  description: "Experienced Chief People Officer support for people strategy, leadership and organisational development. Flexible involvement as your company grows.",
  path: "/fractional-cpo",
});

export default function FractionalCpoPage() {
  return <FractionalPeopleLeadershipPageView locale="en" />;
}
