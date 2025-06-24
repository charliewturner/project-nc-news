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
          <p className="post-date">{created_at} </p>
          <p className="post-author">{author} </p>
          <button onClick={() => seeFullPost(id)}>
            {seeFullPost}See full post
          </button>
          <button onClick={() => shareLink(id)}>{shareLink}Share link</button>
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
