// user.js: dashboard & form pendaftaran

document.addEventListener("DOMContentLoaded", () => {
  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    };
  }

  // Dashboard user
  if (window.location.pathname.endsWith("dashboard.html")) {
    loadUserDashboard();
  }

  // Form pendaftaran
  if (window.location.pathname.endsWith("form.html")) {
    const form = document.getElementById("registrationForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({ icon: "error", title: "Unauthorized", text: "Silakan login dulu." });
        return;
      }
      const formData = new FormData(form);
      const data = {
        division: formData.get("division"),
        motivation: formData.get("motivation"),
      };
      // Konfirmasi
      const confirm = await Swal.fire({
        title: "Kirim Pendaftaran?",
        text: "Pastikan data sudah benar dan CV sudah diupload.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Kirim",
        cancelButtonText: "Batal"
      });
      if (!confirm.isConfirmed) return;
      // Submit data pendaftaran
      try {
        const res = await fetch(`${URL_BASE}/api/registration`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Gagal daftar");
        // Upload CV
        const cvFile = formData.get("cv");
        if (cvFile && cvFile.size > 0) {
          const uploadData = new FormData();
          uploadData.append("cv", cvFile);
          const uploadRes = await fetch(`${URL_BASE}/api/upload/cv`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: uploadData
          });
          const uploadResult = await uploadRes.json();
          if (!uploadRes.ok) throw new Error(uploadResult.message || "Gagal upload CV");
        }
        Swal.fire({ icon: "success", title: "Pendaftaran Berhasil", text: "Data berhasil dikirim!", timer: 1800, showConfirmButton: false });
        setTimeout(() => window.location.href = "dashboard.html", 1900);
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: err.message });
      }
    });
  }
});

async function loadUserDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  // Info user
  const userInfo = document.getElementById("userInfo");
  const regInfo = document.getElementById("registrationInfo");
  try {
    const res = await fetch(`${URL_BASE}/api/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const user = await res.json();
    if (!res.ok) throw new Error(user.message || "Gagal ambil data user");
    userInfo.innerHTML = `<h2 class='font-bold text-xl mb-2'>Halo, ${user.name}</h2>
      <div>Email: <span class='text-gray-700'>${user.email}</span></div>
      <div>NIM: <span class='text-gray-700'>${user.nim}</span></div>
      <div>Role: <span class='text-gray-700 capitalize'>${user.role}</span></div>`;
    // Cek status pendaftaran
    const regRes = await fetch(`${URL_BASE}/api/registration`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (regRes.status === 404) {
      regInfo.innerHTML = `<div class='text-center'><p class='mb-2'>Kamu belum mendaftar.</p><a href='form.html' class='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>Daftar Sekarang</a></div>`;
    } else {
      const reg = await regRes.json();
      let statusColor = reg.status === "Lulus" ? "text-green-600" : reg.status === "Tidak Lulus" ? "text-red-600" : "text-yellow-600";
      regInfo.innerHTML = `<h3 class='font-semibold mb-2'>Status Pendaftaran</h3>
        <div>Divisi: <span class='text-gray-700'>${reg.division}</span></div>
        <div>Motivasi: <span class='text-gray-700'>${reg.motivation}</span></div>
        <div>Status: <span class='${statusColor} font-bold'>${reg.status || "Diproses"}</span></div>
        <div class='mt-2'>CV: <a href='${reg.cv_url || "#"}' class='text-blue-600 underline' target='_blank'>Lihat CV</a></div>`;
      if (reg.status === "Lulus" || reg.status === "Tidak Lulus") {
        Swal.fire({
          icon: reg.status === "Lulus" ? "success" : "error",
          title: `Kamu ${reg.status}`,
          text: reg.status === "Lulus" ? "Selamat, kamu diterima!" : "Maaf, kamu belum diterima.",
        });
      }
    }
  } catch (err) {
    userInfo.innerHTML = `<div class='text-red-600'>${err.message}</div>`;
    regInfo.innerHTML = "";
  }
}
