import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-blue-600 
                 rounded-md transition-all duration-200 hover:bg-blue-700 active:bg-blue-800 
                 w-fit"
    >
      <span className="text-xl">←</span>
      <span>Back</span>
    </button>
  );
}
