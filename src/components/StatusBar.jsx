import React from "react";

export function StatusBar({ habits = [], focusMinutes = 25, currentSeconds = null, mode = "focus" }) {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completed).length;

  const totalPlannedMinutes = totalHabits * focusMinutes;
  let totalElapsedMinutes = completedHabits * focusMinutes;

  if (mode === "focus" && currentSeconds !== null && completedHabits < totalHabits) {
    const totalSessionSeconds = focusMinutes * 60;
    const liveElapsedSeconds = Math.max(0, totalSessionSeconds - currentSeconds);
    const liveElapsedMinutes = Math.floor(liveElapsedSeconds / 60);
    
    if (liveElapsedMinutes > 0) {
      totalElapsedMinutes += liveElapsedMinutes;
    }
  }

  if (totalElapsedMinutes > totalPlannedMinutes) {
    totalElapsedMinutes = totalPlannedMinutes;
  }

  const progressPercentage = totalPlannedMinutes > 0 
    ? Math.min(100, Math.round((totalElapsedMinutes / totalPlannedMinutes) * 100)) 
    : 0;

  return (
    <div style={{
      backgroundColor: "#E8F5E9",
      border: "2px solid #C8E6C9",
      borderRadius: "18px",
      padding: "16px",
      marginTop: "20px",
      direction: "rtl",
      textAlign: "center",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <p style={{ 
        margin: "0 0 12px 0", 
        fontSize: "13px", 
        fontWeight: "bold", 
        color: "#1b5e20",
        lineHeight: "1.5" 
      }}>
        🍀 خلاصه: {completedHabits} از {totalHabits} عادت امروز انجام شده [{totalElapsedMinutes} از {totalPlannedMinutes} دقیقه تمرکز]
      </p>
      
      {/* پوسته بیرونی نوار پیشرفت */}
      <div style={{ 
        width: "100%", 
        backgroundColor: "rgba(255,255,255,0.7)", 
        borderRadius: "9999px", 
        height: "14px", 
        overflow: "hidden", 
        border: "1px solid #A8E6CF" 
      }}>
        <div style={{ 
          backgroundColor: "#10b981", 
          height: "100%", 
          width: `${progressPercentage}%`, 
          transition: "width 0.4s ease-out"
        }}></div>
      </div>
      
      <div style={{ fontSize: "11px", color: "#047857", fontWeight: "bold", textAlign: "left", marginTop: "6px" }}>
        %{progressPercentage} پیشرفت زمانی کل روز
      </div>
    </div>
  );
}
