// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Login gagal.');
            
            localStorage.setItem('pasetoToken', result.token);

            await Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                timer: 1500,
                showConfirmButton: false,
            });

            window.location.href = result.role === 'admin' ? 'admin.html' : 'user.html';

        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Login Gagal', text: error.message });
        }
    });
});