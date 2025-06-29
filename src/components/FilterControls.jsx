import { useState } from "react";

function FilterControls({
  topicFiltered,
  setTopicFiltered,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  return (
    <section className="filter-controls">
      <label htmlFor="topic-selector">Filter posts by topic: </label>
      <select
        className="topic-selector-dropdown"
        name="topic-selector"
        id="topic-selector"
        value={topicFiltered || ""}
        onChange={(element) => {
          let value = element.target.value;
          setTopicFiltered(value == "" ? null : value);
        }}
      >
        <option value="">All topics</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>

      <label htmlFor="sort-by" className="sort-by-label">
        Sort by:{" "}
      </label>
      <select
        className="sort-by-dropdown"
        name="sort-by"
        id="sort-by"
        value={sortBy}
        onChange={(element) => {
          setSortBy(element.target.value);
        }}
      >
        <option value="date">Date</option>
        <option value="votes">Votes</option>
        <option value="comment_count">Comments</option>
      </select>

      <label htmlFor="order-by" className="order-by-label">
        Order:{" "}
      </label>
      <select
        className="order-by-dropdown"
        name="order-by"
        id="order-by"
        value={sortOrder}
        onChange={(element) => {
          setSortOrder(element.target.value);
        }}
      >
        {" "}
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </section>
  );
}

export default FilterControls;
