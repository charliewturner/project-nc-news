import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterControls from "./FilterControls";
import PostsDisplay from "./PostsDisplay";
import Search from "./Search";
import Header from "./Header";

function Home({
  currentUser,
  setCurrentUser,

  fetchedArticles,
  userArticleVotes,
  handleArticleVote,
}) {
  const navigate = useNavigate();
  function handleSeeFullPost(article) {
    navigate(`/articles/${article.article_id}`);
  }

  const [topicFiltered, setTopicFiltered] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    let posts = [...fetchedArticles];

    if (topicFiltered) {
      posts = posts.filter((post) => post.topic === topicFiltered);
    }

    posts.sort((a, b) => {
      let valueA, valueB;
      if (sortBy === "date") {
        valueA = new Date(a.created_at);
        valueB = new Date(b.created_at);
      } else if (sortBy === "comment count") {
        valueA = a.comment_count;
        valueB = b.comment_count;
      } else if (sortBy === "votes") {
        valueA = a.votes;
        valueB = b.votes;
      }

      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });

    setDisplayedPosts(posts);
  }, [fetchedArticles, sortBy, sortOrder, topicFiltered]);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <>
        <section className="main-display">
          <section className="search-newpost-container">
            <Search />
          </section>
          <FilterControls
            setTopicFiltered={setTopicFiltered}
            topicFiltered={topicFiltered}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <PostsDisplay
            displayedPosts={displayedPosts}
            seeFullPost={handleSeeFullPost}
            articleVotes={userArticleVotes}
            handleArticleVote={handleArticleVote}
          />
        </section>
      </>
    </>
  );
}
export default Home;
