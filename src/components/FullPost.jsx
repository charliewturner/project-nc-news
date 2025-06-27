import { useState } from "react";
import CommentList from "./CommentList";
function FullPost({
  displayedPosts,
  post,
  onClose,
  handleArticleVote,
  articleVotes,
  userCommentVotes,
  setUserCommentVotes,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Comment submit attempted");
  };

  const formattedDate = post.created_at.slice(0, 10);

  const votesInfo = articleVotes[post.article_id] || {
    voteCount: post.votes,
    userVote: 0,
  };

  return (
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
              handleArticleVote(post.article_id, 1);
            }}
          >
            ↑
          </div>
          <div className="voteNumber">{votesInfo.voteCount}</div>
          <div
            className={`downvote ${votesInfo.userVote === -1 ? "voted" : ""}`}
            onClick={() => {
              handleArticleVote(post.article_id, -1);
            }}
          >
            ↓
          </div>
        </section>
        <div className="pop-up-upper">
          <p className="pop-up-post-title">{post.title}</p>{" "}
          <div className="post-item-center-row">
            <p className="post-topic">Topic: {post.topic}</p>
            <p className="post-date">{formattedDate} </p>
            <p className="post-author">Posted by {post.author}</p>
            <button className="shareLinkButton" onClick={() => shareLink(id)}>
              Share
            </button>
          </div>
        </div>
        <div className="pop-up-body">{post.body}</div>
        <div className="pop-up-search">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Write your comment here..." />
            <button id="comment-submit-button">Submit comment</button>
          </form>
        </div>
        <CommentList
          post={post}
          userCommentVotes={userCommentVotes}
          setUserCommentVotes={setUserCommentVotes}
        />
        {/* <div className="pop-up-comments"></div> */}
      </div>
    </div>
  );
}

export default FullPost;
