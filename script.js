// Fungsi Navigasi
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Login avatar click functionality
    const loginAvatar = document.getElementById('login-avatar');
    if (loginAvatar) {
        loginAvatar.addEventListener('click', function() {
            showLoginPage();
        });
        
        // Tambahkan cursor pointer untuk indikasi bisa diklik
        loginAvatar.style.cursor = 'pointer';
    }
    
    // Logo click functionality 
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            showLoginPage();
        });
        logo.style.cursor = 'pointer';
    }
});

// Function to show login page
function showLoginPage() {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    
    if (authContainer && appContainer) {
        authContainer.style.display = 'flex';
        appContainer.style.display = 'none';
        
        const loginTab = document.querySelector('.tab-btn[data-tab="login"]');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        
        if (loginTab && loginForm && signupForm) {
            // Update tabs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            loginTab.classList.add('active');
            
            // Update forms
            authForms.forEach(form => form.classList.remove('active'));
            loginForm.classList.add('active');
        }
    }
}

// Function to show main application
function showApp() {
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    
    if (authContainer && appContainer) {
        authContainer.style.display = 'none';
        appContainer.style.display = 'flex';
        
        // Update user info display
        updateUserDisplay();
    }
}

// Login
function updateUserDisplay() {
    if (currentUser) {
        const userNameDisplay = document.getElementById('user-name-display');
        const userRoleDisplay = document.getElementById('user-role-display');
        
        if (userNameDisplay) {
            userNameDisplay.textContent = currentUser.name;
        }
        
        if (userRoleDisplay) {
            userRoleDisplay.textContent = currentUser.role === 'admin' ? 'Administrator' : 'Participant';
            userRoleDisplay.style.background = currentUser.role === 'admin' ? '#e74c3c' : '#3498db';
        }
        
        const adminTambahEvent = document.getElementById('admin-tambah-event');
        const adminParticipant = document.getElementById('admin-participant');
        const userRegistrasi = document.getElementById('user-registrasi');
        
        if (currentUser.role === 'admin') {
            if (adminTambahEvent) adminTambahEvent.style.display = 'block';
            if (adminParticipant) adminParticipant.style.display = 'block';
            if (userRegistrasi) userRegistrasi.style.display = 'none';
        } else {
            if (adminTambahEvent) adminTambahEvent.style.display = 'none';
            if (adminParticipant) adminParticipant.style.display = 'none';
            if (userRegistrasi) userRegistrasi.style.display = 'block';
        }
    }
}

// Login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const userType = document.getElementById('user-type').value;
        
        // Simple validation
        if (!email || !password || !userType) {
            alert('Harap lengkapi semua field!');
            return;
        }
        
        // Check user credentials
        const user = users.find(u => u.email === email && u.password === password && u.role === userType);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showApp();
            alert(`Login berhasil! Selamat datang, ${user.name}`);
        } else {
            alert('Email, password, atau tipe user salah!');
        }
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            currentUser = null;
            localStorage.removeItem('currentUser');
            showLoginPage();
            alert('Anda telah berhasil logout.');
        }
    });
}

// Signup form submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const userType = document.getElementById('signup-user-type').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        // Validation
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }
        
        if (!agreeTerms) {
            alert('Anda harus menyetujui syarat dan ketentuan!');
            return;
        }
        
        // Check if email already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            alert('Email sudah terdaftar!');
            return;
        }
        
        // Create new user (in real app, this would be sent to server)
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            phone: phone,
            password: password,
            role: userType
        };
        
        users.push(newUser);
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        showApp();
        alert(`Pendaftaran berhasil! Selamat datang, ${name}`);
    });
}

    // Submit
    const eventForm = document.querySelector('.event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Event berhasil disimpan!');
        });
    }
    
    const registrationForm = document.querySelector('.registration-form form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registrasi berhasil! Konfirmasi akan dikirim melalui email.');
        });
    }
    
    // Fungsi Search Untuk Tabel participant
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.participant-table tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Fungsi Filter Untuk Tabel participant
    const filterSelect = document.querySelector('.filter-options select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filterValue = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.participant-table tbody tr');
            
            tableRows.forEach(row => {
                const eventCell = row.cells[3].textContent.toLowerCase();
                if (filterValue === '' || eventCell.includes(filterValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Fungsi Hapus participant
    const deleteButtons = document.querySelectorAll('.btn-action .fa-trash');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
                const row = this.closest('tr');
                row.remove();
                alert('Peserta berhasil dihapus!');
            }
        });
    });
});