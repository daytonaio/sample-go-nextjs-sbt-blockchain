import React from "react";
import Container from "../components/Container/Container";
import Navbar from "../components/Navbar/Navbar2";

function GetStarted() {
  const verifyOptions = [
    "Verify the certificate authenticity",
    "Look up the certificate details",
  ];
  const certifyOptions = ["Issue a Certificate", "Preview the certificate"];

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10">
        <Container
          title={"Verify Certificate"}
          description={
            "Enter to verify the authenticity and validity of the certificate"
          }
          svgr="/CertificateLogo.svg"
          content={verifyOptions}
          path="/ownership-check"
        />
        <Container
          title={"Issue Certificate"}
          description={"Enter to issue a certificate to a candidate"}
          svgr="/GraduateCap.svg"
          content={certifyOptions}
          path="/mint-sbt"
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-around mt-6">
        <div className="w-full max-w-xs text-center">
          <h3 className="font-bold text-lg text-black mb-2">APIs used in Verify Certificate:</h3>
          <p className="text-sm text-gray-600">querySBT, getSBTByOwner</p>
        </div>
        <div className="w-full max-w-xs text-center mt-4 lg:mt-0">
          <h3 className="font-bold text-lg text-black mb-2">APIs used in Issue Certificate:</h3>
          <p className="text-sm text-gray-600">mintSBT</p>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
