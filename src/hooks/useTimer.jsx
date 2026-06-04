import { useState, useEffect, useRef } from "react";

export function useTimer(
  habits, 
  setHabits, 
  selectedHabitId, 
  defaultFocusMinutes = 25, 
  defaultBreakMinutes = 5
) {
  const [focusMinutes, setFocusMinutes] = useState(() => {
    const saved = localStorage.getItem("pomo_focus_minutes");
    return saved ? Number(saved) : defaultFocusMinutes;
  });

  const [breakMinutes, setBreakMinutes] = useState(() => {
    const saved = localStorage.getItem("pomo_break_minutes");
    return saved ? Number(saved) : defaultBreakMinutes;
  });

  const [mode, setMode] = useState(() => localStorage.getItem("pomo_mode") || "focus");

  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("pomo_seconds_left");
    if (savedSeconds) return Number(savedSeconds);
    return mode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
  });

  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("pomo_is_active") === "true";
  });

  const [isPrepping, setIsPrepping] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const intervalRef = useRef(null);
  const prepIntervalRef = useRef(null);

  // ذخیره وضعیت‌ها در لوکال استوریج
  useEffect(() => {
    localStorage.setItem("pomo_focus_minutes", focusMinutes);
    localStorage.setItem("pomo_break_minutes", breakMinutes);
    localStorage.setItem("pomo_mode", mode);
    localStorage.setItem("pomo_seconds_left", seconds);
    localStorage.setItem("pomo_is_active", isActive ? "true" : "false");
  }, [focusMinutes, breakMinutes, mode, seconds, isActive]);

  const start = () => {
    if (isActive || isPrepping) return;
    setShowMessage(false);
    
    const savedSeconds = localStorage.getItem("pomo_seconds_left");
    const defaultSecs = mode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
    
    // اگر زمان باقیمانده‌ای از قبل وجود داشته باشد، بدون کانت‌داون ۳ ثانیه‌ای ادامه می‌دهد
    if (savedSeconds && Number(savedSeconds) < defaultSecs && Number(savedSeconds) > 0) {
      setIsActive(true);
    } else {
      setIsPrepping(true);
      setPrepCountdown(3);
    }
  };

  // شمارش معکوس آمادگی ۳ ثانیه‌ای
  useEffect(() => {
    if (isPrepping && prepCountdown > 0) {
      prepIntervalRef.current = setInterval(() => {
        setPrepCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(prepIntervalRef.current);
            setIsPrepping(false);
            setIsActive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(prepIntervalRef.current);
  }, [isPrepping, prepCountdown]);

  // چرخه اصلی شمارش معکوس تایمر
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setShowMessage(true);

            if (mode === "focus") {
              const totalDoneSessions = Number(localStorage.getItem("pomo_completed_sessions_counter") || 0);
              localStorage.setItem("pomo_completed_sessions_counter", totalDoneSessions + 1);

              if (selectedHabitId && setHabits) {
                setHabits((prevHabits) =>
                  prevHabits.map((h) =>
                    h.id === selectedHabitId ? { ...h, completed: true } : h
                  )
                );
              }
            }

            const nextMode = mode === "focus" ? "break" : "focus";
            setMode(nextMode);
            return nextMode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, mode, focusMinutes, breakMinutes, selectedHabitId, setHabits]);

  // متد توقف: فقط ثانیه‌شمار را فریز می‌کند و هیچ مقداری را ریست نمی‌کند
  const pause = () => {
    setIsActive(false);
    setIsPrepping(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (prepIntervalRef.current) clearInterval(prepIntervalRef.current);
  };

  // متد ریست: زمان پیش‌فرض هر مود را دقیقاً اعمال می‌کند
  const reset = (targetMode = mode) => {
    setIsActive(false);
    setIsPrepping(false);
    setShowMessage(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (prepIntervalRef.current) clearInterval(prepIntervalRef.current);
    
    const defaultSecs = targetMode === "focus" ? focusMinutes * 60 : breakMinutes * 60;
    setSeconds(defaultSecs);
    localStorage.setItem("pomo_seconds_left", defaultSecs);
  };

  return {
    seconds, isActive, mode, focusMinutes, setFocusMinutes,
    breakMinutes, setBreakMinutes, start, pause, reset, prepCountdown, isPrepping,
    showMessage, setShowMessage, setMode
  };
}
