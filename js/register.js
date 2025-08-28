// js/register.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.password_confirmation) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password dan Konfirmasi Password tidak cocok!' });
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    nim: data.nim,
                    birth_place: data.birth_place,
                    birth_date: data.birth_date,
                    email: data.email,
                    phone_number: data.phone_number, // <-- PERBAIKAN DI SINI
                    password: data.password
                }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Pendaftaran gagal.');

            await Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Berhasil!',
                text: 'Akun Anda telah dibuat. Silakan login.',
                timer: 2000,
                showConfirmButton: false,
            });

            window.location.href = 'login.html';

        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Pendaftaran Gagal', text: error.message });
        }
    });
});