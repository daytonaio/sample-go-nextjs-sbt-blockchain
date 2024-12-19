// Example API hook structure
const useSBTApi = () => {
  const baseURL = "https://gateway-api.kalp.studio/v1/contract/kalp";
  const fixedWallet = "4a52d4fcba8de350ab1bf869b163d7e9fd07c541";
  const initialize = async (description: string) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/Initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              description,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error initializing contract:", error);
    }
  };

  const mintSBT = async (
    recipientAddress: string,
    user_name: string,
    organization: string,
    date_of_issue: string
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/invoke/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/MintSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              address: recipientAddress,
              name: user_name,
              organization: organization,
              dateOfIssue: date_of_issue,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error minting SBT:", error);
    }
  };

  const querySBT = async (owner: string, tokenId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/QuerySBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              owner,
              tokenID: tokenId,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error querying SBT:", error);
    }
  };

  const getSBTByOwner = async (owner: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/GetSBTByOwner`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              owner,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting SBT by owner:", error);
    }
  };

  const getAllTokenIDs = async () => {
    try {
      const response = await fetch(
        `${baseURL}/query/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/GetAllTokenIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error getting all token IDs:", error);
    }
  };

  const attemptTransfer = async (from: string, to: string, tokenId: string) => {
    try {
      const response = await fetch(
        `${baseURL}/query/GHLDxsJqFi0w0OHPSehidrgd6ZTXFdV11732685112304/TransferSBT`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
          },
          body: JSON.stringify({
            network: "TESTNET",
            blockchain: "KALP",
            walletAddress: fixedWallet,
            args: {
              from,
              to,
              tokenID: tokenId,
            },
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error(
        "Error attempting to transfer SBT (non-transferable):",
        error
      );
    }
  };

  return {
    initialize,
    mintSBT,
    querySBT,
    getSBTByOwner,
    getAllTokenIDs,
    attemptTransfer,
  };
};

export default useSBTApi;
