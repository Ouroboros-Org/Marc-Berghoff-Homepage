import { ImageResponse } from "next/og";

import { getBlogPost } from "@/content/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Marc Berghoff insights";
  const category = post?.category ?? "Leadership and organisation";
  const titleSize = title.length > 62 ? 55 : 64;

  return new ImageResponse(
    <div
      style={{
        background: "#f1f6ff",
        color: "#11151a",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ background: "#7cb0ff", display: "flex", width: 34 }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 72px 56px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 23,
            fontWeight: 700,
            justifyContent: "space-between",
            letterSpacing: "-0.02em",
          }}
        >
          <span>MARC BERGHOFF</span>
          <span style={{ color: "#173d70", fontSize: 18, letterSpacing: "0.08em" }}>
            INSIGHTS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              color: "#173d70",
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: "2px solid #cbd7e8",
            color: "#4f5965",
            display: "flex",
            fontSize: 20,
            justifyContent: "space-between",
            paddingTop: 24,
          }}
        >
          <span>Notes for founders and leadership teams</span>
          <span
            style={{
              background: "#fec302",
              borderRadius: 999,
              display: "flex",
              height: 13,
              width: 13,
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
