import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="main-container">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
