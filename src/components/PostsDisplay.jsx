import PostDisplayItem from "./PostDisplayItem";

function PostsDisplay({ displayedPosts }) {
  return (
    <section id="posts-display">
      <ul>
        {displayedPosts.map((post) => {
          const id = displayedPosts.indexOf(post);

          return (
            <PostDisplayItem
              key={post.article_id}
              id={id}
              article_img_url={post.article_img_url}
              title={post.title}
              topic={post.topic}
              created_at={post.created_at}
              author={post.author}
              seeFullPost={post.seeFullPost}
              shareLink={post.shareLink}
              votes={post.votes}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default PostsDisplay;
