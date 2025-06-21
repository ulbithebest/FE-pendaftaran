// auth.js: login & register handler

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = new FormData(loginForm);
      const data = {
        email: form.get("email"),
        password: form.get("password"),
      };
      try {
        const res = await fetch(`${URL_BASE}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("token", result.token);
          Swal.fire({ icon: "success", title: "Login Berhasil", timer: 1500, showConfirmButton: false });
          setTimeout(() => window.location.href = "dashboard.html", 1600);
        } else {
          Swal.fire({ icon: "error", title: "Login Gagal", text: result.message || "Email atau password salah" });
        }
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: "Gagal login. Coba lagi." });
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = new FormData(registerForm);
      const data = {
        name: form.get("name"),
        nim: form.get("nim"),
        email: form.get("email"),
        password: form.get("password"),
      };
      try {
        const res = await fetch(`${URL_BASE}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          Swal.fire({ icon: "success", title: "Registrasi Berhasil", text: "Silakan login!", timer: 1800, showConfirmButton: false });
          setTimeout(() => window.location.href = "login.html", 1900);
        } else {
          Swal.fire({ icon: "error", title: "Registrasi Gagal", text: result.message || "Data tidak valid" });
        }
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: "Gagal register. Coba lagi." });
      }
    });
  }
});
