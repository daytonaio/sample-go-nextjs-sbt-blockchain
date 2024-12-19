
# Certify: Certification System using Soulbound Tokens (SBT) on Kalp Blockchain

This repository contains a sample project for building a **Certification System** using **Soulbound Tokens (SBTs)** on the **Kalp Blockchain**. The project involves creating a smart contract in **Go** and a frontend built with **Next.js** to issue and verify digital certificates. The certificates are tied to the recipient’s wallet address and cannot be transferred.

---

## 🚀 Getting Started  

### Open Using Daytona  

1. **Install Daytona**: Follow the [Daytona installation guide](https://www.daytona.io/docs/installation/installation/).  
2. **Create the Workspace**:  
   ```bash  
   daytona create https://github.com/daytonaio/sample-go-nextjs-sbt-blockchain
   ```  

3. **Build the Project**:  
   Navigate to your project directory and install the dependencies for both the smart contract and frontend:
   ```bash
   cd sbtkalp && go mod tidy
   cd certification && npm install
   ```

4. **Set Up Environment Variables**:
   Ensure that you have a `.env.local` file in the frontend directory with your API key and other necessary variables:
   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_API_KEY=your-kalp-api-key
   CONTRACT_ID=vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325
   ```

5. **Start the Application**:  
   To run the frontend, use the following command:
   ```bash
   cd certification && npm run dev
   ```
   This will start a development server and open the application in your browser.

---

## ✨ Features  

- **Non-transferable Soulbound Tokens (SBTs)**: Issue and verify digital certificates that are permanently tied to a recipient’s wallet address.
- **Certification Verification**: Users can query certificates using their wallet address and token ID.
- **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS for a responsive, user-friendly interface.
- **Real-time Blockchain Interaction**: Integrate with the Kalp blockchain for certificate issuance and verification.
- **API Integration**: Seamless interaction with the Kalp blockchain through RESTful API endpoints.

---

## 🛠️ Tech Stack  

- **Smart Contract:** Go + Kalp SDK
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Blockchain:** Kalp Network
- **API:** RESTful endpoints via Kalp Studio

---

## 🔑 API Configuration

Make sure to replace the placeholder values in the following configuration:

1. Contract ID: `vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325`
2. API Key: Your generated API key
3. Default Wallet: `ded665bca7d412891f44a571d908b66184b0ee10`

---

## 🎯 Hackathon Features

The goal of this project is to build a certification system that:

1. **Certify Ownership and Status**: Use the SBT to certify ownership of academic or professional credentials.
2. **Query Certificates**: Retrieve certificates by querying the blockchain using the wallet address and token ID.
3. **Prevent Transfer**: Display restrictions when someone tries to transfer a certificate, explaining the Soulbound nature of the tokens.

---

## 📝 Example Code Snippets

### Minting a New SBT
To mint a new Soulbound Token for a recipient address, use the following code:
```typescript
const mintSBT = async (recipientAddress: string) => {
  try {
    await fetch('https://gateway-api.kalp.studio/v1/contract/kalp/invoke/vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325/MintSBT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        network: "TESTNET",
        blockchain: "KALP",
        walletAddress: "ded665bca7d412891f44a571d908b66184b0ee10",
        args: {
          address: recipientAddress
        }
      })
    });
  } catch (error) {
    console.error('Error minting SBT:', error);
  }
};
```

### Querying an SBT
To query an SBT by the owner’s address and token ID:
```typescript
const querySBT = async (owner: string, tokenId: string) => {
  try {
    const response = await fetch(`https://gateway-api.kalp.studio/v1/contract/kalp/query/vHYQcRijQGB3UpVhqc3UeBM2D3ztjPuS1732534432325/QuerySBT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
      body: JSON.stringify({
        network: "TESTNET",
        blockchain: "KALP",
        walletAddress: "ded665bca7d412891f44a571d908b66184b0ee10",
        args: {
          owner,
          tokenID: tokenId
        }
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error querying SBT:', error);
  }
};
```

---

## 🔒 Security

- **API Keys**: Store your API keys securely in environment variables.
- **Non-transferable Tokens**: The Soulbound Tokens are non-transferable, ensuring authenticity and security.
- **Authorization Checks**: Ensure proper access control in the smart contract to maintain security.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
