export async function registerUser(userData) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "สมัครสมาชิกไม่สำเร็จ");
    }

    return data;
  } catch (error) {
    throw new Error(error || "รบกวนสมัครใหม่ในภายหลัง");
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "เข้าสู่ระบบไม่สำเร็จ");
    }

    return data;
  } catch (error) {
    throw new Error(error || "กรุณาลองใหม่อีกครั้ง");
  }
}
