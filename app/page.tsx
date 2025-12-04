"use client"

import CalendlyEmbed from "@/components/calendly"
import { useState, useEffect } from "react"
import Image from "next/image";

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  useEffect(() => {
    const testVideo = document.createElement("video")

    const sources = [
      "/videos/eye.webm",
      "/videos/eye.mp4",
    ]

    let loaded = false

    const tryNext = (index: number) => {
      if (index >= sources.length) return

      testVideo.src = sources[index]
      testVideo.preload = "auto"
      testVideo.muted = true
      testVideo.playsInline = true

      testVideo.onloadeddata = () => {
        if (!loaded) {
          loaded = true
          setVideoLoaded(true)
        }
      }

      testVideo.onerror = () => {
        tryNext(index + 1)
      }
    }

    tryNext(0)

    return () => {
      testVideo.onloadeddata = null
      testVideo.onerror = null
    }
  }, [])

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#01040f" }}>
      <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#01040f" }}>
        {/* Background Video */}
        {videoLoaded && (
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full opacity-75"
            >
              <source src="/videos/eye.webm" type="video/webm" />
              <source src="/videos/eye.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-20">

          {/* Header */}
          <header className="flex justify-between items-center pt-6 md:pt-8 lg:pt-12">
            <Image
              src="/images/logo.png"
              alt="SEER Logo"
              width={200}
              height={50}
              className="w-28 md:w-40 lg:w-48 h-auto"
              priority
            />
            <button
              onClick={() => {
                document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="gradient-button text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base right-8"
            >
              Get Early Access
            </button>
          </header>
          <div className="md:hidden mt-auto pb-20 text-left">
            <h1 className="text-white text-5xl font-black leading-none max-w-6xl font-semibold uppercase">
              Turn Weeks of Transaction Debugging Into Minutes
            </h1>

            <div className="mt-8 mx-auto w-fit">
              <button
                onClick={() => {
                  document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="gradient-button text-white px-8 py-3 rounded-full font-medium text-base"
              >
                Learn More
              </button>
            </div>
          </div>
          {/* --- TABLET (md–xl): text bottom-left, CTA below it, right-aligned --- */}
          <div className="hidden md:block xl:hidden">
            <div className="absolute bottom-20 left-12 right-12">
              <h1 className="text-white sm:text-6xl md:text-7xl xl:text-8xl font-black leading-none max-w-6xl font-semibold uppercase">
                Turn Weeks of Transaction Debugging Into Minutes
              </h1>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="gradient-button text-white px-10 py-4 rounded-full font-medium text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* --- DESKTOP (xl+): mirrored bottom-left & bottom-right layout --- */}
          <div className="hidden xl:block">
            <div className="absolute bottom-34 left-50 right-20">
              <h1 className="text-white text-8xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-8xl font-black leading-none max-w-6xl font-semibold uppercase">
                Turn Weeks of Transaction Debugging Into Minutes
              </h1>

              <div className="absolute right-8 bottom-0">
                <button
                  onClick={() => {
                    document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="gradient-button text-white px-10 py-4 rounded-full font-medium text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Transaction Debugging Section */}
      <section
        id="learn-more"
        className="relative flex items-center justify-center px-6 md:px-12 lg:px-24 py-20"
        style={{ backgroundColor: "#01040f" }}
      >
        <div className="max-w-3xl">
          {/* Title */}
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-10">
            Transaction debugging should be quick
          </h2>

          <div className="text-white text-sm md:text-base space-y-6 font-medium">
            <p className="leading-relaxed">
              The Solana ecosystem makes transaction debugging a long, painful process. For complex transactions,
              developers have to
            </p>
            <div className="max-w-2xl mx-auto py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:h-28">
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                ">
                  <p>inspect logs to pinpoint error causes</p>
                  <p className="font-semibold mt-0.5">
                    (<span className="text-red-400">hours</span>)
                  </p>
                </div>

                <hr className="block md:hidden w-1/2 mx-auto border-white/20 mb-3" />
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                  md:border-l md:border-r border-white/30
                ">
                  <p>develop mocks and fixtures to replicate state</p>
                  <p className="font-semibold mt-0.5">
                    (<span className="text-red-500">days</span>)
                  </p>
                </div>

                <hr className="block md:hidden w-1/2 mx-auto border-white/20 mb-3" />
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                ">
                  <p>set up multiple test frameworks for different cases</p>
                  <p className="font-semibold mt-0.5">
                    (<span className="text-red-600">weeks</span>)
                  </p>
                </div>

              </div>
            </div>

            <p className="leading-relaxed pt-2">
              But diagnosing a transaction error should be as simple as:{" "}
              <span className="font-black">
                tell me <i>what</i> happened and <i>where</i>.
              </span>
            </p>

            <p className="leading-relaxed font-black text-lg md:text-xl pt-2">And it's about to be.</p>
          </div>
        </div>
      </section>

      {/* Introducing Seer Section */}
      <section
        className="relative flex items-center justify-center px-6 md:px-12 lg:px-24 py-20"
        style={{ backgroundColor: "#01040f" }}
      >
        <div className="max-w-3xl">
          {/* Title */}
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-8 md:mb-10">Introducing Seer</h2>

          {/* Content */}
          <div className="text-white text-sm md:text-base space-y-6 font-medium">
            <div className="max-w-2xl mx-auto py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:h-14">
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                ">
                  <p>launch Seer RPC</p>
                  <p className="font-semibold mt-2">
                    (<span className="text-green-600">1 click</span>)
                  </p>
                </div>

                <hr className="block md:hidden w-1/2 mx-auto border-white/20 mb-3" />
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                  md:border-l md:border-r border-white/30
                ">
                  <p>
                    run <code className="bg-white/10 px-2 py-1 rounded">seer build</code>
                  </p>
                  <p className="font-semibold mt-2">
                    (<span className="text-green-500">seconds</span>)
                  </p>
                </div>

                <hr className="block md:hidden w-1/2 mx-auto border-white/20 mb-3" />
                <div className="
                  flex flex-col justify-between text-center leading-relaxed md:px-4 
                  md:h-32 md:h-auto border-white/20
                ">
                  <p>run tests on Seer RPC</p>
                  <p className="font-semibold mt-2">
                    (<span className="text-green-400">minutes</span>)
                  </p>
                </div>

              </div>
            </div>

            <p className="leading-relaxed pt-2">
              Every transaction in your test generates a full transaction trace, with mappings to source code, including
              mainnet contracts, and variable values at the time of execution.
            </p>

            <p className="leading-relaxed">
              Every transaction error comes with the exact line, exact state, and exact backtrace in source code.
            </p>
          </div>
        </div>
      </section>

      {/* Closed Beta Section */}
      <section
        id="early-access"
        className="relative flex items-center justify-center px-6 md:px-12 lg:px-24 py-20"
        style={{ backgroundColor: "#01040f" }}
      >
        <div className="max-w-3xl w-full">
          {/* Title */}
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-12 md:mb-16 text-center">
            Closed Beta Coming January 2026
          </h2>

          {/* Timeline */}
          <div className="space-y-4 mb-12 md:mb-16">
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-green-500 text-xl">✓</span>
              <span>Project Inception (August 2026)</span>
            </div>
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-green-500 text-xl">✓</span>
              <span>Proof of Concept (September 2026)</span>
            </div>
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-green-500 text-xl">✓</span>
              <span>Cypherpunk Hackathon (October 2026)</span>
            </div>
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-green-500 text-xl">✓</span>
              <span>Seer CLI (November 2026)</span>
            </div>
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-yellow-500 text-xl">⏳</span>
              <span>Seer RPC (December 2026)</span>
            </div>
            <div className="flex items-center gap-4 text-white text-sm md:text-base font-medium">
              <span className="text-gray-500 text-xl">⋯</span>
              <span className="text-gray-400">Seer Closed Beta (January 2026)</span>
            </div>
          </div>

          {/* Meet the Founders */}
          <h3 className="text-white text-xl md:text-2xl font-black mb-8 text-center">
            Meet the Founders and Get Early Access
          </h3>

          {/* Calendly Widget */}
          {/* Calendly inline widget begin */}
          <CalendlyEmbed />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative border-t border-white/20 px-6 md:px-12 lg:px-24 py-12"
        style={{ backgroundColor: "#01040f" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white text-sm font-medium">
            {/* Copyright */}
            <div className="text-white/70">2025 Seer © All Rights Reserved</div>

            {/* Social/External Links */}
            <div className="flex gap-6">
              <a href="https://arena.colosseum.org/projects/explore/seer" target="_blank"
                rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                Cypherpunk
              </a>
              <a href="https://github.com/SeerApp/" target="_blank"
                rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                Github
              </a>
              <a
                href="https://x.com/seerforsolana"
                className="text-white hover:text-white/70 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
