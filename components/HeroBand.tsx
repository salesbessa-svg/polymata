"use client"

import AnimatedHeroText from "./AnimatedHeroText"

export default function HeroBand() {

  return (

    <section className="relative h-[80vh] w-full overflow-hidden pt-[72px]">

      {/* VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >

        <source src="/video/fachada.webm" type="video/webm" />
        <source src="/video/fachada.mp4" type="video/mp4" />

      </video>

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* TEXTO */}

      <div className="relative z-10 flex items-center justify-center h-full text-center px-10">

        <AnimatedHeroText />

      </div>

    </section>

  )

}