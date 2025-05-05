import React, { useRef, useEffect, useState } from "react";

const Home = () => {
  const timer = useRef(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(3);

  const handleChangeDebounced = (event) => {
    if (timer.current) clearTimeout(timer.current);
    const value = event.target.value;
    timer.current = setTimeout(() => {
      setSearch(value.trim());
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / perPage));
    setPage(1);
  }, [search, data]);

  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <input
        onChange={handleChangeDebounced}
        type="text"
        placeholder="Search..."
        disabled={loading}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : paginatedData.length > 0 ? (
          paginatedData.map((el) => (
            <div
              style={{
                border: "2px solid red",
                textAlign: "left",
                padding: "15px",
              }}
              key={el.id}
            >
              <p>name: {el.name}</p>
              <p>email: {el.email}</p>
              <p>address: {el.address.city}</p>
              <p>company: {el.company.name}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
