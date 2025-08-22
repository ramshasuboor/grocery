import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ActionCard = ({ icon, text, to }) => {
  return (
    <Link to={to}>
      <div className="action-card">
        <div className="action-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="action-text">{text}</div>
      </div>
    </Link>
  );
};

export default ActionCard;
