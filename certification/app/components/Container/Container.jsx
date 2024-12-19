import Link from "next/link";
import React from "react";

function Container(props) {
  const { title, description, svgr, content, path } = props;
  return (
    <>
      <div className="flex flex-col items-center text-center font-mono my-4 pb-5 mx-auto w-1/3 h-auto max-w-lg border-solid border-2 border-b-4 border-black rounded-2xl shadow-xl transition ease-in-out duration-200 hover:scale-105">
        <img
          className="mt-4 mb-2 h-12 w-12" // replaced inline style with Tailwind classes
          src={svgr}
          alt="Icon"
        />
        <h1 className="block text-2xl my-2 mx-3">{title}</h1>
        <p className="text-sm font-bold mb-4 mx-3">{description}</p>
        <hr className="block w-2/3 border-solid border border-black justify-center" />
        <div className="text-sm font-bold mt-5">
          Once logged in, users can:
          <br />
          <br />
          <ul className="list-inside list-disc text-justify px-2">
            {content.map((point, index) => (
              <li key={index} className="mb-2">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-2 py-2 px-4 text-lg lg:text-xl bg-slate-50 rounded-full border-b-2 border border-black
      hover:border-b-4 transition ease-in-out duration-200 hover:scale-105"
        >
          <Link href={path}>Enter</Link>
        </button>
      </div>
    </>
  );
}

export default Container;
