// js/main.js

window.onload = function() {
    const userData = getUserData();
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');

    if (userData) {
        // Tampilkan navigasi user, sembunyikan navigasi tamu
        guestNav.style.display = 'none';
        userNav.style.display = 'flex'; // 'flex' agar item sejajar

        // Atur link dashboard berdasarkan role
        const dashboardLink = document.getElementById('dashboard-link');
        dashboardLink.href = userData.role === 'admin' ? 'admin.html' : 'user.html';

        // Tampilkan pesan selamat datang
        document.getElementById('welcome-text').innerText = `Halo, ${userData.nim}`;
    } else {
        // Tampilkan navigasi tamu, sembunyikan navigasi user
        guestNav.style.display = 'block';
        userNav.style.display = 'none';
    }
}