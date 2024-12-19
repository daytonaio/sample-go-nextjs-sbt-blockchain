import React, { forwardRef } from "react";

const Certificate = forwardRef((props, ref) => {
  const { title, name, date, hash, college } = props;

  return (
    <div
      ref={ref}
      className="mx-auto my-4 w-full max-w-3xl h-[80vh] bg-white border-2 border-zinc-600 shadow-lg rounded-xl p-6 md:p-12 relative"
    >
      {/* Certificate Title */}
      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-4xl text-black">
          Certificate
        </h1>
        <p className="text-lg md:text-xl text-black">of</p>
      </div>

      {/* Dynamic Title */}
      <div className="text-center mt-6">
        <h2 className="font-bold text-xl md:text-3xl text-black">
          {title || "Award"}
        </h2>
        <hr className="mt-2 w-3/4 md:w-2/3 mx-auto border-t-2 border-black" />
      </div>

      {/* Awarded To */}
      <div className="text-center mt-4">
        <p className="text-md md:text-lg text-black">from</p>
        <h3 className="font-bold text-lg md:text-2xl text-black mt-4">
          {college || "College Name"}
        </h3>
        <hr className="mt-2 w-4/5 md:w-3/4 mx-auto border-t-2 border-black" />
      </div>
      <div className="text-center mt-4">
        <p className="text-md md:text-lg text-black">awarded to</p>
        <h3 className="font-bold text-lg md:text-2xl text-black mt-4">
          {name || "Recipient Name"}
        </h3>
        <hr className="mt-2 w-4/5 md:w-3/4 mx-auto border-t-2 border-black" />
      </div>

      {/* On Date */}
      <div className="text-center mt-4">
        <p className="text-lg md:text-xl text-black">on</p>
        <p className="text-md md:text-lg text-black mt-2">{date || "Date"}</p>
        <hr className="mt-2 w-1/2 mx-auto border-t-2 border-black" />
      </div>

      {/* Unique Identifier */}
      <div className="absolute bottom-6 left-6 md:left-8">
        <p className="text-xs md:text-sm text-black">
          ID: {hash || "Unique Identifier"}
        </p>
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
  );
});

// Add a displayName to the component
Certificate.displayName = "Certificate";

export default Certificate;
