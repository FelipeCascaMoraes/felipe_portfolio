import { ImageResponse } from "next/og";
import { hero } from "@/data/content";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f4f6fb",
          backgroundColor: "#05070c",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(74,133,255,0.35), rgba(5,7,12,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "#0a0e17",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{site.name}</div>
            <div style={{ fontSize: 20, color: "#8fb2ff", letterSpacing: 4 }}>
              {site.role.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {`${hero.title} ${hero.titleHighlight}`}
          </div>
          <div style={{ fontSize: 28, color: "#a3acbf" }}>
            IA e agentes · Automações · CRMs e ERPs · Integrações
          </div>
        </div>
      </div>
    ),
    size,
  );
}
