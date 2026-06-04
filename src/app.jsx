import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { HabitsPage } from "./pages/HabitsPage";
import { Analytics } from "./pages/Analytics";
import { NotFound } from "./pages/NotFound";

function App() {
  const [habits, setHabits] = useLocalStorage("habits_data_pomo", []);
  const [selectedHabitId, setSelectedHabitId] = useLocalStorage("selected_habit_id_pomo", null);

  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#F4F7F6", paddingBottom: "30px" }}>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  habits={habits}
                  setHabits={setHabits}
                  selectedHabitId={selectedHabitId}
                  setSelectedHabitId={setSelectedHabitId}
                />
              }
            />
            <Route
              path="/habits"
              element={<HabitsPage habits={habits} setHabits={setHabits} />}
            />
            <Route
              path="/analytics"
              element={<Analytics habits={habits} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
