import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shawn Schwartz - Software Engineer & Researcher";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1D1D1F",
              marginBottom: 16,
            }}
          >
            Shawn Schwartz
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#6E6E73",
              marginTop: 0,
            }}
          >
            Software Engineer & Researcher
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
            }}
          >
            <span
              style={{
                padding: "8px 20px",
                backgroundColor: "#0071E3",
                color: "white",
                borderRadius: 999,
                fontSize: 20,
              }}
            >
              Blog
            </span>
            <span
              style={{
                padding: "8px 20px",
                backgroundColor: "#0071E3",
                color: "white",
                borderRadius: 999,
                fontSize: 20,
              }}
            >
              Projects
            </span>
            <span
              style={{
                padding: "8px 20px",
                backgroundColor: "#0071E3",
                color: "white",
                borderRadius: 999,
                fontSize: 20,
              }}
            >
              Research
            </span>
          </div>
        </div>
        <p
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 24,
            color: "#0071E3",
          }}
        >
          shawnschwartz.com
        </p>
      </div>
    ),
    { ...size }
  );
}
