import { useEffect, useState } from "react";
import "./App.css";
import TopicSelector from "./components/TopicSelector";
import PostsDisplay from "./components/PostsDisplay";
import Search from "./components/Search";
import NewPost from "./components/NewPost";
import getAPI from "./components/getAPI";

function App() {
  const [count, setCount] = useState(0);
  const [mainPageStatus, setMainPageStatus] = useState("loading");

  //SET INITIAL URL
  const [apiURL, setApiURL] = useState(
    `https://project-northcoders-news.onrender.com/api/articles`
  );

  const [displayedPosts, setDisplayedPosts] = useState([]);

  const [topicFiltered, setTopicFiltered] = useState(null);

  useEffect(() => {
    const fetchAPI = async function () {
      setMainPageStatus("loading");
      try {
        const data = await getAPI(apiURL);
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
    <section className="main-display">
      <section className="app-right">
        <Search />
        <NewPost />
      </section>
      <TopicSelector />
      <PostsDisplay displayedPosts={displayedPosts} />
    </section>
  );
}

export default App;
