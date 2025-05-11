// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">TaskApp</Link>
      </div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/tasks" className="hover:text-gray-300">
              Tasks
            </Link>
            <button onClick={handleLogout} className="hover:text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/" className="hover:text-gray-300">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
