import { useEffect, useState } from "react";
import "./App.css";
import TopicSelector from "./components/TopicSelector";
import PostsDisplay from "./components/PostsDisplay";
import Search from "./components/Search";
import NewPost from "./components/NewPost";
import getAPI from "./components/getAPI";

function App() {
  const [count, setCount] = useState(0);
  const [mainPageStatus, setMainPageStatus] = useState("success");

  //SET INITIAL URL
  const [apiURL, setApiURL] = useState(
    `https://project-northcoders-news.onrender.com/`
  );

  const [displayedPosts, setDisplayedPosts] = useState(null);
  const [topicFiltered, setTopicFiltered] = useState(null);

  useEffect(() => {
    const fetchAPI = async function () {
      try {
        const data = await getAPI(apiURL);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
  }, [topicFiltered]);

  return (
    <>
      <TopicSelector />
      <PostsDisplay displayedPosts={displayedPosts} />
      <Search />
      <NewPost />
    </>
  );
}

export default App;
