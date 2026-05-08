import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4 sm:px-6 sm:py-6">
      {/* Pill-shaped container */}
      <div
        ref={menuRef}
        className="mx-auto max-w-4xl bg-white/50 backdrop-blur-xl rounded-full shadow-lg border border-white/30"
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/img/logo-no-bg.png"
              alt="TeamsterX"
              className="h-8 w-8"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-gray-800 font-medium hover:text-blue-600 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Login Button + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Login Button (visible on all sizes) */}
            <a
              href="https://app.teamsterx.com/account"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-[#4AABF0] text-white font-medium rounded-full hover:bg-[#3a9be0] transition-colors text-sm group"
            >
              Log In
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/10">
            <div className="px-5 py-3 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-gray-800 font-medium hover:text-blue-600 hover:bg-white/10 rounded-lg transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile Login Button */}
              <a
                href="https://app.teamsterx.com/account"
                className="flex items-center justify-center gap-2 w-full px-5 py-2 bg-[#4AABF0] text-white font-medium rounded-full hover:bg-[#3a9be0] transition-colors text-center sm:hidden text-sm group"
                onClick={() => setIsOpen(false)}
              >
                Log In
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
