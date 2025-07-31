import { ReactTyped } from "react-typed";
import LandingNavbar from "../components/LandingNavbar";
import { FaCheckCircle, FaUsers, FaDollarSign, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <LandingNavbar />

      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-50"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <ReactTyped
              strings={[
                "Earn Money for Reviews",
                "Get Paid Instantly",
                "Honest Reviews, Instant Rewards",
              ]}
              typeSpeed={50}
              backSpeed={25}
              loop
              showCursor={true}
              cursorChar="|"
              className="text-white"
            />
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            Earn $1-$1.5 for every verified review while helping brands improve their products.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <motion.a
              href="/companysignup"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join as a Company
            </motion.a>
            <motion.a
              href="/usersignup"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up as a User
            </motion.a>
          </div>
        </motion.div>

       
      </div>

      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-400 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl" />
      </motion.div>
    </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCheckCircle className="text-green-500 text-5xl mb-4" />,
                title: "Verified Reviews",
                desc: "Every review undergoes strict verification for authenticity.",
              },
              {
                icon: <FaUsers className="text-blue-500 text-5xl mb-4" />,
                title: "Trusted Community",
                desc: "Join thousands of users earning from honest feedback.",
              },
              {
                icon: <FaDollarSign className="text-yellow-500 text-5xl mb-4" />,
                title: "Instant Payouts",
                desc: "Receive your earnings immediately after verification.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {item.icon}
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "This platform helped me earn extra cash just by sharing my opinions!",
                name: "Alex R.",
                image: "/pic2.jpg", // ✅ relative to public folder
              },
              {
                text: "A trustworthy and reliable platform for genuine feedback.",
                name: "Priya M.",
                image: "/pic1.jpg", // ✅ relative to public folder
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-full mb-6 object-cover"
                />
                <FaStar className="text-yellow-400 text-3xl mb-4" />
                <p className="text-lg italic mb-6">"{item.text}"</p>
                <h4 className="text-xl font-semibold">- {item.name}</h4>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Earning Today!</h2>
          <p className="text-xl mb-8">
            Sign up now and turn your reviews into real rewards.
          </p>
          <a
            href="/usersignup"
            className="bg-white text-purple-600 px-10 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white text-center">
        <p className="text-lg">© 2025 Review Rewards. All rights reserved.</p>
        <div className="flex justify-center space-x-8 mt-6 text-lg">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;