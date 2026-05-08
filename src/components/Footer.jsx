export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-10 pb-0 body-font">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 pb-8">

          {/* Left – Brand */}
          <div className="flex flex-col gap-3">
            <a href="/" className="inline-block">
              <span className="text-gray-800 font-bold text-xl">TeamsterX</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Bridge the gap between planning and doing with a shared workspace built for transparent communication.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Made with{' '}
              <span className="text-red-400" aria-label="love">♥</span>{' '}
              by{' '}
              <a
                href="https://rootlabs.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4AABF0] hover:underline"
              >
                Root Labs
              </a>
            </p>
          </div>

          {/* Middle – Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-800">Contact</h3>
            <a
              href="mailto:rootlabs0@gmail.com"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4AABF0] transition-colors"
            >
              {/* Envelope icon */}
              <svg className="h-4 w-4 shrink-0 text-[#4AABF0]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              rootlabs0@gmail.com
            </a>
            <a
              href="tel:+420773003665"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#4AABF0] transition-colors"
            >
              {/* Phone icon */}
              <svg className="h-4 w-4 shrink-0 text-[#4AABF0]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1L6.6 10.8z" />
              </svg>
              +420 773 003 665
            </a>
          </div>

          {/* Right – Follow Us */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-800">Follow Us</h3>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/teamsterx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-300 text-gray-500 hover:border-[#4AABF0] hover:text-[#4AABF0] transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Bottom bar */}
        <p className="py-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TeamsterX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
