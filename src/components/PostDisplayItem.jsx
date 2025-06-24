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
      <section>
        <img
          className="post-image"
          src={article_img_url}
          alt="Image not found."
        />
      </section>
      <section>
        <p className="post-title">{title}</p>
        <p className="post-topic">{topic}</p>
        <p className="post-date">{created_at}</p>
        <p className="post-author">{author}</p>
        <button onClick={() => seeFullPost(id)}>
          {seeFullPost}See full post
        </button>
        <button onClick={() => shareLink(id)}>{shareLink}Share link</button>
      </section>
      <section>
        <div>upvote</div>
        <div>{votes}</div>
        <div>downvote</div>
      </section>
    </li>
  );
}
export default PostDisplayItem;
