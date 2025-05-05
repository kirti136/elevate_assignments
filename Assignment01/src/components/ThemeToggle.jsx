import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md"
    >
      <div>
        <input type="checkbox" className="checkbox" id="checkbox" />
        <label for="checkbox" className="checkbox-label">
          <FaMoon />
          <FaSun />
          <span className="ball"></span>
        </label>
      </div>
    </button>
  );
};

export default ThemeToggle;
