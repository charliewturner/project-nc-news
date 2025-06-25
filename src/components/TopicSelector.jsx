import { useState } from "react";

function TopicSelector() {
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <section>
      <label htmlFor="topic-selector">Filter posts by topic: </label>
      <select name="topic-selector" id="topic-selector">
        <option value="">No selection</option>
        <option value="coding">Coding</option>
        <option value="football">Football</option>
        <option value="cooking">Cooking</option>
      </select>
    </section>
  );
}

export default TopicSelector;
