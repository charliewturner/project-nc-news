import { useState } from "react";

function NewArticleForm({ currentUser, setShowArticleForm, onArticleCreated }) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://project-northcoders-news.onrender.com/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: currentUser,
        title,
        topic,
        body,
        article_img_url: imgUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to post article");
        return res.json();
      })
      .then(({ article }) => {
        onArticleCreated(article);
        setShowArticleForm(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error posting article.");
      });
  };

  return (
    <div className="new-article-popup">
      <div className="close-btn" onClick={() => setShowArticleForm(false)}>
        ✕
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Create a New Article</h3>

        <input
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Topic (e.g. coding)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <textarea
          placeholder="Article body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <button type="submit">Post Article</button>
      </form>
    </div>
  );
}

export default NewArticleForm;
