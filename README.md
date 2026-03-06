
# 🚀 WorkHub Coworking – Sistema de Gestión de Reservas

![HTML](https://img.shields.io/badge/HTML5-Structure-orange?style=for-the-badge\&logo=html5)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge\&logo=css3)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=for-the-badge\&logo=bootstrap)
![JavaScript](https://img.shields.io/badge/JavaScript-DOM-yellow?style=for-the-badge\&logo=javascript)

Aplicación web desarrollada como **primera iteración del sistema digital de reservas para WorkHub Coworking**, creada durante el **Módulo 1 – Fundamentos de Desarrollo Front-End**.

El sistema permite visualizar espacios de coworking, gestionar reservas y simular disponibilidad utilizando únicamente **tecnologías de frontend**.

---

# 📚 Tabla de Contenido

* [Contexto del Proyecto](#contexto-del-proyecto)
* [Objetivo del Proyecto](#objetivo-del-proyecto)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Arquitectura del Proyecto](#arquitectura-del-proyecto)
* [Estructura de Carpetas](#estructura-de-carpetas)
* [Funcionalidades Implementadas](#funcionalidades-implementadas)
* [Componentes Bootstrap Utilizados](#componentes-bootstrap-utilizados)
* [Manipulación del DOM](#manipulación-del-dom)
* [Diseño y UX](#diseño-y-ux)
* [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
* [Estado del Proyecto](#estado-del-proyecto)
* [Mejoras Futuras](#mejoras-futuras)
* [Autores](#autores)

---

# 🧠 Contexto del Proyecto

**Workhub.Coworking** es una solución digital moderna diseñada para la gestión y reserva de espacios de trabajo profesionales. La plataforma permite a los usuarios optimizar su productividad permitiéndoles alquilar desde cabinas independientes aisladas para máxima concentración hasta zonas de trabajo compartido (hot-desking) para fomentar la colaboración.


Actualmente las reservas se gestionan mediante:

* WhatsApp
* Correos electrónicos
* Hojas de cálculo

Esto genera problemas como:

* duplicación de reservas
* mala gestión de horarios
* dificultad para escalar el servicio
* pérdida de información

Por esta razón se plantea el desarrollo de un **sistema web que centralice la gestión de reservas**.

En esta primera fase se desarrolla un **MVP (Minimum Viable Product)** en frontend.

---

# 🎯 Objetivo del Proyecto

Construir una **aplicación web estática** que permita:

✔ visualizar espacios de coworking
✔ reservar espacios de trabajo
✔ gestionar reservas creadas
✔ simular disponibilidad de espacios

Utilizando:

* HTML semántico
* CSS personalizado
* Bootstrap 5
* JavaScript (DOM)

🔗 *Repositorio oficial:* [https://github.com/sergiosebastiansc/Proyecto-integrador](https://github.com/sergiosebastiansc/Proyecto-integrador)
---

# 🧰 Tecnologías Utilizadas

| Tecnología   | Uso                    |
| ------------ | ---------------------- |
| HTML5        | estructura del sitio   |
| CSS3         | estilos personalizados |
| Bootstrap 5  | framework de diseño    |
| JavaScript   | manipulación del DOM   |
| Google Fonts | tipografía             |

Fuentes utilizadas:

* **Inter**
* **JetBrains Mono**

---

# 🏗 Arquitectura del Proyecto

El sistema funciona completamente en el **frontend**.

Los datos se simulan mediante **arrays en JavaScript**.

Ejemplo de datos de espacios:

```javascript
const spaces = [
{
id: 1,
name: "Suite de Cuarzo",
type: "Oficina Privada",
capacity: 4,
price: "$45/hr",
available: true
}
]
```

Las reservas se almacenan temporalmente en memoria:

```javascript
let bookings = []
```

---

# 📂 Estructura de Carpetas

```
project-root
│
├── index.html
├── registro.html
│
├── css
│   ├── style.css
│   └── acceso.css
│
├── js
│   ├── app.js
│   └── acceso.js
│
└── README.md
```

Descripción:

| Archivo       | Descripción                    |
| ------------- | ------------------------------ |
| index.html    | página principal               |
| registro.html | formulario de acceso           |
| style.css     | estilos principales            |
| acceso.css    | estilos del login              |
| app.js        | lógica del sistema             |
| acceso.js     | manejo del formulario de login |

---

# ⚙ Funcionalidades Implementadas

## 🏠 Página Principal

Incluye:

* navbar de navegación
* hero section
* carrusel de imágenes
* listado de espacios disponibles

Los espacios se muestran mediante **cards dinámicas generadas con JavaScript**.

---

# 🏢 Visualización de Espacios

Catálogo interactivo de salas y cabinas disponibles con detalles específicos para cada necesidad.Los espacios disponibles se renderizan dinámicamente:

```javascript
renderSpaces()
```

Cada espacio muestra:

* nombre
* tipo de espacio
* capacidad
* precio
* estado de disponibilidad

---

# 📅 Sistema de Reservas

Formulario de reserva con selección de fecha y hora, garantizando disponibilidad en tiempo real.

Campos disponibles:

* nombre del usuario
* espacio a reservar
* fecha
* hora

Evento utilizado:

```javascript
document.getElementById("booking-form")
.addEventListener("submit", handleBooking)
```

Al enviar el formulario:

1. se captura el evento
2. se crea un objeto reserva
3. se guarda en el array de reservas
4. se muestra confirmación
5. se limpia el formulario

---

# 📋 Gestión de Reservas
Sistema de liberación inmediata de espacios para mantener la disponibilidad actualizada.

Los usuarios pueden:

* ver sus reservas
* cancelar reservas existentes

Las reservas se muestran dinámicamente en el DOM.

Ejemplo de estructura:

```
Reserva
Espacio
Usuario
Fecha
Hora
ID de referencia
```

---
# 🛠️ Autenticación segura
 Registro e inicio de sesión de usuarios para una gestión personalizada y protegida de reservas.

 
---
# ⚙ Panel de Administración

Herramientas de gestión para administradores, permitiendo visualizar la ocupación total y optimizar el uso de los recursos del coworking.

Permite:

* visualizar espacios
* activar o desactivar disponibilidad

Esto se controla mediante un **toggle switch**.

```javascript
toggleAvailability(id)
```

---

# 🧩 Componentes Bootstrap Utilizados

El proyecto utiliza múltiples componentes del framework.

Entre ellos:

* Navbar
* Carousel
* Cards
* Buttons
* Forms
* Grid System

Ejemplo de grid:

```
container
row
col
```

---

# 🧠 Manipulación del DOM

Durante el proyecto se utilizaron funciones como:

* `getElementById()`
* `querySelector()`
* `createElement()`
* `appendChild()`
* `innerHTML()`
* `addEventListener()`

Estas permiten **generar contenido dinámico sin backend**.

---

# 🎨 Diseño y UX

El diseño del proyecto incluye:

* interfaz moderna tipo dashboard
* animaciones CSS
* efectos glassmorphism
* sistema de notificaciones toast
* layout responsive
* tipografía profesional

El objetivo fue crear una **experiencia visual moderna y clara para el usuario**.

---

# ▶ Cómo ejecutar el proyecto

Si deseas ejecutar este proyecto de forma local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/sergiosebastiansc/Proyecto-integrador.git](https://github.com/sergiosebastiansc/Proyecto-integrador.git)
    ```
2.  **Navegar a la carpeta del proyecto:**
    ```bash
    cd Proyecto-integrador
    ```
3.  **Abrir el proyecto:**
    Puedes abrir el archivo `index.html` directamente en tu navegador o utilizar la extensión **Live Server** en VS Code para una mejor experiencia de desarrollo.

```
index.html
```

---

# 📌 Estado del Proyecto

✔ MVP funcional completado
✔ interfaz responsive
✔ sistema de reservas simulado

Actualmente el sistema **no utiliza backend ni base de datos**.

---

# 🚧 Mejoras Futuras

En próximas iteraciones se planea implementar:

* backend con Node.js
* base de datos
* autenticación de usuarios
* API REST
* persistencia de reservas
* panel administrativo avanzado
* despliegue en la nube

---

# 👩‍💻 Autores

Este proyecto fue posible gracias al esfuerzo y dedicación de:

* **Gloria Cornelio**
* **Rodrigo Contreras**
* **Sergio Salinas**
* **Mauricio Diaz**
* **Valentina Medina**
* **Marcelo Martinez**


---

## 📄 Licencia

Este proyecto es de código abierto. Fue desarrollado con fines educativos en el marco de un bootcamp de desarrollo Fullstack JavaScript.    Siéntase libre de explorarlo, clonarlo y proponer mejoras en su ejecución


