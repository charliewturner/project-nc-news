import { useEffect, useState } from "react";
import "./App.css";
import TopicSelector from "./components/TopicSelector";
import PostsDisplay from "./components/PostsDisplay";
import Search from "./components/Search";
import NewPost from "./components/NewPost";
import getAPI from "./components/getAPI";
import FullPost from "./components/FullPost";

function App() {
  const [count, setCount] = useState(0);
  const [mainPageStatus, setMainPageStatus] = useState("loading");

  //SET INITIAL URL
  const [apiURL, setApiURL] = useState(
    `https://project-northcoders-news.onrender.com/api/articles`
  );

  const [displayedPosts, setDisplayedPosts] = useState([]);

  const [topicFiltered, setTopicFiltered] = useState(null);

  const [popUpPost, setPopUpPost] = useState(null);

  const [userArticleVotes, setUserArticleVotes] = useState({});

  function handleSeeFullPost(article) {
    setPopUpPost(article);
  }

  const handleArticleVote = (article_id, changeVoteBy) => {
    const currentVote = userArticleVotes[article_id] || 0;
    if (changeVoteBy === currentVote) return;

    const voteDifference = changeVoteBy - currentVote;

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
      .then(({ data }) => {
        console.log(data);

        setUserArticleVotes((currentVotes) => {
          const updateVotes = { ...currentVotes };
          updateVotes[article_id] = changeVoteBy;
          return updateVotes;
        });

        //update the visual vote number (Re-render may be less user friendly if multiple voted have occured while the user is looking at the post)
      })
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
    <>
      <section className="main-display">
        <section className="search-newpost-container">
          <Search />
          <NewPost />
        </section>
        <TopicSelector
          setTopicFiltered={setTopicFiltered}
          topicFiltered={topicFiltered}
        />
        <PostsDisplay
          displayedPosts={displayedPosts}
          seeFullPost={handleSeeFullPost}
          handleArticleVote={handleArticleVote}
        />
      </section>
      {popUpPost && (
        <FullPost
          post={popUpPost}
          displayedPosts={displayedPosts}
          onClose={() => setPopUpPost(null)}
          handleArticleVote={handleArticleVote}
        />
      )}
    </>
  );
}

export default App;
