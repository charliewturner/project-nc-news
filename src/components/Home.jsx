import { useNavigate } from "react-router-dom";
import TopicSelector from "./TopicSelector";
import PostsDisplay from "./PostsDisplay";
import Search from "./Search";
import Header from "./Header";

function Home({
  currentUser,
  setCurrentUser,
  setTopicFiltered,
  topicFiltered,
  displayedPosts,
  seeFullPost,
  userArticleVotes,
  handleArticleVote,
  post,
  onClose,
  userCommentVotes,
  setUserCommentVotes,
  popUpPost,
  setPopUpPost,
}) {
  const navigate = useNavigate();
  function handleSeeFullPost(article) {
    navigate(`/articles/${article.article_id}`);
  }

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <>
        <section className="main-display">
          <section className="search-newpost-container">
            <Search />
          </section>
          <TopicSelector
            setTopicFiltered={setTopicFiltered}
            topicFiltered={topicFiltered}
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
