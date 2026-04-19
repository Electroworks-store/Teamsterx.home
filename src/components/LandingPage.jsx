import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TEAMSTER = 'Teamster';
const X = 'X';

export default function LandingPage() {
  const logoCircleRef = useRef(null);
  const headingRef = useRef(null);
  const dashboardRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1) Logo circle fades in
    tl.fromTo(
      logoCircleRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );

    // 2) TeamsterX heading: fade up each letter staggered
    tl.fromTo(
      letterRefs.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 },
      '-=0.2'
    );

    // 3) Dashboard image slides in from left
    tl.fromTo(
      dashboardRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 0.7 },
      '-=0.3'
    );

    // 4) Body text fades up
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );

    // 5) Buttons fade up
    tl.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    );
  }, []);

  // Helper to assign refs to each letter
  const setLetterRef = (el, i) => {
    letterRefs.current[i] = el;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image – blue sky with clouds */}
      <img
        src="/img/teamster-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Content layer */}
      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ─── Small logo circle – top-left ─── */}
        <a
          href="https://teamsterx.com"
          className="absolute left-3 top-3 z-20 inline-flex items-center justify-center"
          ref={logoCircleRef}
          style={{ opacity: 0 }}
        >
          <div className="h-14 w-14 rounded-full bg-white shadow-lg sm:h-16 sm:w-16 flex items-center justify-center p-3">
            <img
              src="/img/logo-no-bg.png"
              alt="TeamsterX"
              className="h-full w-full"
            />
          </div>
        </a>

        {/* ─── Giant Logo ─── */}
        <div
          ref={headingRef}
          className="select-none overflow-hidden mt-32 sm:mt-0 pt-10 sm:pt-16 lg:pt-20 pl-4 sm:pl-12"
        >
          <h1 className="flex items-end whitespace-nowrap leading-[0.88]">
            {/* Teamster letters */}
            {TEAMSTER.split('').map((char, i) => (
              <span
                key={i}
                ref={el => setLetterRef(el, i)}
                style={{
                  fontFamily: 'var(--font-montserrat-black-italic)',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  opacity: 0,
                  display: 'inline-block',
                  color: '#fff',
                  fontSize: '14vw',
                  lineHeight: 1,
                  marginRight: char === 'r' ? '0.1em' : 0,
                }}
              >
                {char}
              </span>
            ))}
            {/* X letter */}
            <span
              ref={el => setLetterRef(el, TEAMSTER.length)}
              style={{
                fontFamily: 'var(--font-playfair)',
                fontStyle: 'italic',
                opacity: 0,
                display: 'inline-block',
                color: '#4AABF0',
                fontWeight: 700,
                fontSize: '17vw',
                lineHeight: 1,
                marginLeft: '-0.3vw',
              }}
            >
              {X}
            </span>
          </h1>
        </div>

        {/* ─── Main Content: Dashboard left, Text+Buttons right ─── */}
        <div className="flex flex-1 flex-col px-4 pb-10 pt-2 sm:px-6 lg:flex-row lg:items-end lg:gap-8 lg:px-10 sm:mt-0">

          {/* Dashboard image */}
          <div
            ref={dashboardRef}
            className="w-full flex-shrink-0 lg:w-[55%]"
            style={{ opacity: 0 }}
          >
            <img
              src="/img/teamster.png"
              alt="TeamsterX application dashboard"
              className="w-full"
            />
          </div>

          {/* Text + Buttons – right side */}
          <div className="mt-8 flex flex-col gap-4 lg:mb-6 lg:mt-0">
            <p
              ref={textRef}
              className="max-w-sm text-[1.35rem] leading-snug text-gray-800 sm:max-w-md sm:text-2xl lg:text-[1.4rem] xl:text-[1.6rem] xl:leading-snug"
              style={{ opacity: 0 }}
            >
              Bridge the gap between planning and
              doing with a shared workspace built for
              transparent communication and rapid
              iteration.
            </p>

            {/* CTA buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center gap-4"
              style={{ opacity: 0 }}
            >
              <a
                href="https://app.teamsterx.com/account"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-4 border-[#5AB5F5] bg-[#4AABF0] px-6 py-2 text-lg sm:px-8 sm:py-3 sm:text-xl font-bold text-white shadow-md transition hover:bg-[#3a9be0] focus:outline-none focus:ring-2 focus:ring-[#4AABF0]/50 focus:ring-offset-2 body-font"
              >
                Log in
              </a>
              <a
                href="https://app.teamsterx.com/account"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-4 border-[#5AB5F5] bg-white/25 px-6 py-2 text-lg sm:px-8 sm:py-3 sm:text-xl font-bold text-gray-700 backdrop-blur-sm transition hover:bg-white/45 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 body-font"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
