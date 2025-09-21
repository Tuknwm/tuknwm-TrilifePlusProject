document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    const currentSectionSpan = document.querySelector('.current-section');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const navLinks = document.querySelectorAll('.Nav');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.Card');
    const timeline = document.getElementById('timeline');
    const loginLink = document.querySelector('.login-link');
    const mobileLoginLink = document.querySelector('.mobile-nav-item.login-link');

    updateNavbar();
    
    window.addEventListener('storage', (e) => {
        if (e.key === 'currentUser') {
            updateNavbar();
        }
    });

    function updateNavbar() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && loginLink) {
            loginLink.textContent = currentUser.nama;
            loginLink.href = '#';
            loginLink.classList.add('user-name');
            
            if (mobileLoginLink) {
                mobileLoginLink.textContent = currentUser.nama;
                mobileLoginLink.href = '#';
                mobileLoginLink.classList.add('user-name');
            }
            
            setupLogoutHandler(loginLink, mobileLoginLink);
        } else {
            if (loginLink) {
                loginLink.textContent = 'Login';
                loginLink.href = 'LoginPage.html';
                loginLink.classList.remove('user-name', 'logout-state');
                loginLink.style.color = '';
                
                const newLoginLink = loginLink.cloneNode(true);
                loginLink.parentNode.replaceChild(newLoginLink, loginLink);
            }
            
            if (mobileLoginLink) {
                mobileLoginLink.textContent = 'Login';
                mobileLoginLink.href = 'LoginPage.html';
                mobileLoginLink.classList.remove('user-name', 'logout-state');
                mobileLoginLink.style.color = '';
                
                const newMobileLoginLink = mobileLoginLink.cloneNode(true);
                mobileLoginLink.parentNode.replaceChild(newMobileLoginLink, mobileLoginLink);
            }
        }
    }

    function setupLogoutHandler(desktopLink, mobileLink) {
        if (desktopLink) {
            desktopLink.addEventListener('click', handleToggleLogout);
        }
        
        if (mobileLink) {
            mobileLink.addEventListener('click', handleToggleLogout);
        }
    }

    function handleToggleLogout(e) {
        e.preventDefault();
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const loginLink = document.querySelector('a[href="#"], .Nav.user-name');
        const mobileLoginLink = document.querySelector('.mobile-nav-item[href="#"]');

        if (loginLink && loginLink.textContent === 'Logout') {
            localStorage.removeItem('currentUser');
            showLogoutMessage();
            updateNavbar();
        } else {
            if (loginLink) {
                loginLink.textContent = 'Logout';
                loginLink.classList.add('logout-state');
                loginLink.style.color = 'red';
            }
            if (mobileLoginLink) {
                mobileLoginLink.textContent = 'Logout';
                mobileLoginLink.classList.add('logout-state');
                mobileLoginLink.style.color = 'red';
            }

            setTimeout(() => {
                const stillLogout = loginLink && loginLink.textContent === 'Logout';
                if (stillLogout && currentUser) {
                    loginLink.textContent = currentUser.nama;
                    loginLink.style.color = '';
                    mobileLoginLink.textContent = currentUser.nama;
                    mobileLoginLink.style.color = '';
                }
            }, 3000);
        }
    }

    function showLogoutMessage() {
        const successMessage = document.createElement('div');
        successMessage.id = 'logoutSuccessMessage';
        successMessage.innerHTML = '✅ Berhasil logout! Sampai jumpa lagi.';
        
        Object.assign(successMessage.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: '#28a745',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: '2000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            fontSize: '14px'
        });

        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 300);
        }, 3000);
    }

    window.updateNavbar = updateNavbar;

    const restrictedPages = ['AsuransiMobil.html', 'AsuransiJiwa.html', 'AsuransiKesehatan.html'];
    const currentPage = window.location.pathname.split('/').pop();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (restrictedPages.includes(currentPage) && !currentUser) {
        showLoginPrompt();
    }

    function showLoginPrompt() {
        const overlay = document.createElement('div');
        overlay.id = 'loginOverlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        const prompt = document.createElement('div');
        prompt.style.backgroundColor = '#fff';
        prompt.style.padding = '20px';
        prompt.style.borderRadius = '8px';
        prompt.style.textAlign = 'center';
        prompt.style.width = '250px';
        prompt.innerHTML = `
            <p style="margin-bottom: 40px; display: flex; text-align: center; align-items: center; justify-content: center; color: black;">Sebelum lebih lanjut, <br>yuk login dulu!</p>
            <button onclick="window.location.href='LoginPage.html'" style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Login</button>
        `;
        overlay.appendChild(prompt);
        document.body.appendChild(overlay);
    }

    const toggleMobileMenu = () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        header.classList.toggle('active');
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const sectionName = e.target.getAttribute('data-section') || 
                                e.target.getAttribute('href').substring(1);
            if (currentSectionSpan) {
                currentSectionSpan.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
            }
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('active');
        }
    });

    const updateActiveNav = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const sectionName = id.charAt(0).toUpperCase() + id.slice(1);

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                mobileNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });

                if (currentSectionSpan) {
                    currentSectionSpan.textContent = sectionName;
                }
            }
        });
    };

    const observer = new IntersectionObserver(updateActiveNav, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
    document.addEventListener('contextmenu', (e) => e.preventDefault());
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (typeof window.updateNavbar === 'function') {
                window.updateNavbar();
            }
            window.location.href = 'LandingPage.html';
        } else {
            alert('Email atau password salah!');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const telepon = document.getElementById("telepon").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!nama || !telepon || !email || !password || !confirmPassword) {
            alert("Semua field wajib diisi!");
            return;
        }

        const namaRegex = /^[A-Za-z\s]{3,32}$/;
        if (!namaRegex.test(nama)) {
            alert("Nama lengkap harus 3-32 karakter dan tidak boleh mengandung angka.");
            return;
        }

        const hpRegex = /^08[0-9]{8,14}$/;
        if (!hpRegex.test(telepon)) {
            alert("Nomor HP harus dimulai dengan 08, hanya angka, dan panjang 10-16 digit.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Format email tidak valid!");
            return;
        }

        if (password.length < 8) {
            alert("Password minimal 8 karakter.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Konfirmasi password tidak sesuai!");
            return;
        }

        alert("Pendaftaran berhasil!");

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            alert("Email sudah terdaftar!");
            return;
        }

        users.push({ nama, telepon, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "LoginPage.html";
    });
});

