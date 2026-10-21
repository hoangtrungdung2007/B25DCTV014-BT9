// src/ClockSection.jsx
import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log("[Lifecycle - Hooks] Clock mounted (componentDidMount)");

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      console.log("[Lifecycle - Hooks] Clock unmounted (componentWillUnmount) -> clearInterval");
      clearInterval(timer);
    };
  }, []); // Mảng rỗng: chỉ chạy khi mount và dọn dẹp khi unmount

  return <h2>⏰ {time.toLocaleTimeString()}</h2>;
}

export default function ClockSection() {
  const [showClock, setShowClock] = useState(true);
  const [count, setCount] = useState(0);

  // Tương đương componentDidUpdate khi state count thay đổi
  useEffect(() => {
    console.log(`[Lifecycle - Hooks] count updated (componentDidUpdate): ${count}`);
    document.title = `Đã bấm ${count} lần`;
  }, [count]);

  return (
    <div style={{ borderTop: "1px solid #888", marginTop: "28px", paddingTop: "16px" }}>
      <h3>Bài 2: Đồng hồ & Lifecycle (Hooks)</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <button onClick={() => setShowClock((prev) => !prev)}>
          {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>

        <button onClick={() => setCount((prev) => prev + 1)}>
           Đổi Title (Đã bấm {count} lần)
        </button>
      </div>

      {showClock && <Clock />}
    </div>
  );
}