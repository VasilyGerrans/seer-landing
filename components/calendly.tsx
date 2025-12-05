"use client";

import { useEffect } from "react";

export default function CalendlyEmbed() {
    useEffect(() => {
        localStorage.setItem("cookieConsent", "true")

        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div
                className="calendly-inline-widget"
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    height: "700px",
                }}
                data-url="https://calendly.com/vgerrans/seer-early-access?background_color=1a1a1a&text_color=ffffff&primary_color=42b850"
            ></div>
        </div>
    );
}
