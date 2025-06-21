// admin.js: dashboard admin

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    };
  }
  if (window.location.pathname.endsWith("admin.html")) {
    loadAdminTable();
  }
});

async function loadAdminTable() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  const tableContainer = document.getElementById("tableContainer");
  try {
    const res = await fetch(`${URL_BASE}/api/admin/registrations`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const regs = await res.json();
    if (!res.ok) throw new Error(regs.message || "Gagal ambil data pendaftar");
    let html = `<table class='min-w-full table-auto'><thead><tr class='bg-blue-100'>
      <th class='px-4 py-2'>Nama</th>
      <th class='px-4 py-2'>NIM</th>
      <th class='px-4 py-2'>Divisi</th>
      <th class='px-4 py-2'>Status</th>
      <th class='px-4 py-2'>Aksi</th>
    </tr></thead><tbody>`;
    regs.forEach(reg => {
      html += `<tr class='border-b'>
        <td class='px-4 py-2'>${reg.user_name || "-"}</td>
        <td class='px-4 py-2'>${reg.user_nim || "-"}</td>
        <td class='px-4 py-2'>${reg.division}</td>
        <td class='px-4 py-2'>${reg.status || "Diproses"}</td>
        <td class='px-4 py-2 space-x-2'>
          <button onclick='showDetail("${reg._id}")' class='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs'>Detail</button>
          <button onclick='updateStatus("${reg._id}", "Lulus")' class='px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs'>Lulus</button>
          <button onclick='updateStatus("${reg._id}", "Tidak Lulus")' class='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs'>Tidak Lulus</button>
        </td>
      </tr>`;
    });
    html += `</tbody></table>`;
    tableContainer.innerHTML = html;
  } catch (err) {
    tableContainer.innerHTML = `<div class='text-red-600'>${err.message}</div>`;
  }
}

window.showDetail = async function(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${URL_BASE}/api/admin/registration/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const reg = await res.json();
    if (!res.ok) throw new Error(reg.message || "Gagal ambil detail");
    Swal.fire({
      title: reg.user_name,
      html: `<div class='text-left'>
        <div><b>NIM:</b> ${reg.user_nim}</div>
        <div><b>Email:</b> ${reg.user_email}</div>
        <div><b>Divisi:</b> ${reg.division}</div>
        <div><b>Motivasi:</b> ${reg.motivation}</div>
        <div><b>Status:</b> ${reg.status || "Diproses"}</div>
        <div><b>CV:</b> <a href='${reg.cv_url || "#"}' target='_blank' class='text-blue-600 underline'>Lihat CV</a></div>
      </div>`,
      showCloseButton: true
    });
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  }
}

window.updateStatus = async function(id, status) {
  const token = localStorage.getItem("token");
  const confirm = await Swal.fire({
    title: `Ubah status ke ${status}?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Batal"
  });
  if (!confirm.isConfirmed) return;
  try {
    const res = await fetch(`${URL_BASE}/api/admin/registration/${id}/status`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Gagal update status");
    Swal.fire({ icon: "success", title: "Status diperbarui" });
    loadAdminTable();
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  }
}
