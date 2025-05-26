import React, { useState, useCallback, useMemo } from "react";

import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useDebounce } from "../hook/useDebounce";
import ContactCard from "./ContactCard";

const ContactsApp = () => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const handleAdd = () => {
    if (!name || !email) return;

    const newContact = {
      id: uuidv4(),
      name,
      email,
      tags: tags.split(",").map((tag) => tag.trim()),
      favorite,
    };

    setContacts([...contacts, newContact]);
    setName("");
    setEmail("");
    setTags("");
    setFavorite(false);
  };

  const handleDelete = useCallback(
    (id) => {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    },
    [setContacts]
  );

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const query = debouncedSearch.toLowerCase();
      return (
        c.name.toLowerCase().includes(query) ||
        c.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [contacts, debouncedSearch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Live Filtered Contacts</h1>

        {/* Add Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <input
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={favorite}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            <label>Favorite</label>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-6"
        >
          Add Contact
        </button>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />

        {/* Contact List */}
        <div className="space-y-3">
          {filteredContacts.length ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-gray-400">No contacts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsApp;
