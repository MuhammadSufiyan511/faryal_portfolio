export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(201,162,78,0.12),_transparent_30%),linear-gradient(180deg,_#faf8f4_0%,_#f3efe8_100%)] px-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="mesh-orb mesh-orb-gold absolute left-[-8rem] top-[-4rem] h-[28rem] w-[28rem] opacity-25" />
        <div className="mesh-orb mesh-orb-violet absolute bottom-[-6rem] right-[-8rem] h-[24rem] w-[24rem] opacity-20" />
        <div className="mesh-orb mesh-orb-teal absolute left-[18%] top-[22%] h-[16rem] w-[16rem] opacity-15" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <div className="perspective-container relative flex h-56 w-56 items-center justify-center">
          <div
            className="absolute inset-6 rounded-[2rem] border border-white/70 bg-white/50 shadow-[0_24px_60px_rgba(26,26,26,0.12)] backdrop-blur-2xl"
            style={{
              transform: "rotateX(62deg) rotateZ(45deg) translateZ(28px)",
              transformStyle: "preserve-3d",
            }}
          />
          <div
            className="absolute inset-10 rounded-full border border-gold/25 shadow-glow-gold animate-spin-slow"
            style={{ transform: "translateZ(54px)" }}
          />
          <div
            className="absolute inset-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,_rgba(255,255,255,0.95),_rgba(201,162,78,0.18)_45%,_rgba(139,92,246,0.08)_75%,_rgba(255,255,255,0)_100%)] shadow-[0_0_45px_rgba(201,162,78,0.18)] animate-pulse-glow"
            style={{
              transform:
                "translateZ(80px) rotateX(12deg) rotateY(-10deg)",
              transformStyle: "preserve-3d",
            }}
          />
          <div className="absolute inset-0 rounded-full border border-gold/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.55)]" />

          <div
            className="absolute h-4 w-4 rounded-full bg-gold shadow-[0_0_24px_rgba(201,162,78,0.55)]"
            style={{
              transform:
                "translate3d(84px,-30px,92px) rotateX(18deg) rotateY(14deg)",
            }}
          />
          <div
            className="absolute h-3 w-3 rounded-full bg-violet/70 shadow-[0_0_20px_rgba(139,92,246,0.45)]"
            style={{
              transform:
                "translate3d(-78px,38px,76px) rotateX(-10deg) rotateY(12deg)",
            }}
          />
          <div
            className="absolute h-2.5 w-2.5 rounded-full bg-teal/70 shadow-[0_0_18px_rgba(20,184,166,0.35)]"
            style={{
              transform:
                "translate3d(18px,96px,66px) rotateX(8deg) rotateY(-12deg)",
            }}
          />
        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/15 bg-white/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.32em] text-gold shadow-soft backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
          Loading the studio
        </div>

        <h1 className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] text-charcoal sm:text-5xl md:text-6xl">
          Welcome to Faryal&apos;s Gallery
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-charcoal/60 sm:text-base">
          Curating light, texture, and calligraphic calm before the collection
          appears.
        </p>

        <div className="mt-8 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gold/70 animate-pulse-glow" />
          <span className="h-2.5 w-2.5 rounded-full bg-violet/50 animate-pulse-glow [animation-delay:150ms]" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/50 animate-pulse-glow [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
