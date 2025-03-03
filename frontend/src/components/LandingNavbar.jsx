export default function LandingNavbar() {

    return (
        <nav className="backdrop-blur-lg bg-white p-4 w-full flex justify-between items-center shadow-lg border border-gray-300 rounded-lg">
        <h1 className="text-gray-800 text-3xl font-bold">Insightly</h1>
        <div className="space-x-15">
          <a href="#" className="text-gray-800 text-2xl hover:underline">
            Home
          </a>
          <a href="#" className="text-gray-800 text-2xl hover:underline">
            About
          </a>
        </div>
      </nav>
    )
}