export default function Navbar() {
  return (
    <nav className="backdrop-blur-lg bg-white/30 p-4 w-full flex items-center shadow-xl border border-white/40 rounded-xl transition-all duration-300">
      {/* Left-Aligned Logo */}
      <h1 className="text-gray-900 text-4xl font-extrabold tracking-wide drop-shadow-lg font-[Poppins]">
        <a href="/" className="hover:text-blue-600 transition duration-300">
          Insightly
        </a>
      </h1>

      {/* Right Side Links */}
      <div className="ml-auto space-x-8 flex items-center">
        <a
          href="/admin"
          className="text-gray-900 text-xl font-medium hover:text-blue-600 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Dashboard
        </a>
        <a
          href="/managereviews"
          className="text-gray-900 text-xl font-medium hover:text-blue-600 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Manage Reviews
        </a>
        <a
          href="/"
          className="text-red-600 text-xl font-medium hover:text-red-800 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
