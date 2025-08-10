import React, { useState } from "react";
import "./App.css";

interface SinhVien {
  maSV: string;
  hoTen: string;
  email: string;
  ngaySinh: string;
  gioiTinh: string;
  ghiChu: string;
}

const StudentManager: React.FC = () => {
  const [form, setForm] = useState<SinhVien>({
    maSV: "",
    hoTen: "",
    email: "",
    ngaySinh: "",
    gioiTinh: "",
    ghiChu: ""
  });
  const [students, setStudents] = useState<SinhVien[]>([
    {
      maSV: "2251161938",
      hoTen: "Lê Thị Phương Anh",
      email: "phuonganh@gmail.com",
      ngaySinh: "2004-02-09",
      gioiTinh: "Nữ",
      ghiChu: ""
    },
    {
      maSV: "2251161950",
      hoTen: "Lê Thị Trà My",
      email: "tramy@gmail.com",
      ngaySinh: "2002-01-01",
      gioiTinh: "Nữ",
      ghiChu: ""
    }
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "" }>({
    message: "",
    type: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.maSV || !form.hoTen || !form.email || !form.gioiTinh) {
      showToast("❌ Vui lòng điền đầy đủ thông tin!", "error");
      return false;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      showToast("❌ Email không hợp lệ!", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (selectedIndex === null) {
      setStudents([...students, form]);
      showToast("✅ Thêm sinh viên thành công!", "success");
    } else {
      const updated = [...students];
      updated[selectedIndex] = form;
      setStudents(updated);
      setSelectedIndex(null);
      showToast("✅ Cập nhật sinh viên thành công!", "success");
    }
    setForm({
      maSV: "",
      hoTen: "",
      email: "",
      ngaySinh: "",
      gioiTinh: "",
      ghiChu: ""
    });
  };

  const handleEdit = (index: number) => {
    setForm(students[index]);
    setSelectedIndex(index);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Bạn có chắc muốn xoá sinh viên này?")) {
      setStudents(students.filter((_, i) => i !== index));
      showToast("🗑️ Xoá thành công!", "success");
    }
  };

  const showToast = (message: string, type: "error" | "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 1500);
  };

  return (
    <div>
      {toast.message && (
        <div className={`toast ${toast.type === "error" ? "error" : ""}`} style={{ display: "flex" }}>
          {toast.message}
        </div>
      )}

      <nav className="navbar">Quản lý sinh viên</nav>
      <div className="container">
        {/* FORM */}
        <div className="card form-card">
          <h2 style={{ textAlign: "center" }}>Form Thêm sinh viên</h2>
          <form onSubmit={handleSubmit}>
            <label>Mã sinh viên:</label>
            <input
              type="text"
              name="maSV"
              value={form.maSV}
              onChange={handleChange}
            />
            <label>Họ và tên:</label>
            <input
              type="text"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <label>Ngày sinh:</label>
            <input
              type="date"
              name="ngaySinh"
              value={form.ngaySinh}
              onChange={handleChange}
            />
            <label>Giới tính:</label>
            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="Nam"
                  checked={form.gioiTinh === "Nam"}
                  onChange={handleChange}
                />{" "}
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="Nữ"
                  checked={form.gioiTinh === "Nữ"}
                  onChange={handleChange}
                />{" "}
                Nữ
              </label>
            </div>
            <label>Ghi chú:</label>
            <textarea
              name="ghiChu"
              rows={3}
              value={form.ghiChu}
              onChange={handleChange}
            ></textarea>
            <div className="button-center">
              <button type="submit">
                {selectedIndex === null ? "Thêm sinh viên" : "Cập nhật"}
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="card table-card">
          <h2 style={{ textAlign: "center" }}>Danh sách sinh viên</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((sv, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{sv.maSV}</td>
                  <td>{sv.hoTen}</td>
                  <td>{sv.email}</td>
                  <td>{sv.gioiTinh}</td>
                  <td>{sv.ngaySinh}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(i)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(i)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={7}>Chưa có sinh viên nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
