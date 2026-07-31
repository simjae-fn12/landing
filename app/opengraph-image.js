import { ImageResponse } from "next/og";

export const alt =
  "NEXT Securities — A new standard for financial experience.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#071611",
          color: "#f2f6ef",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "64px 72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at center, rgba(102, 255, 173, 0.38) 0%, rgba(22, 99, 70, 0.18) 42%, rgba(7, 22, 17, 0) 72%)",
            border: "1px solid rgba(158, 255, 202, 0.22)",
            borderRadius: 420,
            display: "flex",
            height: 760,
            position: "absolute",
            right: -190,
            top: -210,
            width: 760,
          }}
        />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          NEXT SECURITIES
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#93f5bd",
              display: "flex",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: 22,
            }}
          >
            DIGITAL FINANCIAL EXPERIENCE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
              maxWidth: 820,
            }}
          >
            A new standard for
            <br />
            financial experience.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            borderTop: "1px solid rgba(242, 246, 239, 0.22)",
            color: "rgba(242, 246, 239, 0.72)",
            display: "flex",
            fontSize: 19,
            justifyContent: "space-between",
            paddingTop: 24,
          }}
        >
          <span>AI가 만드는 새로운 투자 경험</span>
          <span>NEXT SECURITIES · 2026</span>
        </div>
      </div>
    ),
    size,
  );
}
