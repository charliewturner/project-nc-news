import { use, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import TopicSelector from "./components/TopicSelector";
import PostsDisplay from "./components/PostsDisplay";
import Search from "./components/Search";
import NewPost from "./components/NewPost";
import getAPI from "./components/getAPI";
import FullPostPopUpWindow from "./components/FullPostPopUpWindow";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);
  const [mainPageStatus, setMainPageStatus] = useState("loading");

  const [apiURL, setApiURL] = useState(
    `https://project-northcoders-news.onrender.com/api/articles`
  );

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [topicFiltered, setTopicFiltered] = useState(null);

  const [userArticleVotes, setUserArticleVotes] = useState({});
  const [userCommentVotes, setUserCommentVotes] = useState({});
  const [currentUser, setCurrentUser] = useState("grumpy19");

  function handleSeeFullPost(article) {
    setPopUpPost(article);
  }

  const handleArticleVote = (article_id, changeVote) => {
    let currentVote = userArticleVotes[article_id];

    if (!currentVote) {
      const requiredArticle = displayedPosts.find(
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
      .then(({ data }) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchAPI = async function () {
      setMainPageStatus("loading");
      try {
        const url = topicFiltered ? apiURL + `?topic=${topicFiltered}` : apiURL;
        const data = await getAPI(url);
        const { articles } = data;
        setDisplayedPosts(articles);
        setMainPageStatus("success");
      } catch (err) {
        setMainPageStatus("error");
      }
    };

    fetchAPI();
  }, [topicFiltered]);

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
            displayedPosts={displayedPosts}
            handleArticleVote={handleArticleVote}
            userArticleVotes={userArticleVotes}
            userCommentVotes={userCommentVotes}
            setUserCommentVotes={setUserCommentVotes}
            currentUser={currentUser}
          />
        }
      ></Route>
      <Route
        path="/articles/:article_id"
        element={
          <FullPostPopUpWindow
            displayedPosts={displayedPosts}
            handleArticleVote={handleArticleVote}
            userArticleVotes={userArticleVotes}
            userCommentVotes={userCommentVotes}
            setUserCommentVotes={setUserCommentVotes}
            currentUser={currentUser}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
