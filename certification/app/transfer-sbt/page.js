"use client";
import { useState } from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import useSBTApi from "../../hooks/userSBT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TransferSBT() {
  const { attemptTransfer } = useSBTApi();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!from || !to || !tokenId) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await attemptTransfer(from, to, tokenId);
      console.log(response);

      if (response.status === "FAILURE") {
        // Check if result contains "soulbound tokens are not transferable"
        const resultMessage = response.result || "";
        
        if (resultMessage.includes("soulbound tokens are not transferable")) {
          toast.error("Soulbound tokens cannot be transferred.");
        } else {
          toast.error(`Error: ${resultMessage}`);
        }
      } else if (response.result?.success) {
        toast.success("Transfer successful!");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while transferring the SBT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar2 />
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Transfer Ownership of Soulbound Token</h2>

        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Address</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter sender's address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">To Address</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter recipient's address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Token ID</label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter token ID"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Transfer"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
