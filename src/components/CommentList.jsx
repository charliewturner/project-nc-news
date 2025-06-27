import { useEffect, useState } from "react";

function CommentList({ post, userCommentVotes, setUserCommentVotes }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(
      `https://project-northcoders-news.onrender.com/api/articles/${post.article_id}/comments`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setComments(data.comments);
      });
  }, [post.article_id]);

  const handleCommentVote = (comment_id, changeVote) => {
    let currentVote = userCommentVotes[comment_id];

    if (!currentVote) {
      const requiredComment = comments.find(
        (article) => article.comment_id === comment_id
      );

      currentVote = {
        voteCount: requiredComment.votes || 0,
        userVote: 0,
      };
    }

    if (changeVote === currentVote.userVote) return;

    const voteDifference = changeVote - currentVote.userVote;

    setUserCommentVotes((currentVotes) => ({
      ...currentVotes,
      [comment_id]: {
        voteCount: currentVote.voteCount + voteDifference,
        userVote: changeVote,
      },
    }));

    fetch(
      `https://project-northcoders-news.onrender.com/api/comments/${comment_id}`,
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

  return (
    <ul className="comments">
      {comments.map((comment) => {
        let formattedDate = comment.created_at.slice(0, 10);
        const votesInfo = userCommentVotes[comment.comment_id] || {
          voteCount: comment.votes,
          userVote: 0,
        };
        return (
          <div className="comment-container">
            <div className="comment-main">
              <div className="comment-info">
                <li className="comment-author">{comment.author}</li>
                <li className="comment-date">{formattedDate}</li>
              </div>
              <li className="comment-body">{comment.body}</li>
            </div>
            <section className="comment-votes">
              <div
                className={`upvote ${votesInfo.userVote === 1 ? "voted" : ""}`}
                onClick={() => {
                  handleCommentVote(comment.comment_id, 1);
                }}
              >
                ↑
              </div>
              <div className="voteNumber">{votesInfo.voteCount}</div>
              <div
                className={`downvote ${
                  votesInfo.userVote === -1 ? "voted" : ""
                }`}
                onClick={() => {
                  handleCommentVote(comment.comment_id, -1);
                }}
              >
                ↓
              </div>
            </section>
          </div>
        );
      })}
    </ul>
  );
}

export default CommentList;
