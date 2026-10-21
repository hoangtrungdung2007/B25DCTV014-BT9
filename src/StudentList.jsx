// src/StudentList.jsx
export default function StudentList({ items, onRemove }) {
  if (items.length === 0) {
    return <p>Chưa có sinh viên</p>;
  }

  const handleDeleteClick = (sv) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sinh viên "${sv.name}"?`)) {
      onRemove(sv.id);
    }
  };

  return (
    <ul style={{ paddingLeft: "20px" }}>
      {items.map((sv) => (
        <li key={sv.id} style={{ marginBottom: "8px" }}>
          <strong>{sv.name}</strong> ({sv.email}) – Ngành: {sv.major} – GPA:{" "}
          {sv.gpa}{" "}
          <button
            onClick={() => handleDeleteClick(sv)}
            style={{ marginLeft: "10px", color: "crimson" }}
          >
            Xóa
          </button>
        </li>
      ))}
    </ul>
  );
}