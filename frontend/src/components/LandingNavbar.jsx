export default function LandingNavbar() {
  return (
    <nav className="backdrop-blur-lg bg-white/30 p-4 w-full flex items-center shadow-xl border border-white/40 rounded-xl relative transition-all duration-300">
      {/* Leftmost Logo */}
      <h1 className="text-gray-900 text-4xl font-extrabold tracking-wide drop-shadow-lg font-[Poppins]">
        Insightly
      </h1>

      {/* Right Side Links */}
      <div className="ml-auto space-x-8 flex items-center">
        <a
          href="/"
          className="text-gray-900 text-xl font-medium hover:text-blue-600 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-gray-900 text-xl font-medium hover:text-blue-600 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          About
        </a>
      </div>
    </nav>
  );
}
