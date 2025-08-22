import React, { useState } from "react";
import StatCard from "../../components/StatCard";
import ActionCard from "../../components/ActionCard";
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
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="section-title">Sales</div>
      <div className="cards-container">
        <StatCard isRupeeIcon={true} value="12345" label="Today's Sales" />
        <StatCard isRupeeIcon={true} value="12345" label="Yesterday's Sales" />
        <StatCard
          icon={faPills}
          isRupeeIcon={false}
          value="876"
          label="Total Medicines"
        />
        <StatCard
          icon={faPills}
          isRupeeIcon={false}
          value="8"
          label="Out of Stock"
        />
        <StatCard isRupeeIcon={true} value="12345" label="Last 7 days" />
        <StatCard isRupeeIcon={true} value="12345" label="Last Month" />
        <StatCard
          icon={faPills}
          isRupeeIcon={false}
          value="16"
          label="Expired"
        />
        <StatCard
          icon={faPills}
          isRupeeIcon={false}
          value="12"
          label="Total Category"
        />
      </div>
      <div className="divider"></div>

      <div className="action-cards">
        <ActionCard
          icon={faFileInvoice}
          text="Create New Invoice"
          to="/add-medicine"
        />
        <ActionCard icon={faUser} text="Add New Customer" to="/add-customer" />
        <ActionCard icon={faPills} text="Add New Medicine" to="/add-medicine" />
        <ActionCard
          icon={faUserTie}
          text="Add New Supplier"
          to="/add-supplier"
        />
        <ActionCard icon={faCreditCard} text="Add New Purchase" to="/" />
        <ActionCard icon={faCashRegister} text="Add New Sale" to="/" />
        <ActionCard icon={faChartLine} text="Sales Report" to="/add-medicine" />
        <ActionCard icon={faChartBar} text="Purchase Report" to="/" />
      </div>
    </>
  );
};

export default Dashboard;
