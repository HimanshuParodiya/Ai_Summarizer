import React, { useState } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  // api request
  const handleSubmit = async (e) => {
    console.log("submit");
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search  */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" // peer is used when i am clicking on input then this button will focused
          >
            ↩
          </button>
        </form>
        {/* Display history  */}
      </div>

      {/* Display Result  */}
    </section>
  );
};

export default Demo;
