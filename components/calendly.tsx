"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="calendly-inline-widget h-[650px] w-full"
            data-url="https://calendly.com/vgerrans/seer-early-access?background_color=1a1a1a&text_color=ffffff&primary_color=42b850"
            style={{ minWidth: "320px", height: "1100px" }}
        />
    );
}
