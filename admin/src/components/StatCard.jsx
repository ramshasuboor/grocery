import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPills,
  faFileInvoice,
  faUser,
  faUserTie,
  faCreditCard,
  faCashRegister,
  faChartLine,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

const StatCard = ({ icon, isRupeeIcon, value, label }) => {
  return (
    <div className="stat-card">
      {isRupeeIcon ? (
        <div className="rupee-icon">₹</div>
      ) : (
        <div className="medicine-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className="card-content">
        <div className="card-value">{value}</div>
        <div className="card-label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
