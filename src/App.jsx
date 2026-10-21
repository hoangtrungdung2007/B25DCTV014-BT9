// src/App.jsx
import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { useFetch } from "./useFetch";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import ClockSection from "./ClockSection";

const MOCK_API_URL = "https://jsonplaceholder.typicode.com/users";

function MainApp() {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Đọc danh sách đã lưu trong máy tính trước (nếu có)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students_data");
    return saved ? JSON.parse(saved) : null;
  });

  // Gọi API để lấy dữ liệu ban đầu nếu trong máy chưa có
  const { data: apiData, loading, error } = useFetch(students ? null : MOCK_API_URL);

  // Nếu trong máy chưa có dữ liệu và API tải xong -> gán dữ liệu mẫu lần đầu
  useEffect(() => {
    if (!students && apiData && apiData.length > 0) {
      const initialList = apiData.map((item) => ({
        id: String(item.id),
        name: item.name || "Chưa có tên",
        email: item.email || "test@ptit.edu.vn",
        major: "CNTT",
        gpa: 3.2,
      }));
      setStudents(initialList);
    }
  }, [apiData, students]);

  // Bất cứ khi nào thêm/xóa sinh viên -> tự động lưu vào localStorage
  useEffect(() => {
    if (students) {
      localStorage.setItem("students_data", JSON.stringify(students));
    }
  }, [students]);

  const handleAddStudent = (newSv) => {
    setStudents((prev) => [newSv, ...(prev || [])]);
  };

  const handleRemoveStudent = (id) => {
    setStudents((prev) => (prev || []).filter((sv) => String(sv.id) !== String(id)));
  };

  const currentList = students || [];
  const filteredStudents = currentList.filter((sv) =>
    sv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Quản lý sinh viên (Hooks)</h2>
        <button onClick={toggleTheme} style={{ cursor: "pointer", padding: "6px 12px" }}>
          Giao diện: {theme === "light" ? "🌙 Tối" : "🌞 Sáng"}
        </button>
      </header>

      {/* Bài 1: Quản lý sinh viên */}
      <StudentForm onAdd={handleAddStudent} />

      <div style={{ margin: "16px 0" }}>
        <label>Tìm kiếm theo tên: </label>
        <input
          type="text"
          placeholder="Nhập tên cần tìm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h4>Danh sách sinh viên:</h4>
      {loading && !students && <p>⏳ Đang tải danh sách từ API...</p>}
      {error && !students && <p style={{ color: "orange" }}>⚠️ Lỗi tải: {error}</p>}
      
      <StudentList items={filteredStudents} onRemove={handleRemoveStudent} />

      {/* Bài 2: Đồng hồ */}
      <ClockSection />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}