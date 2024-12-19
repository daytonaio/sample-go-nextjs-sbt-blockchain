"use client";
import { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar/Navbar2";
import useSBTApi from "../../hooks/userSBT";

export default function AllSBTs() {
  const { getAllTokenIDs } = useSBTApi();
  const [tokenIDs, setTokenIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTokenIDs = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllTokenIDs();
        console.log(response);
        if (response.result.success) {
          setTokenIDs(response.result.result);
        } else {
          setError("Failed to fetch SBT IDs.");
        }
      } catch (err) {
        setError("An error occurred while fetching SBT IDs.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenIDs();
  }, []);

  return (
    <div>
      <Navbar2 />
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          All Soulbound Tokens Issued By University
        </h2>
        {loading ? (
          <p className="text-blue-600">Loading SBT IDs...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : tokenIDs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenIDs.map((id) => (
              <div
                key={id}
                className="p-4 border rounded shadow hover:bg-gray-50"
              >
                <p className="text-sm text-gray-600">Token ID:</p>
                <p className="font-mono text-lg text-blue-600 break-all">
                  {id}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tokens found.</p>
        )}
      </main>
    </div>
  );
}
