import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050B14 0%, #0A1626 55%, #0066FF 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -1,
            display: "flex",
          }}
        >
          Artisans Michelet
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontWeight: 400,
            color: "#9CB8DE",
            display: "flex",
          }}
        >
          Plombier &amp; Serrurier dans l&apos;Hérault (34)
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            fontWeight: 600,
            color: "#0066FF",
            display: "flex",
          }}
        >
          Intervention 24h/24 · 7j/7
        </div>
      </div>
    ),
    { ...size }
  );
}
