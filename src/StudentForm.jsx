// src/StudentForm.jsx
import { useState } from "react";

export default function StudentForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    major: "CNTT",
    gpa: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 3) {
      e.name = "Họ tên tối thiểu 3 ký tự";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Email không hợp lệ";
    }
    const gpaNum = parseFloat(form.gpa);
    if (form.gpa === "" || isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      e.gpa = "GPA phải là số từ 0 đến 4";
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onAdd({
      id: String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      major: form.major,
      gpa: parseFloat(form.gpa),
    });

    // Reset form sau khi thêm thành công
    setForm({ name: "", email: "", major: "CNTT", gpa: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Thêm sinh viên</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Họ tên: </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nguyễn Văn An"
        />
        {errors.name && (
          <p style={{ color: "red", margin: "4px 0", fontSize: "13px" }}>
            {errors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email: </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="an@ptit.edu.vn"
        />
        {errors.email && (
          <p style={{ color: "red", margin: "4px 0", fontSize: "13px" }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Ngành: </label>
        <select name="major" value={form.major} onChange={handleChange}>
          <option value="CNTT">CNTT</option>
          <option value="ATTT">ATTT</option>
          <option value="DTVT">ĐTVT</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>GPA (0 - 4): </label>
        <input
          type="number"
          step="0.1"
          name="gpa"
          value={form.gpa}
          onChange={handleChange}
          placeholder="3.5"
        />
        {errors.gpa && (
          <p style={{ color: "red", margin: "4px 0", fontSize: "13px" }}>
            {errors.gpa}
          </p>
        )}
      </div>

      <button type="submit">Thêm</button>
    </form>
  );
}