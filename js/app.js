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
            
            // Set min date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('booking-date').setAttribute('min', today);

            // Initialize 3D parallax effect
            initParallax();
        });

        // --- 3D PARALLAX EFFECT (from original code) ---
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
            if(event) event.preventDefault();
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
            // Show target section
            document.getElementById(tabId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if(tabId === 'admin') renderAdminSpaces();
        }

        // --- TOAST NOTIFICATION ---
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // --- RENDER FUNCTIONS ---
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
                if(space.available) {
                    const option = document.createElement('option');
                    option.value = space.id;
                    option.text = `${space.name} - ${space.type}`;
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

        // --- ACTIONS ---
        function handleBooking(e) {
            e.preventDefault();
            
            const spaceId = document.getElementById('space-select').value;
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const user = document.getElementById('user-name').value;

            // Add booking
            bookings.push({ spaceId, date, time, user });

            // Reset form
            e.target.reset();
            
            // Show success toast
            showToast(`Reserva confirmada para ${user}`, 'success');
        }

        function handleContact(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            
            // Reset form
            e.target.reset();
            
            // Show success toast
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

            // Validate passwords match
            if (password !== passwordConfirm) {
                showToast('Las contraseñas no coinciden', 'error');
                return;
            }

            // Check if email already exists
            const existingUser = registeredUsers.find(u => u.email === email);
            if (existingUser) {
                showToast('Este correo ya está registrado', 'error');
                return;
            }

            // Add user
            registeredUsers.push({
                firstname,
                lastname,
                phone,
                email,
                company,
                password,
                registeredAt: new Date().toISOString()
            });

            // Reset form
            e.target.reset();
            
            // Show success toast
            showToast(`¡Bienvenido ${firstname}! Tu cuenta ha sido creada`, 'success');

            // Redirect to home after delay
            setTimeout(() => {
                switchTab('home', null);
            }, 2000);
        }

        function toggleAvailability(id) {
            const space = spaces.find(s => s.id === id);
            if (space) {
                space.available = !space.available;
                renderSpaces();
                renderAdminSpaces();
                populateSelect();
                showToast(space.available ? 'Disponibilidad de espacio activada' : 'Espacio marcado como ocupado', 'success');
            }
        }
