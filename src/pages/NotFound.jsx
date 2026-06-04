import React from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", direction: "rtl" }}>
      <h2>🔍 صفحه مورد نظر یافت نشد!</h2>
      <button onClick={() => navigate("/")} style={{ padding: "8px 16px", backgroundColor: "#A8E6CF", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "10px" }}>
        🐾 بازگشت به داشبورد
      </button>
    </div>
  );
}
