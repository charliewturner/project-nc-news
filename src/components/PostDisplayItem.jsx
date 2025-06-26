import FullPost from "./FullPost";

function PostDisplayItem({
  article_id,
  id,
  article_img_url,
  title,
  topic,
  created_at,
  author,
  votes,
  seeFullPost,
  shareLink,
  handleArticleVote,
  articleVotes,
}) {
  let formattedDate = created_at.slice(0, 10);
  formattedDate = new Date(formattedDate);
  formattedDate = formattedDate.toLocaleDateString();

  const votesInfo = articleVotes[article_id] || {
    voteCount: votes,
    userVote: 0,
  };

  return (
    <li id={id} className="post-item">
      <section className="post-item-left">
        <img
          className="post-image"
          src={article_img_url}
          alt="Image not found."
        />
      </section>
      <section className="post-item-center">
        <p className="post-title">{title}</p>
        <div className="post-item-center-row">
          <p className="post-topic">Topic: {topic}</p>
          <p className="post-date">{formattedDate} </p>
          <p className="post-author">Posted by {author}</p>
          <button
            className="seeFullPostButton"
            onClick={() => {
              seeFullPost();
            }}
          >
            See full post
          </button>
          <button className="shareLinkButton" onClick={() => shareLink(id)}>
            Share link
          </button>
        </div>
      </section>
      <section className="post-item-right">
        <div
          className="upvote"
          onClick={() => {
            handleArticleVote(article_id, 1);
          }}
        >
          ↑
        </div>
        <div className="voteNumber">{votesInfo.voteCount}</div>
        <div
          className="downvote"
          onClick={() => {
            handleArticleVote(article_id, -1);
          }}
        >
          ↓
        </div>
      </section>
    </li>
  );
}
export default PostDisplayItem;
