// pages/index.js
import Navbar from "../components/Navbar/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <main id="home" className="container mx-auto p-4 text-center">
        <div className="flex flex-wrap flex-col mt-4 px-6 mx-6 text-center">
          <h1 className="text-5xl font-bold">
            <span className="text-shadow-gray">Certify, Verify and </span>
            <br />
            <span className="text-border-black text-shadow-black text-gray-50">
              Authenticate
            </span>{" "}
            <span className="text-shadow-gray">with ease</span>
          </h1>
          <p className="mt-4 text-md text-gray-700 py-2">
            Protect your credentials with the security of blockchain technology
            <br />
            which uses soul bound token (SBT) Certify.
          </p>
          <div className="w-full flex justify-center items-center">
            <img
              className="hidden md:block"
              src="/Certification.svg"
              alt="certificate"
              style={{ height: 450, width: 450 }}
            />
          </div>
        </div>
      </main>
      <section id="how-it-works">
        <div className="flex flex-col justify-center items-center w-full bg-black text-white py-4 border-b-2 border-t-2 border-dashed border-white">
          <h1 className="text-4xl font-mono mt-4">How it works?</h1>
          <p className="text-lg font-mono mt-10 mx-2 px-10">
            Certify is a blockchain-based application for issuing and verifying
            certificates using the innovative concept of Soulbound Tokens
            (SBTs). SBTs are non-transferable digital tokens designed to
            represent unique, verifiable achievements, credentials, or
            affiliations tied to an individual s blockchain identity. This
            ensures authenticity, eliminates forgery, and safeguards certificate
            integrity.
            <br />
            Organizations can issue Soulbound Tokens to represent credentials or
            certifications, while users can verify their authenticity directly
            on the blockchain. Certificates issued via Certify are immutable,
            tamper-proof, and uniquely tied to the recipient.
            <br />
            <br />
            Certify is built on the Kalp Studio Test Blockchain, a robust and
            scalable blockchain network designed for secure and efficient
            certificate issuance and verification. With Kalp Studio, Certify
            ensures fast transactions, low operational costs, and seamless
            integration of blockchain-based solutions.
            <br />
            <br />
            Certificates issued through Certify come with a unique Token ID
            stored on the blockchain, providing an unalterable record of the
            certificate. This Token ID can be used for seamless verification,
            ensuring the validity of the credential.
            <br />
            Certificates can also be downloaded and/or sent directly to the
            recipient s email for added convenience.
            <br />
            <br />
          </p>
        </div>
      </section>
      <footer id="about" className="flex flex-row justify-between items-center bg-gray-100 py-8 px-10">
        <div className="flex flex-col">
          <p className="text-gray-700 text-lg leading-relaxed">
            This project was developed using <strong>Kalp Studio</strong>, a
            robust platform for creating blockchain-based applications
            seamlessly.
          </p>
        </div>
        <div>
          <img src="/KalpStudio.svg" className="w-44" alt="Kalp Studio Logo" />
        </div>
      </footer>
    </div>
  );
}
