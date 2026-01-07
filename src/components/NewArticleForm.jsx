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
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-article-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setShowArticleForm(false);
      }}
    >
      <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div>
            <h3 id="new-article-title" className="modal-title">
              Create a new article
            </h3>
            <p className="modal-subtitle">
              Posting as <span className="modal-username">{currentUser}</span>
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={() => setShowArticleForm(false)}
          >
            ×
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="article-title">Title</label>
              <input
                id="article-title"
                type="text"
                placeholder="Article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="article-topic">Topic</label>
              <input
                id="article-topic"
                type="text"
                placeholder="e.g. coding"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="field field-span-2">
              <label htmlFor="article-body">Body</label>
              <textarea
                id="article-body"
                placeholder="Write your article here"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                required
              />
            </div>

            <div className="field field-span-2">
              <label htmlFor="article-img">Image URL (optional)</label>
              <input
                id="article-img"
                type="url"
                placeholder="https://"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            </div>
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowArticleForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              Post article
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default NewArticleForm;
