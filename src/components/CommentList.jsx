import { useEffect, useState } from "react";

function CommentList({ post }) {
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

  console.log(comments);

  return (
    <ul className="comments">
      {comments.map((comment) => {
        let formattedDate = comment.created_at.slice(0, 10);
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
              <div className="upvote">↑</div>
              <div className="voteNumber">{comment.votes}</div>
              <div className="downvote">↓</div>
            </section>
          </div>
        );
      })}
    </ul>
  );
}

export default CommentList;
