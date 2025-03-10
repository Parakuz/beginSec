export function validateRegistration({
  name,
  email,
  password,
  confirmPassword,
}) {
  if (!name || !email || !password || !confirmPassword) {
    return "กรุณากรอกข้อมูลให้ครบทุกช่อง";
  }

  if (password.length < 8) {
    return "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
  }

  if (password !== confirmPassword) {
    return "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน";
  }

  return null; //pass
}

export function validateLogin({ email, password }) {
  if (!email || !password) {
    return "กรุณากรอกอีเมลและรหัสผ่าน";
  }

  return null; // pass
}
