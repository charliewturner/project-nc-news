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

  const handleArticleDelete = () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmDeletion) return;

    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${post.article.article_id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was a problem deleting this article.");
        }

        onClose?.();

        window.alert("Article successfully deleted");
      })
      .catch((error) => {
        console.error(error);
        alert("There was a problem deleting this article.");
      });
  };

  const handleCommentVote = (comment_id, newUserVote) => {
    if (!currentUser) {
      alert("You must be logged in to vote on comments.");
      return;
    }

    let currentVote = userCommentVotes[comment_id];

    if (!currentVote) {
      const requiredComment = comments.find(
        (comment) => comment.comment_id === comment_id
      );

      currentVote = {
        voteCount: requiredComment ? requiredComment.votes || 0 : 0,
        userVote: 0,
      };
    }

    // clicking same vote again clears it
    if (newUserVote === currentVote.userVote) {
      newUserVote = 0;
    }

    const diff = newUserVote - currentVote.userVote;

    // optimistic UI update
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
        if (!response.ok) throw new Error("Comment vote failed");
        return response.json();
      })
      .then(({ comment }) => {
        // sync with backend total
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
        // rollback optimistic update
        setUserCommentVotes((currentVotes) => ({
          ...currentVotes,
          [comment_id]: currentVote,
        }));
      });
  };

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
              {post.article.author === currentUser && (
                <div className="comment-delete" onClick={handleArticleDelete}>
                  Delete
                </div>
              )}
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
            handleCommentVote={handleCommentVote}
            comments={comments}
            setComments={setComments}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

export default FullPost;
