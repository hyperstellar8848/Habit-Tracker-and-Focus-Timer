import React, { useState, useEffect } from "react";
import { StatusBar } from "../components/StatusBar";

export function Analytics({ habits = [] }) {
  const [liveSeconds, setLiveSeconds] = useState(() => {
    const saved = localStorage.getItem("pomo_seconds_left");
    return saved ? Number(saved) : null;
  });

  const [completedSessions, setCompletedSessions] = useState(() => {
    return Number(localStorage.getItem("pomo_completed_sessions_counter") || 0);
  });

  const mode = localStorage.getItem("pomo_mode") || "focus";
  const focusMinutes = Number(localStorage.getItem("pomo_focus_minutes")) || 25;

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSeconds(localStorage.getItem("pomo_seconds_left") ? Number(localStorage.getItem("pomo_seconds_left")) : null);
      setCompletedSessions(Number(localStorage.getItem("pomo_completed_sessions_counter") || 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const total = habits.length;
  const done = habits.filter((h) => h.completed).length;
  const remaining = total - done;

  const totalPlannedSeconds = Math.max(60, total * focusMinutes * 60);
  let totalElapsedSeconds = completedSessions * focusMinutes * 60;

  if (mode === "focus" && liveSeconds !== null) {
    const totalSessionSeconds = focusMinutes * 60;
    const liveElapsedSeconds = Math.max(0, totalSessionSeconds - liveSeconds);
    totalElapsedSeconds += liveElapsedSeconds;
  }

  const displayPlannedSeconds = Math.max(totalPlannedSeconds, totalElapsedSeconds);
  const progressPercentage = displayPlannedSeconds > 0 
    ? Math.min(100, Math.round((totalElapsedSeconds / displayPlannedSeconds) * 100)) 
    : 0;

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "16px", 
      direction: "rtl",
      boxSizing: "border-box"
    }}>
      
      <div style={{ 
        display: "flex", 
        flexDirection: "row-reverse", 
        flexWrap: "wrap", 
        gap: "16px" 
      }}>
        
        {/* باکس بالا: کارت گزارش پیشرفت عددی */}
        <section style={{ 
          flex: "1 1 340px", 
          backgroundColor: "#FFFDF9", 
          borderRadius: "24px", 
          padding: "24px", 
          border: "4px solid #E2EAFC",
          boxSizing: "border-box"
        }}>
          <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "#334155", margin: "0 0 16px 0" }}>📊 گزارش پیشرفت رویایی</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
            <div style={{ backgroundColor: "#EBF6FA", padding: "12px 6px", borderRadius: "14px", border: "1px solid #BCE3F2", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>کل اهداف</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#4f46e5", margin: "4px 0 0 0" }}>{total}</p>
            </div>
            <div style={{ backgroundColor: "#E8F5E9", padding: "12px 6px", borderRadius: "14px", border: "1px solid #C8E6C9", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>انجام شده</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#10b981", margin: "4px 0 0 0" }}>{done}</p>
            </div>
            <div style={{ backgroundColor: "#FFF3E0", padding: "12px 6px", borderRadius: "14px", border: "1px solid #FFE0B2", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>باقی‌مانده</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#d97706", margin: "4px 0 0 0" }}>{remaining}</p>
            </div>
          </div>

          <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "14px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#475569" }}>📊 درصد پیشرفت زمانی: </span>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "#6366f1" }}>%{progressPercentage}</span>
          </div>
        </section>

        {/* باکس پایین یا کنار: لیست تیک‌ها و خط‌خوردگی‌ها */}
        <section style={{ 
          flex: "1 1 300px", 
          backgroundColor: "#ffffff", 
          padding: "24px", 
          borderRadius: "24px", 
          border: "2px solid #E2EAFC",
          boxSizing: "border-box"
        }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#475569", margin: "0 0 12px 0" }}>📋 جزئیات لیست فعالیت‌ها</h3>
          
          <div style={{ 
            border: "2px solid #cbd5e1", 
            borderRadius: "14px", 
            padding: "14px", 
            backgroundColor: "#fafafa", 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px" 
          }}>
            {habits.length === 0 ? (
              <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", margin: 0 }}>هیچ عادتی ثبت نشده است. 🌱</p>
            ) : (
              habits.map((habit) => (
                <div key={habit.id} style={{ display: "flex", alignItems: "center", fontSize: "13px" }}>
                  <span style={{ 
                    fontFamily: "monospace", 
                    fontWeight: "bold", 
                    marginLeft: "10px",
                    fontSize: "14px",
                    color: habit.completed ? "#10b981" : "#94a3b8"
                  }}>
                    {habit.completed ? "[✔️]" : "[  ]"}
                  </span>
                  <span style={{ 
                    textDecoration: habit.completed ? "line-through" : "none", 
                    color: habit.completed ? "#94a3b8" : "#334155",
                    wordBreak: "break-word"
                  }}>
                    {habit.title}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      <StatusBar habits={habits} focusMinutes={focusMinutes} currentSeconds={liveSeconds} mode={mode} />
    </div>
  );
}
