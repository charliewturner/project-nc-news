import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FullPost from "./FullPost";

function FullPostPopUpWindow({
  displayedPosts,
  handleArticleVote,
  userArticleVotes,
  userCommentVotes,
  setUserCommentVotes,
  currentUser,
}) {
  const { article_id } = useParams();
  const navigate = useNavigate();
  const [popUpPost, setPopUpPost] = useState(null);

  useEffect(() => {
    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${article_id}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failure fetching article");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPopUpPost(data);
      })
      .catch((error) => console.error(error));
  }, [article_id]);
  return (
    <FullPost
      post={popUpPost}
      displayedPosts={displayedPosts}
      handleArticleVote={handleArticleVote}
      articleVotes={userArticleVotes}
      userCommentVotes={userCommentVotes}
      setUserCommentVotes={setUserCommentVotes}
      currentUser={currentUser}
      onClose={() => navigate("/")}
    />
  );
}

export default FullPostPopUpWindow;
