export default function Navbar() {
    return (
      <nav className="backdrop-blur-lg bg-white p-4 w-full flex items-center shadow-lg border border-gray-300 rounded-lg relative">
        {/* Centered Title */}
        <h1 className="text-gray-800 text-3xl font-bold absolute">
          <a href="/">
          Insightly
          </a>
        </h1>
  
        {/* Right Side Links */}
        <div className="ml-auto space-x-12">
          <a href="/companydashboard" className="text-gray-800 text-2xl hover:underline">
            Dashboard
          </a>
          <a href="/productmanagement" className="text-gray-800 text-2xl hover:underline">
            Product Management
          </a>
          <a href="/reviewmanagement" className="text-gray-800 text-2xl hover:underline">
            Review Management
          </a>
          <a href="#" className="text-gray-800 text-2xl hover:underline">
            Logout
          </a>
        </div>
      </nav>
    );
  }
  