// src/useFetch.js
import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi HTTP: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Không thể tải dữ liệu từ server");
          setLoading(false);
        }
      });

    // Dọn dẹp (cleanup) khi url đổi hoặc component unmount
    return () => controller.abort();
  }, [url]); // deps đúng chuẩn theo yêu cầu

  return { data, setData, loading, error };
}