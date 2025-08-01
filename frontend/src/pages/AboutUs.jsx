import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 ">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          <ReactMarkdown># Welcome to Insightly 🛍️✨</ReactMarkdown>
        </h1>

        {/* Mission */}
        <div className="text-lg text-gray-700">
          <ReactMarkdown>## 🎯 Our Mission</ReactMarkdown>
          <ReactMarkdown>
            Our mission is to build a **trusted** platform where users share their experiences,  
            while **AI-powered verification** ensures reliability.
          </ReactMarkdown>
        </div>

        {/* Vision */}
        <div className="text-lg text-gray-700">
          <ReactMarkdown>## 🚀 Our Vision</ReactMarkdown>
          <ul className="list-disc pl-6">
            <li><ReactMarkdown>Helping consumers make **informed decisions**</ReactMarkdown></li>
            <li><ReactMarkdown>Providing **companies with insights** for better products</ReactMarkdown></li>
            <li><ReactMarkdown>Rewarding users for **authentic feedback**</ReactMarkdown></li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="text-lg text-gray-700">
          <ReactMarkdown>## 🔍 How It Works</ReactMarkdown>
          <ol className="list-decimal pl-6">
            <li><ReactMarkdown>**Submit** a product review</ReactMarkdown></li>
            <li><ReactMarkdown>AI **verifies** authenticity (serial number + sentiment analysis)</ReactMarkdown></li>
            <li><ReactMarkdown>**Earn rewards** for contributing</ReactMarkdown></li>
            <li><ReactMarkdown>Companies **enhance their products** with real insights</ReactMarkdown></li>
          </ol>
        </div>

        {/* Team */}
        <div className="text-lg text-gray-700">
          <ReactMarkdown>## 👨‍💻 Meet the Team</ReactMarkdown>
          <ul className="list-disc pl-6">
            <li><ReactMarkdown>- **Aditya** </ReactMarkdown></li>
            <li><ReactMarkdown>- **Daniel** </ReactMarkdown></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-lg text-gray-700">
          <ReactMarkdown>## 📩 Contact Us</ReactMarkdown>
          <ReactMarkdown>
            Have questions? Reach out at [support@insightly.com](mailto:support@insightly.com)
          </ReactMarkdown>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate("/")} 
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
