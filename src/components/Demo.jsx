import React, { useEffect, useRef, useState } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../feature/Slice/article";
import LoadingBar from "react-top-loading-bar";
import { BsFillTrash3Fill } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [showDelete, setShowDelete] = useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [progress, setProgress] = useState(10);
  const [pauseSpeech, setPauseSpeech] = useState(false);
  // console.log(copied);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const articleSummary = useRef(null);
  let speech = new SpeechSynthesisUtterance();
  // let textValue = document.querySelector(".summary_box p");

  useEffect(() => {
    window.speechSynthesis.cancel(speech);
  }, []);

  // const handleVoiceChange = () => {
  //   speech.voice = voices[moreVoice.current.value];
  // };

  const handleSpeaker = () => {
    speech.text = articleSummary.current.textContent;

    window.speechSynthesis.speak(speech);
    setPauseSpeech(!pauseSpeech);
    window.speechSynthesis.speak(speech);
    if (pauseSpeech) {
      window.speechSynthesis.cancel(speech);
    }

    if (speech) {
      window.speechSynthesis.resume();
    }
  };

  // const multipleLanguages = useRef(null);

  // api request

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    setProgress(30);
    e.preventDefault();
    // console.log("submit");
    const { data } = await getSummary({ articleUrl: article.url });
    setProgress(60);
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setProgress(100);
      setArticle(newArticle);
      const updatedAllArticle = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticle);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticle));
      // console.log(newArticle);

      // console.log(newArticle);
    }
  };
  const handleCopy = (e, copyUrl) => {
    e.stopPropagation();
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    let sure = confirm("You want to delete it");
    // console.log(sure);
    if (sure) {
      let newAllArticles = allArticles.filter((item) => item.url != id);
      setAllArticles(newAllArticles);
      localStorage.setItem("articles", JSON.stringify(newAllArticles));
      setShowDelete(true);
      setTimeout(() => {
        setShowDelete(false);
      }, 2000);
    }

    // console.log(item);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Delete Notification  */}
      {showDelete && (
        <div className="absolute top-20 right-0 px-8 py-4 font-bold orange_gradient rounded-3xl">
          Successfully: Deleted
        </div>
      )}
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                className="copy_btn  "
                onClick={(e) => handleCopy(e, item.url)}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon "
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
              <div onClick={(e) => handleDelete(e, item.url)}>
                <BsFillTrash3Fill />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result  */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <>
            <LoadingBar color="#f11946" progress={progress} />
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          </>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Oops! <br />{" "}
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-700 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box relative">
                {pauseSpeech ? (
                  <GrPowerReset
                    className="text-2xl absolute right-0 cursor-pointer"
                    onClick={handleSpeaker}
                  />
                ) : (
                  <GiSpeaker
                    className="text-3xl absolute right-0 cursor-pointer"
                    onClick={handleSpeaker}
                  />
                )}
                <p
                  className="font-inter font-medium text-sm text-gray-700 pt-6"
                  ref={articleSummary}
                >
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
