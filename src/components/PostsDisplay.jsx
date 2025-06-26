import PostDisplayItem from "./PostDisplayItem";

function PostsDisplay({
  displayedPosts,
  seeFullPost,
  handleArticleVote,
  articleVotes,
}) {
  return (
    <section className="posts-display">
      <ul className="posts-display-list">
        {displayedPosts.map((post) => {
          const id = displayedPosts.indexOf(post);

          return (
            <PostDisplayItem
              key={post.article_id}
              article_id={post.article_id}
              id={id}
              article_img_url={post.article_img_url}
              title={post.title}
              topic={post.topic}
              created_at={post.created_at}
              author={post.author}
              seeFullPost={() => seeFullPost(post)}
              //   shareLink={post.shareLink}
              votes={post.votes}
              handleArticleVote={handleArticleVote}
              articleVotes={articleVotes}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default PostsDisplay;
