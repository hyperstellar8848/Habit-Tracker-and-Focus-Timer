import { useState, useEffect } from "react";

// این هوک سفارشی برای مدیریت داده‌ها در حافظه مرورگر ساخته شده است
export function useLocalStorage(key, initialValue) {
  // مقداردهی اولیه استیت؛ ابتدا بررسی می‌کند آیا داده‌ای از قبل وجود دارد یا خیر
  const [value, setValue] = useState(() => {
    try {
      // تلاش برای خواندن داده از لوکال استوریج با کلید مشخص شده
      const localValue = window.localStorage.getItem(key);
      // اگر داده وجود داشت، آن را از حالت رشته متنی خارج کرده و برمی‌گرداند، در غیر این صورت مقدار اولیه را اعمال می‌کند
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (error) {
      // در صورت بروز هرگونه خطا، مقدار اولیه بازگردانده می‌شود
      console.error(error);
      return initialValue;
    }
  });

  // افکتی که با هر بار تغییر کلید یا مقدار استیت، داده‌ی جدید را در لوکال استوریج ذخیره می‌کند
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]); // وابستگی‌ها: کلید و مقدار استیت

  // خروجی هوک مانند هوک معمولی یو اس‌استیت به صورت آرایه‌ای شامل مقدار و تابع تغییر مقدار است
  return [value, setValue];
}
