import PostDisplayItem from "./PostDisplayItem";

function PostsDisplay({ displayedPosts }) {
  return (
    <section id="posts-display">
      <ul>
        {displayedPosts.map((post) => {
          return (
            <PostDisplayItem
              key={post.article_id}
              img={img}
              title={title}
              topic={topic}
              created_at={created_at}
              author={author}
              seeFullPost={seeFullPost}
              shareLink={shareLink}
              votes={votes}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default PostsDisplay;
