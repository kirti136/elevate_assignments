import React from "react";

const FeedbackSearch = ({ search, setSearch, sortBy, setSortBy }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
        className="border px-3 py-2 rounded w-full"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="recent">Most Recent</option>
        <option value="rating">Highest Rating</option>
      </select>
    </div>
  );
};

export default FeedbackSearch;
