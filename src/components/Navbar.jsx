import React, { useEffect, useState } from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import '../App.css'
function Navbar({ name, setName }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(<WiDaySunny />);

  // Internet connection status
  const checkInternetConnection = () => {
    setIsOnline(navigator.onLine);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Handle search
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setName(searchQuery);
      setSearchQuery("");
      // Simulate weather icon change based on search
      const icons = [<WiDaySunny />, <WiCloudy />, <WiRain />, <WiSnow />, <WiThunderstorm />];
      setWeatherIcon(icons[Math.floor(Math.random() * icons.length)]);
    }
  };

  useEffect(() => {
    window.addEventListener("online", checkInternetConnection);
    window.addEventListener("offline", checkInternetConnection);

    return () => {
      window.removeEventListener("online", checkInternetConnection);
      window.removeEventListener("offline", checkInternetConnection);
    };
  }, []);

  return (
    <header className={`navbar-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-content">
        {/* Logo/Title Section */}
        <div className="logo-section">
          <div className="weather-icon">
            {weatherIcon}
          </div>
          <h1 className="app-title">
            Weather<span className="highlight">Cast</span>
          </h1>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search location..."
              className="search-input"
              spellCheck="false"
            />
            <button 
              className="search-button"
              onClick={() => searchQuery.trim() && handleSearch({ key: 'Enter' })}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="controls-section">
          <button 
            className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-stars-fill"></i>
            )}
          </button>
          
          <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            <div className="status-indicator"></div>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

// CSS (add to your stylesheet)
/*

*/