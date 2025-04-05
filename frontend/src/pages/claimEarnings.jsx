import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClaimEarnings() {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [details, setDetails] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/myearnings");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Claim Earnings</h1>
        {isSuccess ? (
          <div className="text-center text-green-600 text-xl">
            ✅ Payment successful! Amount will be credited soon.
          </div>
        ) : isProcessing ? (
          <div className="text-center text-blue-600 text-xl">Processing Payment...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Payment Method</label>
              <select
                className="w-full p-2 border rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {paymentMethod === "UPI" ? "UPI ID" : paymentMethod === "Bank Transfer" ? "Bank Account Details" : "PayPal Email"}
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            >
              Claim Earnings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
