"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        const handler = (e: MessageEvent) => {
            if (!e.origin.includes("calendly.com")) return;

            console.log(e.data);

            const data =
                typeof e.data === "string"
                    ? (() => {
                        try {
                            return JSON.parse(e.data);
                        } catch {
                            return null;
                        }
                    })()
                    : e.data;

            if (!data || data.event !== "calendly.page_height") return;

            const iframe = document.querySelector(
                ".calendly-inline-widget iframe"
            );

            if (!(iframe instanceof HTMLIFrameElement)) return;

            const rawHeight = data.payload?.height;
            if (rawHeight == null) return;

            let numericHeight: number;

            if (typeof rawHeight === "number") {
                numericHeight = rawHeight;
            } else {
                const parsed = parseInt(rawHeight, 10);
                if (Number.isNaN(parsed)) return;
                numericHeight = parsed;
            }

            const finalHeight = Math.max(numericHeight, 1100);

            iframe.style.height = `${finalHeight}px`;
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/vgerrans/seer-early-access?background_color=1a1a1a&text_color=ffffff&primary_color=42b850"
        />
    );
}
