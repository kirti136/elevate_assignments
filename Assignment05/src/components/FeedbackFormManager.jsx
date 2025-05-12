import React, { useState, useEffect, useMemo } from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackSearch from "./FeedbackSearch";
import FeedbackList from "./FeedbackList";

const FeedbackFormManager = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Log new feedback
  useEffect(() => {
    if (feedbackList.length > 0) {
      console.log("New feedback added:", feedbackList[0]);
    }
    return () => {
      console.log("Component unmounted");
    };
  }, [feedbackList]);

  // Memoized filtered + sorted list
  const filteredFeedback = useMemo(() => {
    let filtered = feedbackList.filter((entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [feedbackList, search, sortBy]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbackList((prev) => [newFeedback, ...prev]);
  };

  const handleClearFeedback = () => {
    setFeedbackList([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <FeedbackForm onAddFeedback={handleAddFeedback} />
      <FeedbackSearch
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <FeedbackList
        feedbacks={filteredFeedback}
        originalCount={feedbackList.length}
        onClear={handleClearFeedback}
      />
    </div>
  );
};

export default FeedbackFormManager;
