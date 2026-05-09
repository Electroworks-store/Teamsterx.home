import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import cloud1 from '../../img/cloud1.png';
import cloud2 from '../../img/cloud2.png';

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

      {/* Hero – extended height to prevent footer overlap */}
      <div className="relative h-[150vh] w-full flex flex-col items-center z-10 overflow-visible">

        {/* ─── Hero Heading ─── */}
        <div
          ref={headingRef}
          className="text-center pt-32 sm:pt-40 px-4 relative"
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

          {/* Cloud2 – overlapping right side, cut off at halfway point */}
          <img
            src={cloud2}
            alt=""
            aria-hidden="true"
            className="absolute -right-1/2 top-20 sm:top-32 w-[48rem] sm:w-[64rem] lg:w-[80rem] z-20 pointer-events-none"
          />
        </div>

        {/* ─── CTA Buttons ─── */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <a
            href="https://app.teamsterx.com/account"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#4AABF0] px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#3a9be0] hover:shadow-lg hover:scale-105 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#4AABF0]/50 focus:ring-offset-2 body-font"
          >
            Log in
          </a>
          <a
            href="https://app.teamsterx.com/account"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-gray-300 bg-transparent px-8 py-3 text-lg font-semibold text-gray-700 transition-all duration-300 hover:bg-white/30 hover:border-[#4AABF0] hover:shadow-lg hover:scale-105 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300/60 focus:ring-offset-2 body-font"
          >
            Sign up
          </a>
        </div>

        {/* ─── Clouds + Dashboard ─── */}
        <div className="relative w-screen flex items-center justify-center mt-8 sm:mt-12">

          {/* Clouds – full width, edge to edge */}
          <div
            ref={cloudsRef}
            className="absolute inset-x-0 top-0 flex items-start justify-between pointer-events-none z-[5] w-screen"
          >
            <img src={cloud1} alt="" aria-hidden="true" className="w-1/2 object-cover -translate-x-1/4" />
            <img src={cloud1} alt="" aria-hidden="true" className="w-1/2 object-cover translate-x-1/4 scale-x-[-1]" />
          </div>

          {/* Dashboard – centered */}
          <div
            ref={dashboardRef}
            className="relative w-full max-w-5xl px-6 sm:px-12 z-[10]"
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

