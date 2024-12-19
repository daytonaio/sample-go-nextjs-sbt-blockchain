"use client";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import useSBTApi from "../../hooks/userSBT";

export default function QueryCertificate() {
  const { querySBT } = useSBTApi();
  const [owner, setOwner] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    setError("");
    setCertificate(null);
    try {
      const response = await querySBT(owner, tokenId);
      if (response.result.success) {
        setCertificate(response.result.result);
      } else {
        setError("Certificate not found or invalid details.");
      }
    } catch (err) {
      setError("An error occurred while querying the certificate.",err);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold">Query Certificate</h2>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Owner Address"
            className="w-full p-2 border rounded"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token ID"
            className="w-full p-2 border rounded"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <button
            onClick={handleQuery}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Query Certificate
          </button>
        </div>
        {certificate && (
          <div className="mt-6 bg-green-100 p-4 rounded">
            <h3 className="font-bold">Certificate Details:</h3>
            <p>
              <strong>Owner:</strong> {certificate.owner}
            </p>
            <p>
              <strong>Token ID:</strong> {certificate.tokenID}
            </p>
            <p>
              <strong>Metadata:</strong> {certificate.metadata}
            </p>
          </div>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </main>
    </div>
  );
}
