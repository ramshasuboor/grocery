import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date
      const day = String(now.getDate()).padStart(2, "0");
      const month = now.toLocaleString("default", { month: "short" });
      const year = now.getFullYear();
      const dateStr = `${day}-${month}-${year}`;

      // Format time
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const timeStr = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;

      setDate(dateStr);
      setTime(timeStr);
    };

    // Update date and time initially and then every minute
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="header-title">
          <div className="welcome-text">Welcome!</div>
          <div className="title-text">Grocery Management System</div>
        </div>
      </div>
      <div className="header-right">
        <div className="date-time">
          <div>Today's Date: {date}</div>
          <div>Current Time: {time}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
