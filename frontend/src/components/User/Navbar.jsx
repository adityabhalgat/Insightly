import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth/session here if needed
    navigate('/');
  };

  const linkBase =
    'text-xl font-medium transition duration-300 relative after:content-[\'\'] after:block after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300';

  return (
    <nav className="backdrop-blur-lg bg-white p-4 w-full flex items-center shadow-xl border border-white/40 rounded-xl transition-all duration-300">
      {/* Left-Aligned Logo */}
      <h1 className="text-gray-900 text-4xl font-extrabold tracking-wide drop-shadow-lg font-[Poppins]">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `hover:text-blue-600 transition duration-300 ${
              isActive ? 'text-blue-600' : ''
            }`
          }
        >
          Insightly
        </NavLink>
      </h1>

      {/* Right Side Links */}
      <div className="ml-auto space-x-12 flex items-center">
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'text-blue-600 after:w-full'
                : 'text-gray-900 hover:text-blue-600 hover:after:w-full after:w-0'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/myearnings"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'text-blue-600 after:w-full'
                : 'text-gray-900 hover:text-blue-600 hover:after:w-full after:w-0'
            }`
          }
        >
          My earnings
        </NavLink>

        <NavLink
          to="/myreviews"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'text-blue-600 after:w-full'
                : 'text-gray-900 hover:text-blue-600 hover:after:w-full after:w-0'
            }`
          }
        >
          My reviews
        </NavLink>

        <button
          onClick={handleLogout}
          className="text-red-600 text-xl font-medium hover:text-red-800 transition duration-300 relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
