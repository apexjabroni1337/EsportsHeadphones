import { ImageResponse } from "next/og";
import { headphones } from "@/data";

export const runtime = "nodejs";
export const revalidate = 86400; // 24 hours

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "home";
    const title = searchParams.get("title") || "EsportsHeadphones";
    const slug = searchParams.get("slug");

    let headphoneName = null;
    if (slug) {
      const headphone = headphones.find((h) => h.slug === slug);
      headphoneName = headphone?.name;
    }

    const displayTitle = headphoneName || title;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 100%)",
            padding: "60px",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#00f0ff",
                  marginRight: "12px",
                }}
              >
                EsportsHeadphones
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "700",
                color: "#ffffff",
                margin: "0 0 20px 0",
                lineHeight: "1.2",
                maxWidth: "90%",
              }}
            >
              {displayTitle}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                color: "#b0b8d4",
                margin: "0",
                maxWidth: "90%",
              }}
            >
              The Definitive Guide to Pro Esports Headphones
            </p>

            {/* Bottom accent */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "40px",
                  background: "#00f0ff",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "40px",
                  background: "#b366ff",
                  borderRadius: "4px",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "40px",
                  background: "#ff3366",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      }
    );
  } catch (e) {
    console.error("OG image generation error:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
