"use client";
import { useState } from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import useSBTApi from "../../hooks/userSBT";

export default function OwnershipChecker() {
  const { getSBTByOwner } = useSBTApi();
  const [owner, setOwner] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [ownership, setOwnership] = useState(null);
  const [error, setError] = useState("");
  const [formType, setFormType] = useState("owner"); // Default to the "owner" form

  const handleCheck = async () => {
    setError("");
    setOwnership(null);
    try {
      let response;
      if (formType === "owner") {
        response = await getSBTByOwner(owner);
      } else if (formType === "owner-token") {
        response = await getSBTByOwner(owner, tokenId); // Assuming API supports both parameters
      }

      if (response.result.success) {
        // Parse the metadata string into an object
        let parsedMetadata = {};
        try {
          parsedMetadata = JSON.parse(response.result.result.metadata);
        } catch (parseError) {
          setError("Failed to parse metadata.",parseError);
          return;
        }

        setOwnership({
          owner: response.result.result.owner,
          tokenID: response.result.result.tokenID,
          metadata: parsedMetadata,
          timestamp: response.timestamp,
        });
      } else {
        setError("No certificate found for this owner.");
      }
    } catch (err) {
      setError("An error occurred while checking ownership.",err);
    }
  };

  return (
    <div>
      <Navbar2 />
      <main className="flex gap-12 justify-center min-h-screen bg-gradient-to-br items-center pb-48 from-gray-50 to-indigo-50">
        <div className="w-full max-w-md bg-white py-4 px-6 rounded-xl shadow-lg">
          <form className="space-y-2">
            {/* Owner Address Input */}
            <div>
              <label className="block text-sm font-medium my-2 text-gray-700">
                Owner Wallet Address
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter owner's address"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>

            {/* Token ID Input (Only for owner-token form type) */}
            {formType === "owner-token" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Token ID
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter token ID"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                />
              </div>
            )}

            {/* Toggle between Owner Address and Owner + Token ID Form */}
            <div className="flex justify-between text-sm">
              <button
                type="button"
                onClick={() =>
                  setFormType(formType === "owner" ? "owner-token" : "owner")
                }
                className="text-blue-600 underline"
              >
                {formType === "owner"
                  ? "Use Owner Address & Token ID"
                  : "Use Owner Address Only"}
              </button>
              <button
                type="button"
                onClick={handleCheck}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                Verify
              </button>
            </div>
          </form>

          {/* Display Error Message */}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>

        {/* Ownership Details */}
        {ownership && (
          <div className="w-full max-w-3xl bg-white border-2 border-zinc-600 shadow-lg rounded-xl p-6 mt-8 relative">
            {/* Certificate Title */}
            <div className="text-center">
              <h1 className="font-bold text-2xl md:text-4xl text-black">
                Certificate
              </h1>
              <p className="text-lg md:text-xl text-black">of</p>
            </div>

            {/* Dynamic Title */}
            <div className="text-center mt-4">
              <h2 className="font-bold text-xl md:text-3xl text-black">
              {ownership.metadata.description || "No description provided."}
              </h2>
              <hr className="mt-2 w-3/4 md:w-2/3 mx-auto border-t-2 border-black" />
            </div>

            {/* Awarded By */}
            <div className="text-center mt-4">
              <p className="text-md md:text-lg text-black">from</p>
              <h3 className="font-bold text-lg md:text-2xl text-black mt-4">
                {ownership.metadata.organization || "College Name"}
              </h3>
              <hr className="mt-2 w-4/5 md:w-3/4 mx-auto border-t-2 border-black" />
            </div>

            {/* Awarded To */}
            <div className="text-center mt-4">
              <p className="text-md md:text-lg text-black">awarded to</p>
              <h3 className="font-bold text-lg md:text-2xl text-black mt-4">
                {ownership.metadata.name || "Recipient Name"}
              </h3>
              <hr className="mt-2 w-4/5 md:w-3/4 mx-auto border-t-2 border-black" />
            </div>
      
            {/* Date of Issue */}
            <div className="text-center mt-4">
              <p className="text-lg md:text-xl text-black">on</p>
              <p className="text-md md:text-lg text-black mt-2">
                {ownership.metadata.dateOfIssue || "Date of Issue"}
              </p>
              <hr className="mt-2 w-1/2 mx-auto border-t-2 border-black" />
            </div>

            {/* Unique Identifier */}
            <div className="mt-6">
              <div className="">
                <p className="text-xs md:text-sm text-black">
                  Token ID: {ownership.tokenID || "Unique Identifier"}
                </p>
              </div>

              {/* Owner Address */}
              <div className="">
                <p className="text-xs md:text-sm text-black">
                  Owner Wallet Address: {ownership.owner || "Owner Address"}
                </p>
              </div>
            </div>

            {/* Logo */}
            <div className="absolute bottom-6 right-6 md:right-8">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-20 md:h-20 md:w-32 object-contain"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
