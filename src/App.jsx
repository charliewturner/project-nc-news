import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import getAPI from "./components/getAPI";
import FullPostPopUpWindow from "./components/FullPostPopUpWindow";
import Home from "./components/Home";
import Login from "./components/Login"; // ⬅ new import

function App() {
  const [mainPageStatus, setMainPageStatus] = useState("loading");

  const [apiURL, setApiURL] = useState(
    "https://project-northcoders-news.onrender.com/api/articles"
  );

  const [fetchedArticles, setFetchedArticles] = useState([]);

  const [userArticleVotes, setUserArticleVotes] = useState({});
  const [userCommentVotes, setUserCommentVotes] = useState({});

  // ⬇ changed from hardcoded "grumpy19" to value from localStorage (or null)
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("nc_news_user") || null;
  });

  const handleArticleVote = (article_id, changeVote) => {
    let currentVote = userArticleVotes[article_id];

    if (!currentVote) {
      const requiredArticle = fetchedArticles.find(
        (article) => article.article_id === article_id
      );

      currentVote = {
        voteCount: requiredArticle.votes || 0,
        userVote: 0,
      };
    }

    if (changeVote === currentVote.userVote) return;

    const voteDifference = changeVote - currentVote.userVote;

    setUserArticleVotes((currentVotes) => ({
      ...currentVotes,
      [article_id]: {
        voteCount: currentVote.voteCount + voteDifference,
        userVote: changeVote,
      },
    }));

    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${article_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inc_votes: voteDifference }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchAPI = async function () {
      setMainPageStatus("loading");
      try {
        const data = await getAPI(apiURL);
        const { articles } = data;
        setFetchedArticles(articles);
        setMainPageStatus("success");
      } catch (err) {
        setMainPageStatus("error");
      }
    };

    fetchAPI();
  }, []);

  if (mainPageStatus === "error") {
    return <h1>Error loading page</h1>;
  }

  if (mainPageStatus === "loading") {
    return <h1>Loading articles...</h1>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            fetchedArticles={fetchedArticles}
            handleArticleVote={handleArticleVote}
            userArticleVotes={userArticleVotes}
            userCommentVotes={userCommentVotes}
            setUserCommentVotes={setUserCommentVotes}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        }
      />
      <Route
        path="/articles/:article_id"
        element={
          <FullPostPopUpWindow
            fetchedArticles={fetchedArticles}
            handleArticleVote={handleArticleVote}
            userArticleVotes={userArticleVotes}
            userCommentVotes={userCommentVotes}
            setUserCommentVotes={setUserCommentVotes}
            currentUser={currentUser}
          />
        }
      />
      {/* new login route */}
      <Route
        path="/login"
        element={<Login setCurrentUser={setCurrentUser} />}
      />
    </Routes>
  );
}

export default App;
