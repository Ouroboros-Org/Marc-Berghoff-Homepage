import Image from "next/image";

import { cn } from "@/lib/utils";

import styles from "./credential-badges.module.css";

const credentials = [
  {
    abbreviation: "ACC",
    issuer: "ICF",
    name: "Associate Certified Coach",
    image: "/images/credentials/acc.webp",
    href: "https://www.credly.com/badges/3ef5dbc3-30a7-4ae0-b9f1-d5e21d6caded/public_url",
  },
  {
    abbreviation: "CPCC",
    issuer: "Co-Active",
    name: "Certified Professional Co-Active Coach",
    image: "/images/credentials/cpcc.webp",
    href: "https://www.credly.com/badges/2e498aea-87f1-4353-b575-679679b12547/public_url",
  },
] as const;

export function CredentialBadges({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn(styles.badges, compact && styles.compact, className)}>
      {credentials.map((credential) => (
        <a
          aria-label={`View Marc Berghoff's ${credential.name} (${credential.abbreviation}) credential on Credly`}
          className={styles.badge}
          href={credential.href}
          key={credential.abbreviation}
          rel="noreferrer"
          target="_blank"
        >
          <Image alt="" height={60} src={credential.image} width={60} />
          <span>
            <strong>{credential.abbreviation}</strong>
            <span>{credential.issuer}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
