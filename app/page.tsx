import Navbar from "@/components/Navbar"
import HeroBand from "@/components/HeroBand"

export default function Home() {

  return (

    <main className="bg-black text-white">

      <Navbar />

      <HeroBand />

      {/* próximas faixas */}

      <section className="h-[120vh] bg-neutral-950 flex items-center justify-center">

        <h2 className="text-5xl font-light tracking-wide">
          sofisticação estratégica
        </h2>

      </section>

      <section className="h-[120vh] bg-black flex items-center justify-center">

        <h2 className="text-5xl font-light tracking-wide">
          presença memorável
        </h2>

      </section>

    </main>

  )

}