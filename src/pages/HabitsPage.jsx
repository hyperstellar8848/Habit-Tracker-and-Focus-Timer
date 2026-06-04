import React, { useState } from "react";
import { StatusBar } from "../components/StatusBar";

export function HabitsPage({ habits, setHabits }) {
  const [newTitle, setNewTitle] = useState("");

  const addHabit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    const newHabit = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      completed: false,
    };
    
    setHabits([...habits, newHabit]);
    setNewTitle("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "0 10px", direction: "rtl" }}>
      <section style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "24px", border: "4px solid #E2EAFC", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "14px", fontWeight: "bold", color: "#334155", margin: "0 0 12px 0", textAlign: "right" }}>🌱 ایجاد عادت جدید</h2>
        <form onSubmit={addHabit} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="مثلاً: مطالعه کتاب 📖"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ flexGrow: 1, padding: "8px", borderRadius: "8px", border: "2px solid #cbd5e1", fontSize: "12px" }}
          />
          <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#A8E6CF", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>➕ ثبت</button>
        </form>
      </section>

      <section style={{ backgroundColor: "#ffffff", padding: "16px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "12px", margin: "0 0 10px 0", textAlign: "right" }}>📜 لیست عادات شما:</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {habits.map((habit) => (
            <div key={habit.id} style={{ display: "flex", alignItems: "center", justifyItems: "space-between", padding: "8px", backgroundColor: "#f8fafc", borderRadius: "12px" }}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => setHabits(habits.map(h => h.id === habit.id ? { ...h, completed: !h.completed } : h))}
                style={{ marginLeft: "8px" }}
              />
              <span style={{ flexGrow: 1, textAlign: "right", fontSize: "12px", textDecoration: habit.completed ? "line-through" : "none" }}>{habit.title}</span>
              <button onClick={() => setHabits(habits.filter(h => h.id !== habit.id))} style={{ backgroundColor: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}>🗑️</button>
            </div>
          ))}
        </div>
      </section>

      <StatusBar habits={habits} focusMinutes={25} currentSeconds={null} mode="idle" />
    </div>
  );
}
