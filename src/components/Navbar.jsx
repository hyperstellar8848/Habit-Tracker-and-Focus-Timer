import React from "react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const activeStyle = {
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    padding: "6px 14px",
    borderRadius: "9999px",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "12px"
  };

  const inactiveStyle = {
    color: "#64748b",
    padding: "6px 14px",
    textDecoration: "none",
    fontSize: "12px"
  };

  return (
    <nav style={{
      backgroundColor: "rgba(255,255,255,0.9)",
      border: "1px solid #e2e8f0",
      position: "sticky",
      top: "10px",
      zIndex: 50,
      maxWidth: "400px",
      margin: "10px auto",
      borderRadius: "16px",
      padding: "8px",
      display: "flex",
      justifyContent: "center",
      gap: "10px"
    }}>
      <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : inactiveStyle}>🦄 داشبورد</NavLink>
      <NavLink to="/habits" style={({ isActive }) => isActive ? activeStyle : inactiveStyle}>🌱 عادت‌ها</NavLink>
      <NavLink to="/analytics" style={({ isActive }) => isActive ? activeStyle : inactiveStyle}>📊 آمار</NavLink>
    </nav>
  );
}
