import React from "react";

const ContactCard = React.memo(({ contact, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">{contact.name}</h2>
        <p className="text-sm text-gray-400">{contact.email}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {contact.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600 text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        {contact.favorite && (
          <span className="text-yellow-400 text-sm mt-2 block">★ Favorite</span>
        )}
      </div>
      <button
        onClick={() => onDelete(contact.id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
});

export default ContactCard;
