import React from "react";

const FeedbackList = ({ feedbacks, originalCount, onClear }) => {
  if (originalCount === 0) {
    return <p className="text-gray-600 italic">No Feedback Yet.</p>;
  }

  if (feedbacks.length > 10) {
    return (
      <p className="text-red-500">
        Too many results, please refine your search.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map((entry) => (
          <div
            key={entry.id}
            className={`border p-4 rounded shadow ${
              entry.rating === 5 ? "border-green-500" : "border-gray-300"
            }`}
          >
            <h4 className="font-bold text-lg">{entry.name}</h4>
            <p>{entry.feedback}</p>
            <div className="text-sm text-gray-600">
              Rating: {entry.rating} | {entry.timestamp}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onClear}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Clear All Feedback
      </button>
    </div>
  );
};

export default FeedbackList;
