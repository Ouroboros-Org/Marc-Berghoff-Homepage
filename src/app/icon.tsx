import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#173d70",
        borderRadius: 104,
        color: "#ffffff",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 174,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.09em",
        paddingRight: 18,
        position: "relative",
        width: "100%",
      }}
    >
      MB
      <span
        style={{
          background: "#fec302",
          borderRadius: 999,
          bottom: 74,
          display: "flex",
          height: 50,
          position: "absolute",
          right: 72,
          width: 50,
        }}
      />
    </div>,
    size,
  );
}
