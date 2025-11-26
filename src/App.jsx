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

  const handleArticleVote = (article_id, newUserVote) => {
    if (!currentUser) {
      alert("You must be logged in to vote.");
      return;
    }

    let currentVote = userArticleVotes[article_id];

    if (!currentVote) {
      const requiredArticle = fetchedArticles.find(
        (article) => article.article_id === article_id
      );

      currentVote = {
        voteCount: requiredArticle ? requiredArticle.votes || 0 : 0,
        userVote: 0,
      };
    }

    // Optional: clicking the same vote again removes your vote (set to 0)
    if (newUserVote === currentVote.userVote) {
      newUserVote = 0;
    }

    const diff = newUserVote - currentVote.userVote;

    // optimistic UI update
    setUserArticleVotes((currentVotes) => ({
      ...currentVotes,
      [article_id]: {
        voteCount: currentVote.voteCount + diff,
        userVote: newUserVote,
      },
    }));

    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${article_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser,
          vote: newUserVote, // -1, 0, or 1
        }),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Vote failed");
        return response.json();
      })
      .then(({ article }) => {
        // optional: sync with backend total in case of drift
        setUserArticleVotes((currentVotes) => ({
          ...currentVotes,
          [article_id]: {
            ...currentVotes[article_id],
            voteCount: article.votes,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        // rollback optimistic update on error
        setUserArticleVotes((currentVotes) => ({
          ...currentVotes,
          [article_id]: currentVote,
        }));
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

  useEffect(() => {
    // if not logged in, clear vote state
    if (!currentUser) {
      setUserArticleVotes({});
      return;
    }

    // if articles are not loaded yet, don't fetch votes
    if (!fetchedArticles || fetchedArticles.length === 0) return;

    fetch(
      `https://project-northcoders-news.onrender.com/api/users/${currentUser}/article-votes`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load user votes");
        return res.json();
      })
      .then(({ votes }) => {
        // votes: [{ article_id, vote }]
        const voteMap = {};

        // start with article totals from backend
        fetchedArticles.forEach((article) => {
          voteMap[article.article_id] = {
            voteCount: article.votes,
            userVote: 0,
          };
        });

        // overlay user's own votes
        votes.forEach(({ article_id, vote }) => {
          if (voteMap[article_id]) {
            voteMap[article_id].userVote = vote;
          }
        });

        setUserArticleVotes(voteMap);
      })
      .catch((err) => {
        console.log(err);
        // you can optionally set some error state here
      });
  }, [currentUser, fetchedArticles]);

  const handleCommentVote = (comment_id, newUserVote) => {
    if (!currentUser) {
      alert("You must be logged in to vote.");
      return;
    }

    let currentVote = userCommentVotes[comment_id];

    if (!currentVote) {
      // we don't have comment data here, so default to 0 then backend will sync
      currentVote = {
        voteCount: 0,
        userVote: 0,
      };
    }

    if (newUserVote === currentVote.userVote) {
      newUserVote = 0;
    }

    const diff = newUserVote - currentVote.userVote;

    setUserCommentVotes((currentVotes) => ({
      ...currentVotes,
      [comment_id]: {
        voteCount: currentVote.voteCount + diff,
        userVote: newUserVote,
      },
    }));

    fetch(
      `https://project-northcoders-news.onrender.com/api/comments/${comment_id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: currentUser, vote: newUserVote }),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Comment vote failed");
        return response.json();
      })
      .then(({ comment }) => {
        setUserCommentVotes((currentVotes) => ({
          ...currentVotes,
          [comment_id]: {
            ...currentVotes[comment_id],
            voteCount: comment.votes,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserCommentVotes((currentVotes) => ({
          ...currentVotes,
          [comment_id]: currentVote,
        }));
      });
  };

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
            handleCommentVote={handleCommentVote}
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
