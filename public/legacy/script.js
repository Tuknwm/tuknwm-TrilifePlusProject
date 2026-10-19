document.addEventListener('DOMContentLoaded', () => {
    initializeCleanFormControls();

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

    let originalNavHTML = null;
    let isLoggedInNav = false;

    updateNavbar();

    window.addEventListener('storage', (e) => {
        if (e.key === 'currentUser') {
            updateNavbar();
        }
    });

    function updateNavbar() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const nav = document.querySelector('.navbar');
        if (!nav) return;

        if (originalNavHTML === null) {
            originalNavHTML = nav.innerHTML;
        }

        if (currentUser) {
            if (isLoggedInNav) return;
            isLoggedInNav = true;

            nav.innerHTML = `
                <a href="/dashboard" class="Nav">Beranda</a>
                <a href="AsuransiKesehatan.html" class="Nav">Asuransi Kesehatan</a>
                <a href="AsuransiJiwa.html" class="Nav">Asuransi Jiwa</a>
                <a href="AsuransiMobil.html" class="Nav">Asuransi Mobil</a>
                <a href="HistoryUser.html" class="Nav">History</a>
                <a href="#" class="Nav login-link user-name">${currentUser.nama}</a>
            `;

            const userLink = nav.querySelector('.user-name');
            let logoutTimeout = null;

            userLink.addEventListener('click', e => {
                e.preventDefault();
                if (userLink.textContent === 'Logout') {
                    clearTimeout(logoutTimeout);
                    localStorage.removeItem('currentUser');
                    isLoggedInNav = false;
                    showLogoutMessage();
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    userLink.textContent = 'Logout';
                    userLink.style.color = '#f87171';
                    logoutTimeout = setTimeout(() => {
                        if (userLink.textContent === 'Logout') {
                            userLink.textContent = currentUser.nama;
                            userLink.style.color = '';
                        }
                    }, 3000);
                }
            });
        } else {
            if (!isLoggedInNav) return;
            isLoggedInNav = false;
            nav.innerHTML = originalNavHTML;
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
                    if (mobileLoginLink) {
                        mobileLoginLink.textContent = currentUser.nama;
                        mobileLoginLink.style.color = '';
                    }
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
        window.location.replace('/');
    }



    function showLoginPrompt() {
        const overlay = document.createElement('div');
        overlay.id = 'loginOverlay';
        overlay.className = 'app-modal';

        const prompt = document.createElement('div');
        prompt.className = 'app-modal__card';
        prompt.innerHTML = `
            <div class="app-modal__icon">i</div>
            <h3>Login Diperlukan</h3>
            <div class="app-modal__content"><p>Sebelum melanjutkan, yuk login dulu.</p></div>
            <button class="app-modal__button" type="button">Login</button>
        `;
        overlay.appendChild(prompt);
        document.body.appendChild(overlay);
        prompt.querySelector('button').addEventListener('click', () => {
            window.location.href = '/';
        });
        requestAnimationFrame(() => overlay.classList.add('is-open'));
    }

    const toggleMobileMenu = () => {
        if (!mobileToggle || !mobileMenu || !header) return;
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
            mobileToggle?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            header?.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (mobileToggle && mobileMenu && !mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header?.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header?.classList.remove('active');
        }
    });

    const updateActiveNav = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;
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

    const observer = new IntersectionObserver(updateActiveNav, {
        threshold: 0,
        rootMargin: '-30% 0px -60% 0px'
    });
    sections.forEach(section => observer.observe(section));
    document.addEventListener('contextmenu', (e) => e.preventDefault());
});

function initializeCleanFormControls() {
    document.querySelectorAll('.AmBox select').forEach(createCleanSelect);
    document.querySelectorAll('.AmBox input[type="date"]').forEach(createCleanDatePicker);

    document.addEventListener('click', event => {
        document.querySelectorAll('.clean-control.is-open').forEach(control => {
            if (!control.contains(event.target)) control.classList.remove('is-open');
        });
    });
}

