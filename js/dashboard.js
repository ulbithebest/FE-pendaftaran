// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    const menuToggle = document.getElementById('menu-toggle');

    if (sidebar && menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            // Tambahan: agar konten tidak tertimpa saat sidebar muncul di layar kecil
            if (!sidebar.classList.contains('-translate-x-full')) {
                mainContent.classList.add('lg:ml-64');
            }
        });
    }
});