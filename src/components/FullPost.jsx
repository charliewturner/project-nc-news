import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentList from "./CommentList";

function FullPost({
  displayedPosts,
  post,
  onClose,
  handleArticleVote,
  articleVotes,
  userCommentVotes,
  setUserCommentVotes,
  currentUser,
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  if (!post) return;
  const handleSubmit = (event) => {
    event.preventDefault();

    if (newComment == "") {
      return;
    }

    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${post.article.article_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: currentUser,
          body: newComment,
          created_at: new Date().toISOString(),
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw { status: response.status, ...error };
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setComments((prevComments) => [data.comment, ...prevComments]);
        setNewComment("");
      })
      .catch((error) => {
        if (error.status === 500)
          alert("Invalid username attempting to submit comment");
        console.log(error);
      });
  };

  const formattedDate = new Date(post.article.created_at).toLocaleDateString();

  const votesInfo = articleVotes[post.article.article_id] || {
    voteCount: post.article.votes,
    userVote: 0,
  };

  //DEFINE SHARELINK TO ALLOW FOR ARTICLE SHARING

  console.log(post);
  return (
    <div className="pop-up-overlay">
      <div className="full-post-pop-up">
        <div className="pop-up-close" onClick={onClose}>
          X
        </div>
        <div className="content">
          {" "}
          <section className="pop-up-votes">
            <div
              className={`upvote ${votesInfo.userVote === 1 ? "voted" : ""}`}
              onClick={() => {
                handleArticleVote(post.article.article_id, 1);
              }}
            >
              ↑
            </div>
            <div className="pop-up-voteNumber">{votesInfo.voteCount}</div>
            <div
              className={`downvote ${votesInfo.userVote === -1 ? "voted" : ""}`}
              onClick={() => {
                handleArticleVote(post.article.article_id, -1);
              }}
            >
              ↓
            </div>
          </section>
          <div className="pop-up-upper">
            <p className="pop-up-post-title">{post.article.title}</p>{" "}
            <div className="post-item-center-row-pop-up">
              <p className="post-topic">Topic: {post.article.topic}</p>
              <p className="post-date">{formattedDate} </p>
              <p className="post-author">Posted by {post.article.author}</p>
              <button
                className="shareLinkButton"
                onClick={() => shareLink(post.article.article_id)}
              >
                Share
              </button>
            </div>
          </div>
          <div className="pop-up-body">{post.article.body}</div>
          <div className="pop-up-submit-comment">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              />
              <button type="submit" id="comment-submit-button">
                Submit comment
              </button>
            </form>
          </div>
          <CommentList
            post={post}
            userCommentVotes={userCommentVotes}
            setUserCommentVotes={setUserCommentVotes}
            comments={comments}
            setComments={setComments}
            currentUser={currentUser}
          />
          {/* <div className="pop-up-comments"></div> */}
        </div>
      </div>
    </div>
  );
}

export default FullPost;