function createCleanSelect(select) {
    if (select.dataset.cleanControl) return;
    select.dataset.cleanControl = 'true';
    select.classList.add('native-control-hidden');

    const wrapper = document.createElement('div');
    wrapper.className = 'clean-control clean-select';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'clean-control__trigger';
    trigger.innerHTML = `
        <span class="clean-control__value"></span>
        <svg class="clean-control__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    const menu = document.createElement('div');
    menu.className = 'clean-select__menu';
    wrapper.append(trigger, menu);
    select.insertAdjacentElement('afterend', wrapper);

    const render = () => {
        const selectedOption = select.options[select.selectedIndex];
        trigger.querySelector('.clean-control__value').textContent = selectedOption?.textContent || 'Pilih';
        trigger.disabled = select.disabled;
        menu.innerHTML = '';

        Array.from(select.options).forEach(option => {
            if (option.disabled && !option.value) return;
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'clean-select__option';
            item.textContent = option.textContent;
            item.dataset.value = option.value;
            item.classList.toggle('is-selected', option.selected);
            item.addEventListener('click', () => {
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                wrapper.classList.remove('is-open');
                render();
            });
            menu.appendChild(item);
        });
    };

    trigger.addEventListener('click', () => {
        if (trigger.disabled) return;
        const shouldOpen = !wrapper.classList.contains('is-open');
        document.querySelectorAll('.clean-control.is-open').forEach(control => control.classList.remove('is-open'));
        wrapper.classList.toggle('is-open', shouldOpen);
    });

    select.addEventListener('change', render);
    new MutationObserver(render).observe(select, {
        attributes: true,
        childList: true,
        subtree: true
    });
    render();
}

function createCleanDatePicker(input) {
    if (input.dataset.cleanControl) return;
    input.dataset.cleanControl = 'true';
    input.classList.add('native-control-hidden');

    const wrapper = document.createElement('div');
    wrapper.className = 'clean-control clean-date';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'clean-control__trigger';
    trigger.innerHTML = `
        <span class="clean-control__value">Pilih tanggal</span>
        <svg class="clean-control__icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M8 3v4M16 3v4M3 10h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    const calendar = document.createElement('div');
    calendar.className = 'clean-calendar';
    wrapper.append(trigger, calendar);
    input.insertAdjacentElement('afterend', wrapper);

    const selected = input.value ? new Date(`${input.value}T00:00:00`) : null;
    let visibleDate = selected || new Date();
    visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1);

    const formatValue = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const updateLabel = () => {
        trigger.querySelector('.clean-control__value').textContent = input.value
            ? new Date(`${input.value}T00:00:00`).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
            : 'Pilih tanggal';
    };

    const renderCalendar = () => {
        const year = visibleDate.getFullYear();
        const month = visibleDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const todayValue = formatValue(new Date());

        calendar.innerHTML = `
            <div class="clean-calendar__header">
                <button type="button" class="clean-calendar__nav" data-direction="-1" aria-label="Bulan sebelumnya">&#8249;</button>
                <span class="clean-calendar__title">${visibleDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                <button type="button" class="clean-calendar__nav" data-direction="1" aria-label="Bulan berikutnya">&#8250;</button>
            </div>
            <div class="clean-calendar__week">
                ${['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => `<span>${day}</span>`).join('')}
            </div>
            <div class="clean-calendar__days"></div>
        `;

        const days = calendar.querySelector('.clean-calendar__days');
        for (let index = 0; index < firstDay; index += 1) {
            const empty = document.createElement('span');
            empty.className = 'clean-calendar__day is-empty';
            days.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            const date = new Date(year, month, day);
            const value = formatValue(date);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'clean-calendar__day';
            button.textContent = day;
            button.classList.toggle('is-selected', input.value === value);
            button.classList.toggle('is-today', todayValue === value);
            button.addEventListener('click', () => {
                input.value = value;
                input.dispatchEvent(new Event('change', { bubbles: true }));
                updateLabel();
                wrapper.classList.remove('is-open');
            });
            days.appendChild(button);
        }

        calendar.querySelectorAll('[data-direction]').forEach(button => {
            button.addEventListener('click', () => {
                visibleDate = new Date(year, month + Number(button.dataset.direction), 1);
                renderCalendar();
            });
        });
    };

    trigger.addEventListener('click', () => {
        const shouldOpen = !wrapper.classList.contains('is-open');
        document.querySelectorAll('.clean-control.is-open').forEach(control => control.classList.remove('is-open'));
        wrapper.classList.toggle('is-open', shouldOpen);
        if (shouldOpen) renderCalendar();
    });

    input.addEventListener('change', updateLabel);
    updateLabel();
    renderCalendar();
}

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
            window.location.href = '/dashboard';
        } else {
            alert('Email atau password salah!');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

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
        window.location.href = "/";
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

