import { NavLink } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <nav className="backdrop-blur-lg bg-white/30 p-4 w-full flex items-center shadow-xl border border-white/40 rounded-xl relative transition-all duration-300">
      {/* Leftmost Logo */}
      <h1 className="text-gray-900 text-4xl font-extrabold tracking-wide drop-shadow-lg font-[Poppins]">
        Insightly
      </h1>

      {/* Right Side Links */}

        <div className="ml-auto space-x-8 flex items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-xl font-medium transition duration-300 relative after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                isActive
                  ? 'text-blue-600 after:w-full'
                  : 'text-gray-900 hover:text-blue-600 hover:after:w-full after:w-0'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-xl font-medium transition duration-300 relative after:content-[''] after:block after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 ${
                isActive
                  ? 'text-blue-600 after:w-full'
                  : 'text-gray-900 hover:text-blue-600 hover:after:w-full after:w-0'
              }`
            }
          >
            About
          </NavLink>
        </div>

    </nav>
  );
}
