import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import cloud1 from '../../img/cloud1.png';

export default function LandingPage() {
  const headingRef   = useRef(null);
  const ctaRef       = useRef(null);
  const cloudsRef    = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1) Heading fades up
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // 2) Buttons fade up
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );

    // 3) Clouds drift in from sides
    tl.fromTo(
      cloudsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.0 },
      '-=0.2'
    );

    // 4) Dashboard slides up
    tl.fromTo(
      dashboardRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.7'
    );
  }, []);

  return (
    <div className="relative w-full">
      {/* Background – fixed to viewport */}
      <img
        src="/img/teamster-bg.png"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 h-screen w-screen object-cover object-top pointer-events-none -z-10"
      />

      {/* Hero – takes exactly one viewport height, scrolls away normally */}
      <div className="relative h-screen w-full flex flex-col items-center overflow-hidden z-10">

        {/* ─── Hero Heading ─── */}
        <div
          ref={headingRef}
          className="text-center mt-[clamp(5rem,14vh,9rem)] px-4"
        >
          <h1
            className="font-bold leading-tight"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.75rem, 4.8vw, 4rem)' }}
          >
            <span className="block text-gray-900">
              Use AI to manage the
            </span>
            <span
              className="block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, #9DD5F3, #4AABF0)' }}
            >
              logistics of your startup
            </span>
          </h1>
        </div>

        {/* ─── CTA Buttons ─── */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          <a
            href="https://app.teamsterx.com/account"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#4AABF0] px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#3a9be0] focus:outline-none focus:ring-2 focus:ring-[#4AABF0]/50 focus:ring-offset-2 body-font"
          >
            Log in
          </a>
          <a
            href="https://app.teamsterx.com/account"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-gray-300 bg-white/50 px-8 py-3 text-lg font-semibold text-gray-700 backdrop-blur-sm transition hover:bg-white/75 focus:outline-none focus:ring-2 focus:ring-gray-300/60 focus:ring-offset-2 body-font"
          >
            Sign up
          </a>
        </div>

        {/* ─── Clouds + Dashboard ─── */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">

          {/* Clouds – sit behind dashboard */}
          <div
            ref={cloudsRef}
            className="absolute inset-x-0 bottom-0 flex items-end justify-between pointer-events-none z-[5]"
          >
            <img src={cloud1} alt="" aria-hidden="true" className="w-[48%] sm:w-[38%] -translate-x-4" />
            <img src={cloud1} alt="" aria-hidden="true" className="w-[48%] sm:w-[38%] translate-x-4 scale-x-[-1]" />
          </div>

          {/* Dashboard – above clouds */}
          <div
            ref={dashboardRef}
            className="relative z-[10] w-full max-w-5xl px-6 sm:px-12"
          >
            <img
              src="/img/teamster.png"
              alt="TeamsterX application dashboard"
              className="w-full drop-shadow-2xl rounded-t-xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

