import { ImageResponse } from "next/og";

export const alt = "Marc Berghoff, organisational psychologist, Vistage Chair and executive coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#f7f9fc",
        color: "#11151a",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#7cb0ff",
          display: "flex",
          flex: "0 0 36px",
        }}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 78px 62px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            gap: 16,
            letterSpacing: "-0.02em",
          }}
        >
          <span>MARC BERGHOFF</span>
          <span
            style={{
              background: "#fec302",
              borderRadius: 999,
              display: "flex",
              height: 12,
              width: 12,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
              maxWidth: 930,
            }}
          >
            You&apos;ve already tried everything that should have worked.
          </div>
          <div
            style={{
              color: "#353b43",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 790,
            }}
          >
            I find what is constraining the company, before anyone starts fixing it.
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: "2px solid #d9dee6",
            color: "#626b76",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            paddingTop: 26,
          }}
        >
          <span>Malta · working internationally</span>
          <span style={{ color: "#173d70", fontWeight: 700 }}>
            Organisational psychologist · executive coach
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
