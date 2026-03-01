// --- DATA STATE ---
const spaces = [
    { id: 1, name: "Suite de Cuarzo", type: "Oficina Privada", capacity: 4, price: "$45/hr", available: true, desc: "Suite privada con paredes de vidrio acústico." },
    { id: 2, name: "Atrio de Obsidiana", type: "Sala de Reuniones", capacity: 12, price: "$80/hr", available: true, desc: "Sala de conferencias principal con tecnología 4K." },
    { id: 3, name: "Núcleo Prisma", type: "Escritorio Abierto", capacity: 1, price: "$15/hr", available: true, desc: "Escritorio abierto en zona de alta luminosidad." },
    { id: 4, name: "Laboratorio Neón", type: "Estudio Creativo", capacity: 6, price: "$60/hr", available: false, desc: "Espacio para prototipado y diseño creativo." }
];

let bookings = [];
let registeredUsers = [];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderSpaces();
    renderAdminSpaces();
    populateSelect();
    renderMyBookings();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').setAttribute('min', today);

    initParallax();
    initMobileNav();
});

// --- MOBILE NAV ---
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        document.querySelectorAll('.nav-links').forEach(nl => nl.classList.toggle('open'));
    });

    // Close nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            document.querySelectorAll('.nav-links').forEach(nl => nl.classList.remove('open'));
        });
    });
}

// --- 3D PARALLAX ---
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const strata = document.querySelectorAll('.stratum');
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        strata.forEach((stratum, index) => {
            const factor = (index + 1) * 0.5;
            stratum.style.transform = `rotateY(${x * factor}deg) rotateX(${-y * factor}deg)`;
        });
    });
}

// --- NAVIGATION ---
function switchTab(tabId, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabId === 'admin') renderAdminSpaces();
    if (tabId === 'my-bookings') renderMyBookings();
}

// --- TOAST ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- RENDER SPACES ---
function renderSpaces() {
    const container = document.getElementById('spaces-container');
    container.innerHTML = '';
    spaces.forEach((space, index) => {
        const card = document.createElement('div');
        card.className = `stratum-card ${!space.available ? 'unavailable' : ''}`;
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">◈</div>
                <span style="font-family: 'JetBrains Mono'; font-size: 0.7rem; color: ${space.available ? 'var(--success)' : 'var(--danger)'}">
                    ${space.available ? 'DISPONIBLE' : 'OCUPADO'}
                </span>
            </div>
            <div class="card-title">${space.name}</div>
            <div class="card-desc">${space.desc}</div>
            <div class="card-meta">
                <span>CAP: ${space.capacity}</span>
                <span>${space.price}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function populateSelect() {
    const select = document.getElementById('space-select');
    select.innerHTML = '';
    spaces.forEach(space => {
        if (space.available) {
            const option = document.createElement('option');
            option.value = space.id;
            option.text = `${space.name} — ${space.type}`;
            select.appendChild(option);
        }
    });
}

function renderAdminSpaces() {
    const container = document.getElementById('admin-spaces-container');
    container.innerHTML = '';
    spaces.forEach((space, index) => {
        const card = document.createElement('div');
        card.className = 'stratum-card';
        card.style.borderLeft = space.available ? '4px solid var(--success)' : '4px solid var(--danger)';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${space.name}</div>
                <label class="toggle-switch">
                    <input type="checkbox" ${space.available ? 'checked' : ''} onchange="toggleAvailability(${space.id})">
                    <span class="slider"></span>
                </label>
            </div>
            <div class="card-desc">ID: #${space.id} | ${space.type}</div>
            <div class="card-meta">
                <span>Estado: ${space.available ? 'ABIERTO' : 'CERRADO'}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- MY BOOKINGS ---
function renderMyBookings() {
    const container = document.getElementById('my-bookings-container');
    if (!container) return;

    container.innerHTML = '';

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="bookings-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <p>Sin reservas activas</p>
            </div>
        `;
        return;
    }

    const countEl = document.createElement('p');
    countEl.className = 'bookings-count';
    countEl.textContent = `${bookings.length} reserva${bookings.length !== 1 ? 's' : ''} activa${bookings.length !== 1 ? 's' : ''}`;
    container.appendChild(countEl);

    const list = document.createElement('div');
    list.className = 'bookings-list';

    bookings.forEach(booking => {
        const space = spaces.find(s => s.id == booking.spaceId);
        const spaceName = space ? space.name : `Espacio #${booking.spaceId}`;
        const spacePrice = space ? space.price : '';

        const card = document.createElement('div');
        card.className = 'booking-card';
        card.id = `booking-${booking.id}`;

        const dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

        card.innerHTML = `
            <div class="booking-info">
                <div class="booking-space">${spaceName}</div>
                <div class="booking-details">
                    <div class="booking-detail">
                        <span class="detail-label">USUARIO</span>
                        <span>${booking.user}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="detail-label">FECHA</span>
                        <span>${dateFormatted}</span>
                    </div>
                    <div class="booking-detail">
                        <span class="detail-label">HORA</span>
                        <span>${booking.time}</span>
                    </div>
                    ${spacePrice ? `<div class="booking-detail"><span class="detail-label">PRECIO</span><span>${spacePrice}</span></div>` : ''}
                </div>
                <div class="booking-id">REF: ${booking.id}</div>
            </div>
            <button class="btn-danger" onclick="cancelBooking('${booking.id}', this)">✕ CANCELAR</button>
        `;
        list.appendChild(card);
    });

    container.appendChild(list);
}

function cancelBooking(bookingId, btn) {
    const card = document.getElementById(`booking-${bookingId}`);
    if (!card) return;

    // Animate out
    card.classList.add('cancelling');

    setTimeout(() => {
        bookings = bookings.filter(b => b.id !== bookingId);
        renderMyBookings();
        showToast('Reserva cancelada correctamente', 'error');
    }, 500);
}

// --- ACTIONS ---
function handleBooking(e) {
    e.preventDefault();

    const spaceId = document.getElementById('space-select').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const user = document.getElementById('user-name').value;

    const booking = {
        id: 'BK-' + Date.now().toString(36).toUpperCase(),
        spaceId,
        date,
        time,
        user,
        createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    e.target.reset();
    showToast(`Reserva confirmada para ${user}`, 'success');
}

function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    e.target.reset();
    showToast(`Gracias ${name}, te contactaremos pronto`, 'success');
}

function handleRegister(e) {
    e.preventDefault();

    const firstname = document.getElementById('reg-firstname').value;
    const lastname = document.getElementById('reg-lastname').value;
    const phone = document.getElementById('reg-phone').value;
    const email = document.getElementById('reg-email').value;
    const company = document.getElementById('reg-company').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;

    if (password !== passwordConfirm) {
        showToast('Las contraseñas no coinciden', 'error');
        return;
    }

    const existingUser = registeredUsers.find(u => u.email === email);
    if (existingUser) {
        showToast('Este correo ya está registrado', 'error');
        return;
    }

    registeredUsers.push({ firstname, lastname, phone, email, company, password, registeredAt: new Date().toISOString() });
    e.target.reset();
    showToast(`¡Bienvenido ${firstname}! Tu cuenta ha sido creada`, 'success');

    setTimeout(() => switchTab('home', null), 2000);
}

function toggleAvailability(id) {
    const space = spaces.find(s => s.id === id);
    if (space) {
        space.available = !space.available;
        renderSpaces();
        renderAdminSpaces();
        populateSelect();
        showToast(space.available ? 'Disponibilidad activada' : 'Espacio marcado como ocupado', 'success');
    }
}