import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cloud1 from '../../img/cloud1.png';
import cloud2 from '../../img/cloud2.png';
import cloud3 from '../../img/cloud3.png';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const headingRef   = useRef(null);
  const ctaRef       = useRef(null);
  const cloudsRef    = useRef(null);
  const dashboardRef = useRef(null);
  const revealSectionRef = useRef(null);
  const revealLeftCloudRef = useRef(null);
  const revealRightCloudRef = useRef(null);

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

    // 5) Reveal section – clouds part on scroll to reveal text
    const ctx = gsap.context(() => {
      gsap.set(revealLeftCloudRef.current, { xPercent: -15, yPercent: -55 });
      gsap.set(revealRightCloudRef.current, { xPercent: 15, yPercent: -55, scaleX: -1 });

      gsap.to(revealLeftCloudRef.current, {
        xPercent: -125,
        ease: 'none',
        scrollTrigger: {
          trigger: revealSectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        },
      });

      gsap.to(revealRightCloudRef.current, {
        xPercent: 125,
        ease: 'none',
        scrollTrigger: {
          trigger: revealSectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        },
      });
    }, revealSectionRef);

    return () => ctx.revert();
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

      {/* ─── Cloud Reveal Section ─── */}
      <section
        ref={revealSectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Centered headline behind clouds */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h2
            className="text-center font-bold leading-[1.1] max-w-5xl"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
            }}
          >
            <span className="text-gray-900">Tired of </span>
            <span style={{ color: '#4AABF0' }}>spending </span>
            <span style={{ color: '#4AABF0' }}>hours </span>
            <span className="text-gray-900">on asigning </span>
            <span className="text-gray-900">tasks? Just </span>
            <span style={{ color: '#4AABF0' }}>let AI do it.</span>
          </h2>
        </div>

        {/* Left cloud – covers left half of heading initially */}
        <img
          ref={revealLeftCloudRef}
          src={cloud3}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 left-0 w-[85%] max-w-none pointer-events-none select-none z-10"
        />

        {/* Right cloud – mirrored, covers right half of heading initially */}
        <img
          ref={revealRightCloudRef}
          src={cloud3}
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-[85%] max-w-none pointer-events-none select-none z-10"
        />
      </section>

      {/* ─── Features Section: Sticky Left + Scrollable Right ─── */}
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Sticky Left Headline */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex items-center">
            <h2
              className="font-bold leading-[1.05]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              }}
            >
              <span className="text-gray-900">Let </span>
              <span style={{ color: '#4AABF0' }}>Teamsterx</span>
              <br />
              <span className="text-gray-900">handle your</span>
            </h2>
          </div>

          {/* Scrollable Right Content */}
          <div className="flex flex-col gap-48 lg:gap-[55vh] py-24 lg:py-[30vh]">

            {/* Feature 1 – Calendar */}
            <div className="flex flex-col gap-6">
              <h3
                className="font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)' }}
              >
                Calendar
              </h3>
              <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed">
                Auto-scheduled meetings, deadlines, and milestones, all kept in sync across your team in one shared view.
              </p>
              <CalendarMock />
            </div>

            {/* Feature 2 – Assignment system */}
            <div className="flex flex-col gap-6">
              <AvatarStack />
              <h3
                className="font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)' }}
              >
                Assignment system
              </h3>
              <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed">
                Smart task delegation that matches the right work to the right person, based on skills, workload, and availability.
              </p>
            </div>

            {/* Feature 3 – Progress tracking */}
            <div className="flex flex-col gap-6">
              <h3
                className="font-bold text-gray-900"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)' }}
              >
                Progress tracking
              </h3>
              <p className="text-gray-600 text-base sm:text-lg max-w-md leading-relaxed">
                Live dashboards turn daily activity into clear insights, so you always know what's shipping and what's stuck.
              </p>
              <DonutChartMock />
            </div>

          </div>
        </div>
      </section>

      {/* ─── Integrations Hub Section ─── */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-12 flex flex-col items-center text-center">

          {/* Heading */}
          <h2
            className="font-bold leading-[1.05] mb-5 max-w-3xl"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            <span className="text-gray-900">One app for your </span>
            <span style={{ color: '#4AABF0' }}>entire company</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mb-16">
            Teamsterx connects every tool your team uses, so all your work lives in one place.
          </p>

          {/* Hub-and-spoke visual */}
          <IntegrationHub />

        </div>
      </section>

    </div>
  );
}

