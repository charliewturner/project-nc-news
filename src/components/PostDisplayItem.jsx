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
    <li id={id}>
      <section>
        <img src={article_img_url} alt="Image not found." />
      </section>
      <section>
        <p>{title}</p>
        <p>{topic}</p>
        <p>{created_at}</p>
        <p>{author}</p>
        <p>{seeFullPost}</p>
        <p>{shareLink}</p>
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
<li></li>;
