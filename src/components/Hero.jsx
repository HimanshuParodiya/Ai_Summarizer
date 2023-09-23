import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="Summarizer_Logo" className="w-28 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://himanshu-me.netlify.app/")}
          className="black_btn"
        >
          About Me
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />{" "}
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Unlock the Power of Efficient Reading with Summarizer: Your Go-To Tool
        for Effortlessly Condensing Long Articles into Clear and Precise
        Summaries, Simply input any URL, and read.
      </h2>
    </header>
  );
};

export default Hero;