const carInsuranceForm = document.getElementById('mobilForm');
if (carInsuranceForm) {
    carInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            merk: document.getElementById('merk').value,
            jenis: document.getElementById('jenis').value,
            tahun: document.getElementById('tahun').value,
            harga: document.getElementById('harga').value,
            plat: document.getElementById('plat').value,
            mesin: document.getElementById('mesin').value,
            rangka: document.getElementById('rangka').value,
            pemilik: document.getElementById('pemilik').value,
            fotoDepan: document.getElementById('fotoDepan')?.files[0]?.name || '',
            fotoBelakang: document.getElementById('fotoBelakang')?.files[0]?.name || '',
            fotoKiri: document.getElementById('fotoKiri')?.files[0]?.name || '',
            fotoKanan: document.getElementById('fotoKanan')?.files[0]?.name || '',
            fotoDashboard: document.getElementById('fotoDashboard')?.files[0]?.name || '',
            fotoMesin: document.getElementById('fotoMesin')?.files[0]?.name || ''
        };
        if (!formData.merk || !formData.jenis || !formData.tahun || !formData.harga || 
            !formData.plat || !formData.mesin || !formData.rangka || !formData.pemilik) {
            alert('Semua field wajib diisi!');
            return;
        }
        const currentYear = new Date().getFullYear();
        if (formData.tahun < 1900 || formData.tahun > currentYear) {
            alert('Tahun pembuatan tidak valid!');
            return;
        }
        if (formData.harga <= 0) {
            alert('Harga mobil harus lebih dari 0!');
            return;
        }
        localStorage.setItem('carInsuranceData', JSON.stringify(formData));
        localStorage.setItem('insuranceType', 'car');
        window.location.href = 'CheckOut.html';
    });
}

const healthInsuranceForm = document.getElementById('KesehatanForm');
if (healthInsuranceForm) {
    healthInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            nama: document.getElementById('nama').value,
            tanggalLahir: document.getElementById('tanggalLahir').value,
            pekerjaan: document.getElementById('pekerjaan').value,
            merokok: document.getElementById('merokok').value,
            hipertensi: document.getElementById('hipertensi').value,
            diabetes: document.getElementById('diabetes').value
        };
        if (!formData.nama || !formData.tanggalLahir || !formData.pekerjaan || 
            !formData.merokok || !formData.hipertensi || !formData.diabetes) {
            alert('Semua field wajib diisi!');
            return;
        }
        localStorage.setItem('healthInsuranceData', JSON.stringify(formData));
        localStorage.setItem('insuranceType', 'health');
        window.location.href = 'CheckOut.html';
    });
}

const lifeInsuranceForm = document.getElementById('FormJiwa');
if (lifeInsuranceForm) {
    lifeInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            nama: document.getElementById('nama').value,
            tanggalLahir: document.getElementById('tanggalLahir').value,
            tanggungan: document.getElementById('tanggungan').value
        };
        if (!formData.nama || !formData.tanggalLahir || !formData.tanggungan) {
            alert('Semua field wajib diisi!');
            return;
        }
        localStorage.setItem('lifeInsuranceData', JSON.stringify(formData));
        localStorage.setItem('insuranceType', 'life');
        window.location.href = 'CheckOut.html';
    });
}
