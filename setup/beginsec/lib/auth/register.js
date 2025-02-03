const response = await fetch("/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    telephone: "0812345678",
    username: "johndoe",
    dob: "1990-01-01",
  }),
});

const data = await response.json();
