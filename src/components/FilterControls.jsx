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
    <section className="topic-selector">
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
        <option value="">No selection</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>
    </section>
  );
}

export default FilterControls;
