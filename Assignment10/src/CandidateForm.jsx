import React, { useState, useEffect } from "react";

const skillsList = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    skills: [],
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("candidates")) || [];
    setEntries(data);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const newSkills = checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value);
      setFormData({ ...formData, skills: newSkills });
    } else if (type === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePic: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (formData.skills.length < 2)
      newErrors.skills = "Select at least 2 skills";
    if (!formData.profilePic)
      newErrors.profilePic = "Profile picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newEntry = {
      ...formData,
      profilePic: preview,
      id: Date.now(),
    };

    setEntries([newEntry, ...entries]);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      skills: [],
      profilePic: null,
    });
    setPreview(null);
    setErrors({});
  };

  const handleDelete = (id) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Candidate Registration</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow-md rounded"
      >
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleChange}
                />{" "}
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleChange} />
          {errors.profilePic && (
            <p className="text-red-500 text-sm">{errors.profilePic}</p>
          )}
          {preview && (
            <img
              width={30}
              height={30}
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>

      {/* Entries */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Registered Candidates</h3>
        {entries.length === 0 && <p>No candidates yet.</p>}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border p-4 mb-4 rounded shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={entry.profilePic}
                alt={entry.fullName}
                className="w-16 h-16 object-cover rounded-full"
              />

              <div>
                <p className="font-bold">{entry.fullName}</p>
                <p>{entry.email}</p>
                <p>Phone: {entry.phone}</p>
                <p>Gender: {entry.gender}</p>
                <p>Skills: {entry.skills.join(", ")}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateForm;
