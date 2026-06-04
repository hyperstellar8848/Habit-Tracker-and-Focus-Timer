import React from "react";

// کامپوننت مجزا برای رندر کردن تک‌تک آیتم‌های لیست عادت‌ها
export function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700/60 shadow-sm hover:border-slate-600 transition duration-200">
      <div className="flex items-center space-x-3 space-x-reverse">
        {/* چک‌باکس برای تغییر وضعیت انجام شدن عادت */}
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => onToggle(habit.id)}
          className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
        />
        {/* متن عنوان عادت؛ در صورت انجام شدن، کلاس خط‌خورده اعمال می‌شود */}
        <span className={`text-base md:text-lg font-medium transition-all duration-350 ${habit.completed ? "line-through text-gray-500" : "text-gray-200"}`}>
          {habit.title}
        </span>
      </div>
      {/* دکمه حذف عادت */}
      <button
        onClick={() => onDelete(habit.id)}
        className="px-3 py-1.5 bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white rounded-lg text-sm font-medium transition duration-200"
      >
        حذف
      </button>
    </div>
  );
}