/* ────────── Mock Visual Components ────────── */

function CalendarMock() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const prevMonth = [27, 28, 29, 30];
  const current = Array.from({ length: 31 }, (_, i) => i + 1);
  const cells = [...prevMonth, ...current];
  const highlightDay = 8;
  const dotDay = 12;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <button className="text-gray-400 hover:text-gray-700 text-lg leading-none px-2" aria-label="Previous month">&lsaquo;</button>
        <span className="font-semibold text-gray-900 text-sm">May 2026</span>
        <button className="text-gray-400 hover:text-gray-700 text-lg leading-none px-2" aria-label="Next month">&rsaquo;</button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] text-gray-400 mb-1">
        {days.map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
        {cells.map((n, i) => {
          const isPrev = i < prevMonth.length;
          const isHighlight = !isPrev && n === highlightDay;
          const hasDot = !isPrev && n === dotDay;
          return (
            <div key={i} className="relative flex items-center justify-center h-7">
              {isHighlight ? (
                <span className="w-7 h-7 rounded-full bg-[#4AABF0] text-white font-semibold flex items-center justify-center">{n}</span>
              ) : (
                <span className={isPrev ? 'text-gray-300' : 'text-gray-700'}>{n}</span>
              )}
              {hasDot && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#4AABF0]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AvatarStack() {
  const avatars = [
    'linear-gradient(135deg,#fcd5b5,#f0a978)',
    'linear-gradient(135deg,#c9a07a,#7a4a2b)',
    'linear-gradient(135deg,#f6d59a,#d49a4d)',
  ];
  return (
    <div className="flex -space-x-3">
      {avatars.map((bg, i) => (
        <div
          key={i}
          className="w-14 h-14 rounded-full border-4 border-white shadow-md"
          style={{ background: bg }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function DonutChartMock() {
  const segments = [
    { color: '#ec4899', value: 25 },
    { color: '#8b5cf6', value: 25 },
    { color: '#a855f7', value: 25 },
    { color: '#3b82f6', value: 25 },
  ];
  const radius = 38;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-xs">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#4AABF0] text-xs">&#9650;</span>
        <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Number of Customers</span>
      </div>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
          {segments.map((s, i) => {
            const len = (s.value / 100) * circ;
            const dasharray = `${len} ${circ - len}`;
            const el = (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={s.color}
                strokeWidth="14"
                strokeDasharray={dasharray}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="rotate-90" style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontSize: '14px', fontWeight: 600, fill: '#374151' }}>4</text>
        </svg>
        <ul className="text-xs text-gray-600 space-y-1">
          {[
            { c: '#ec4899', label: 'Feb' },
            { c: '#8b5cf6', label: 'Mar' },
            { c: '#a855f7', label: 'Apr' },
            { c: '#3b82f6', label: 'May' },
          ].map((row) => (
            <li key={row.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: row.c }} />
              {row.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SlackLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54" aria-hidden="true">
      <g>
        <path fill="#36C5F0" d="M19.7 34a5.3 5.3 0 1 1-5.3-5.3h5.3V34z" />
        <path fill="#36C5F0" d="M22.4 34a5.3 5.3 0 0 1 10.6 0v13.3a5.3 5.3 0 1 1-10.6 0V34z" />
        <path fill="#2EB67D" d="M27.7 19.7a5.3 5.3 0 1 1 5.3-5.3v5.3h-5.3z" />
        <path fill="#2EB67D" d="M27.7 22.4a5.3 5.3 0 0 1 0 10.6H14.4a5.3 5.3 0 1 1 0-10.6h13.3z" />
        <path fill="#ECB22E" d="M42 27.7a5.3 5.3 0 1 1 5.3 5.3H42v-5.3z" />
        <path fill="#ECB22E" d="M39.3 27.7a5.3 5.3 0 0 1-10.6 0V14.4a5.3 5.3 0 1 1 10.6 0v13.3z" />
        <path fill="#E01E5A" d="M34 42a5.3 5.3 0 1 1-5.3 5.3V42H34z" />
        <path fill="#E01E5A" d="M34 39.3a5.3 5.3 0 0 1 0-10.6h13.3a5.3 5.3 0 1 1 0 10.6H34z" />
      </g>
    </svg>
  );
}

function IntegrationHub() {
  const integrations = [
    { name: 'Slack',            desc: 'Slash commands & channel sync',    logo: <SlackLogo size={28} /> },
    { name: 'GitHub',           desc: 'Issues → tasks automatically',     logo: <GitHubLogo size={28} /> },
    { name: 'Discord',          desc: 'Bot commands & notifications',     logo: <DiscordLogo size={28} /> },
    { name: 'Notion',           desc: 'Page events feed into your board', logo: <NotionLogo size={28} /> },
    { name: 'Google Calendar',  desc: 'Bookings become tasks instantly',  logo: <GoogleCalendarLogo size={28} /> },
    { name: 'Sentry',           desc: 'Errors triaged on your board',     logo: <SentryLogo size={28} /> },
    { name: 'Cal.com',          desc: 'Schedule → task in one click',     logo: <CalComLogo size={28} /> },
    { name: 'Tally',            desc: 'Form submissions auto-triaged',    logo: <TallyLogo size={28} /> },
  ];

  const count = integrations.length;
  const cx = 50, cy = 50, radius = 38;

  const nodes = integrations.map((it, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return { ...it, x, y };
  });

  const pulseDur = 3.6; // seconds per pulse travel

  return (
    <div className="relative w-full max-w-2xl aspect-square mx-auto">
      {/* SVG: ring, lines, animated light shots */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient: transparent tail → bright white head (aligned to ellipse long axis) */}
          <linearGradient id="shotGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#4AABF0" stopOpacity="0" />
            <stop offset="45%"  stopColor="#7dd4f8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#444" strokeWidth="0.25" strokeDasharray="1.2 1.8" />

        {/* Lines + animated light shots */}
        {nodes.map((n, i) => {
          const pathId = `lp-${i}`;
          const delay = `${(i * pulseDur / count).toFixed(2)}s`;
          return (
            <g key={i}>
              {/* Static connector line — thin dark grey */}
              <line
                x1={n.x} y1={n.y} x2={cx} y2={cy}
                stroke="#444" strokeWidth="0.25"
              />
              {/* Path for animateMotion */}
              <defs>
                <path id={pathId} d={`M ${n.x} ${n.y} L ${cx} ${cy}`} />
              </defs>
              {/* Light shot: elongated, gradient-filled, strong ease-in (slow → fast) */}
              <ellipse rx="5.5" ry="0.45" fill="url(#shotGrad)">
                <animateMotion
                  dur={`${pulseDur}s`}
                  begin={delay}
                  repeatCount="indefinite"
                  rotate="auto"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.92 0 1 1"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.04;0.88;1"
                  dur={`${pulseDur}s`}
                  begin={delay}
                  repeatCount="indefinite"
                />
              </ellipse>
            </g>
          );
        })}
      </svg>

      {/* Integration nodes */}
      {nodes.map((n) => (
        <div
          key={n.name}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {/* Default icon tile */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center
            transition-all duration-200
            group-hover:opacity-0 group-hover:scale-75 group-hover:pointer-events-none">
            {n.logo}
          </div>
          {/* Hover card */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-36 bg-white rounded-2xl shadow-xl px-3 py-3
            flex flex-col items-center gap-1.5
            opacity-0 scale-90 pointer-events-none
            transition-all duration-200
            group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
            z-20">
            <div className="flex-shrink-0">{n.logo}</div>
            <p className="font-semibold text-gray-900 text-xs text-center leading-tight">{n.name}</p>
            <p className="text-[10px] text-gray-500 text-center leading-tight">{n.desc}</p>
          </div>
        </div>
      ))}

      {/* Center: Teamsterx circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-2xl flex items-center justify-center">
        <img src="/img/logo-no-bg.png" alt="Teamsterx" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
      </div>
    </div>
  );
}

/* ────────── Brand Logos ────────── */

function GitHubLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#181717" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function DiscordLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#5865F2" aria-hidden="true">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18 18 0 0 1 4.3 1.4 17.9 17.9 0 0 0-15-.7c-.5.2-1 .4-1.4.6a18.4 18.4 0 0 0 4.3-1.3L7 3a19.8 19.8 0 0 0-4.9 1.4C-.4 9.7-1 14.9.3 20a20 20 0 0 0 6 3l.4-.6c-1-.3-1.9-.7-2.8-1.2l.5-.4a14.3 14.3 0 0 0 12.2 0l.5.4c-.9.5-1.8.9-2.8 1.2l.4.6a20 20 0 0 0 6-3c1.4-6-.5-11.2-2.9-15.6zM8.5 16.3c-1.2 0-2.1-1.1-2.1-2.4 0-1.3 1-2.4 2.1-2.4 1.2 0 2.1 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4zm7 0c-1.2 0-2.1-1.1-2.1-2.4 0-1.3 1-2.4 2.1-2.4 1.2 0 2.1 1.1 2.1 2.4 0 1.3-.9 2.4-2.1 2.4z" />
    </svg>
  );
}

function NotionLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#000" d="M4.5 3.6 14.8 2.9c1.3-.1 1.6 0 2.4.6l3.3 2.3c.5.4.7.5.7 1v13.1c0 .9-.3 1.4-1.5 1.5l-12 .7c-.8.1-1.2-.1-1.6-.6l-2.4-3.1c-.4-.6-.6-1-.6-1.6V5.1c0-.8.3-1.4 1.9-1.5z" />
      <path fill="#fff" d="M14.8 4.6 5 5.3c-.5 0-.6.3-.4.5l1.7 1.2c.3.2.5.2 1 .2l9.2-.6c.2 0 .4-.1.2-.3l-2-1.4c-.2-.2-.5-.3-.9-.3zM6 18.3V8.7c0-.4.1-.6.5-.6l9.6-.6c.4 0 .5.2.5.5v9.5c0 .4-.1.7-.6.7l-9.2.5c-.5 0-.8-.1-.8-.4z" />
      <path fill="#000" d="M14.4 9.2c0 .2 0 .4-.3.4l-.4.1v6.5l-.6.2c-.4 0-.6 0-.8-.3l-2.7-4.2v4l.9.2s0 .4-.5.4l-1.5.1c0-.2 0-.3.3-.4l.3-.1v-5.8l-.5-.1c0-.2.1-.5.5-.5l1.6-.1 2.8 4.3v-3.8l-.7-.1c0-.3.2-.4.6-.4z" />
    </svg>
  );
}

function GoogleCalendarLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5" />
      <path fill="#4285F4" d="M4 6a2 2 0 0 1 2-2h2v4H4z" />
      <path fill="#EA4335" d="M16 4h2a2 2 0 0 1 2 2v2h-4z" />
      <path fill="#34A853" d="M16 20h2a2 2 0 0 0 2-2v-2h-4z" />
      <path fill="#FBBC04" d="M8 20H6a2 2 0 0 1-2-2v-2h4z" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4285F4" fontFamily="Arial">31</text>
    </svg>
  );
}

function SentryLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#362D59" aria-hidden="true">
      <path d="M13.3 4.3c-.6-1-2-1-2.6 0L7.8 9.5l1.3.8 2.9-5c.1-.2.3-.2.4 0l8.2 14.2c.1.2 0 .4-.2.4h-2.9c0-.5 0-1-.1-1.5h1.2L12 7.9l-2.4 4.2.4.3c1.4.9 2.3 2.4 2.5 4h-2c-.2-.9-.7-1.7-1.5-2.2l-.4-.3-1.6 2.8 1.3.7.9-1.5c.4.4.7.9.7 1.5v.5h3.7v-.5a6 6 0 0 0-2.6-5l1.4-2.5 4.6 7.9h-2.5c0 .5.1 1 .1 1.5H21c.9 0 1.5-1 1-1.8L13.3 4.3z" />
    </svg>
  );
}

function CalComLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="6" width="20" height="14" rx="3" fill="#111827" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff" fontFamily="Arial">Cal</text>
    </svg>
  );
}

function TallyLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#111827" />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <line x1="8" y1="8" x2="8" y2="16" />
        <line x1="11" y1="8" x2="11" y2="16" />
        <line x1="14" y1="8" x2="14" y2="16" />
        <line x1="7" y1="15" x2="16" y2="10" />
      </g>
    </svg>
  );
}

