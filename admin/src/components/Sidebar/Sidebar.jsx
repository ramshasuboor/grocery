import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileInvoice,
  faUser,
  faPills,
  faUserTie,
  faShoppingCart,
  faChartBar,
  faSearch,
  faPlus,
  faBowlFood,
  faPlusMinus,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { icon: faChartLine, name: "Dashboard", link: "/" },
    { icon: faPills, name: "Items", link: "/items" },
    { icon: faUser, name: "Customer", link: "/customer" },
    { icon: faUserTie, name: "Supplier", link: "/supplier" },
    // { icon: faFileInvoice, name: "Invoice", link: "/invoice" },
    { icon: faFileInvoice, name: "Invoices", link: "/invoices" },
    { icon: faShoppingCart, name: "Purchase", link: "/items" },
    { icon: faChartBar, name: "Reports", link: "/items" },
    { icon: faSearch, name: "Search", link: "/items" },
    { icon: faBowlFood, name: "Recipe", link: "/recipe" },
    { icon: faCalculator, name: "Reverse Calculation", link: "/reversecalculation" },


  ];
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">{!collapsed && "GROCERY STORE"}</div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} className="sidebar-item">
            <div className="sidebar-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            {!collapsed && <span className="sidebar-text">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
