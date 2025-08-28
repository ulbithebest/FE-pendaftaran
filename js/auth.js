// js/auth.js

function getToken() {
    return localStorage.getItem('pasetoToken');
}

function logout() {
    localStorage.removeItem('pasetoToken');
    window.location.href = 'login.html';
}

async function fetchUserData() {
    const token = getToken();
    if (!token) {
        return null;
    }

    try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Token tidak valid atau sesi berakhir.');
            logout();
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Gagal terhubung ke server:', error);
        return null;
    }
}