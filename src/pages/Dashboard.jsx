import React from "react";
import { useTimer } from "../hooks/useTimer";
import { StatusBar } from "../components/StatusBar";

export function Dashboard({ habits, setHabits, selectedHabitId, setSelectedHabitId }) {
  const {
    seconds, isActive, mode, focusMinutes, setFocusMinutes,
    breakMinutes, setBreakMinutes, start, pause, reset, prepCountdown, isPrepping,
    showMessage, setMode
  } = useTimer(habits, setHabits, selectedHabitId, 25, 5);

  const selectedHabit = habits.find((h) => h.id === selectedHabitId);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // تغییر مود دستی به صورت کاملاً ایزوله
  const handleModeChange = (newMode) => {
    if (isActive || isPrepping) return; 
    setMode(newMode);
    localStorage.setItem("pomo_mode", newMode);
    reset(newMode); // فقط در هنگام تغییر مود دستی، زمان به مقدار پیش‌فرض آن مود تغییر می‌کند
  };

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "512px", 
      margin: "0 auto", 
      padding: "16px", 
      direction: "rtl",
      boxSizing: "border-box"
    }}>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* بخش تایمر تمرکز */}
        <section style={{ 
          backgroundColor: "#ffffff", 
          borderRadius: "24px", 
          padding: "24px", 
          border: "4px solid #E2EAFC", 
          textAlign: "center",
          boxSizing: "border-box"
        }}>
          
          {/* دکمه‌های جابجایی مود فعال */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            <button
              onClick={() => handleModeChange("focus")}
              disabled={isActive || isPrepping}
              style={{
                padding: "6px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                border: "none",
                cursor: (isActive || isPrepping) ? "not-allowed" : "pointer",
                backgroundColor: mode === "focus" ? "#E8F5E9" : "#f1f5f9",
                color: mode === "focus" ? "#1b5e20" : "#64748b",
                opacity: (isActive || isPrepping) && mode !== "focus" ? 0.5 : 1,
                transition: "all 0.2s ease"
              }}
            >
              💻 تمرکز
            </button>
            <button
              onClick={() => handleModeChange("break")}
              disabled={isActive || isPrepping}
              style={{
                padding: "6px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                border: "none",
                cursor: (isActive || isPrepping) ? "not-allowed" : "pointer",
                backgroundColor: mode === "break" ? "#FFEBEE" : "#f1f5f9",
                color: mode === "break" ? "#c62828" : "#64748b",
                opacity: (isActive || isPrepping) && mode !== "break" ? 0.5 : 1,
                transition: "all 0.2s ease"
              }}
            >
              ☕ استراحت
            </button>
          </div>

          <div style={{ marginBottom: "12px", fontSize: "40px" }}>
            {mode === "focus" ? "💻" : "☕"}
          </div>
          
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
            عادت انتخاب‌شده: <span style={{ color: "#4f46e5", fontWeight: "bold" }}>{selectedHabit ? selectedHabit.title : "یک عادت انتخاب کنید"}</span>
          </p>

          <div style={{ fontSize: "42px", fontWeight: "900", backgroundColor: "#F8F9FA", padding: "16px 0", borderRadius: "16px", border: "2px dashed #cbd5e1", margin: "0 auto 16px auto", width: "100%", maxWidth: "200px" }}>
            {isPrepping ? <span style={{ color: "#ec4899" }}>{prepCountdown}</span> : <span>{formatTime(seconds)}</span>}
          </div>

          {/* فیلدهای ورودی زمان */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "10px", 
            backgroundColor: "#f8fafc", 
            padding: "12px", 
            borderRadius: "16px", 
            border: "1px solid #e2e8f0", 
            fontSize: "12px", 
            color: "#64748b", 
            marginBottom: "16px" 
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <span>⏱️ تمرکز:</span>
              <input type="number" min="1" disabled={isActive || isPrepping} value={focusMinutes} onChange={(e) => setFocusMinutes(Number(e.target.value))} style={{ width: "50px", padding: "4px", textAlign: "center", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              <span>☕ استراحت:</span>
              <input type="number" min="1" disabled={isActive || isPrepping} value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} style={{ width: "50px", padding: "4px", textAlign: "center", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
            </div>
          </div>

          {/* دکمه‌های کنترل برنامه */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button onClick={start} disabled={isActive || isPrepping} style={{ flex: "1", minHeight: "40px", padding: "8px 16px", backgroundColor: "#A8E6CF", color: "#065f46", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>▶️ شروع</button>
            <button onClick={pause} disabled={!isActive && !isPrepping} style={{ flex: "1", minHeight: "40px", padding: "8px 16px", backgroundColor: "#FFD3B6", color: "#78350f", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>⏸️ توقف</button>
            <button onClick={() => reset(mode)} style={{ flex: "1", minHeight: "40px", padding: "8px 16px", backgroundColor: "#FFAAA6", color: "#991b1b", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>🔄 ریست</button>
          </div>

          {/* پیام موفقیت‌آمیز پایان کار */}
          {showMessage && (
            <div style={{ 
              marginTop: "14px", 
              padding: "10px", 
              backgroundColor: "#E0F2FE", 
              color: "#0369A1", 
              borderRadius: "12px", 
              fontSize: "12px", 
              fontWeight: "bold",
              border: "1px solid #bae6fd"
            }}>
              🎉 جلسه تمرکز برای «{selectedHabit ? selectedHabit.title : "عادت روزانه"}» تمام شد!
            </div>
          )}
        </section>

        {/* بخش لیست عادت‌ها */}
        <section style={{ 
          backgroundColor: "#ffffff", 
          padding: "24px", 
          borderRadius: "24px", 
          border: "1px solid #e2e8f0",
          boxSizing: "border-box"
        }}>
          <h3 style={{ fontSize: "14px", margin: "0 0 12px 0", fontWeight: "bold", color: "#475569" }}>🎯 انتخاب یک عادت برای تمرکز:</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {habits.length === 0 ? (
              <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", margin: "12px 0" }}>هنوز هیچ عادتی ثبت نکرده‌اید. 🌱</p>
            ) : (
              habits.map((h) => (
                <div 
                  key={h.id} 
                  onClick={() => !(isActive || isPrepping) && setSelectedHabitId(h.id)} 
                  style={{ 
                    padding: "12px", 
                    borderRadius: "12px", 
                    backgroundColor: selectedHabitId === h.id ? "#D4F1F4" : "#f8fafc", 
                    fontSize: "13px", 
                    cursor: "pointer", 
                    border: selectedHabitId === h.id ? "2px solid #75E6DA" : "1px solid #edf2f7",
                    transition: "all 0.2s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ flexGrow: 1, textAlign: "right" }}>
                    {selectedHabitId === h.id ? "● " : "○ "}{h.title}
                  </span>
                  {h.completed && <span style={{ color: "#10b981", fontWeight: "bold" }}>[✔️]</span>}
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      <StatusBar habits={habits} focusMinutes={focusMinutes} currentSeconds={seconds} mode={mode} />
    </div>
  );
}
