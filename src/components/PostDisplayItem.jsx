import FullPost from "./FullPost";

function PostDisplayItem({
  id,
  article_img_url,
  title,
  topic,
  created_at,
  author,
  votes,
  seeFullPost,
  shareLink,
}) {
  let formattedDate = created_at.slice(0, 10);
  formattedDate = new Date(formattedDate);
  formattedDate = formattedDate.toLocaleDateString();

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
          <p className="post-topic">{topic}</p>
          <p className="post-date">{formattedDate} </p>
          <p className="post-author">{author} </p>
          <button className="seeFullPostButton" onClick={() => seeFullPost(id)}>
            {seeFullPost}See full post
          </button>
          <button className="shareLinkButton" onClick={() => shareLink(id)}>
            {shareLink}Share link
          </button>
        </div>
      </section>
      <section className="post-item-right">
        <div className="upvote">↑</div>
        <div className="voteNumber">{votes}</div>
        <div className="downvote">↓</div>
      </section>
    </li>
  );
}
export default PostDisplayItem;
