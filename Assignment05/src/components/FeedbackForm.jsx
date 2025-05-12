import React, { useRef, useState } from "react";

const FeedbackForm = ({ onAddFeedback }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const ratingRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const rating = parseInt(ratingRef.current.value);

    if (!name.trim() || !feedback.trim()) {
      alert("Name and feedback required");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name,
      feedback,
      rating: rating >= 1 && rating <= 5 ? rating : 0,
      timestamp: new Date().toLocaleString(),
    };

    onAddFeedback(newFeedback);
    setName("");
    setFeedback("");
    ratingRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-md shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Submit Feedback</h2>
      <input
        className="w-full border px-3 py-2 rounded"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        type="number"
        placeholder="Rating (1–5)"
        ref={ratingRef}
        min="1"
        max="5"
      />
      <button className="bg-gray-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
