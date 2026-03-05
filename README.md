# 💰 MoneyWise

Aplicación móvil desarrollada con **Ionic + Angular** para la gestión de gastos personales.
Permite registrar ingresos, gastos, visualizar estadísticas y controlar las finanzas de forma sencilla.

---

## 📱 Características

* 🔐 Registro e inicio de sesión de usuario
* ➕ Crear transacciones (ingresos y gastos)
* 📋 Lista de transacciones
* 🔎 Página de detalles de transacción
* ✏️ Editar y eliminar transacciones
* 📷 Adjuntar foto a la transacción usando la cámara
* 📊 Dashboard con gráfico de ingresos vs gastos
* 💾 Almacenamiento local usando Ionic Storage

---

## 🛠 Tecnologías utilizadas

* ⚡ **Ionic Framework**
* 🅰️ **Angular**
* 📦 **Ionic Storage**
* 📊 **Chart.js**
* 📷 **Capacitor Camera**

---

## 📂 Estructura del proyecto

src/app

core/
├── services/
│   ├── auth.service.ts
│   ├── transaction.service.ts
│   └── camera.service.ts

pages/
├── dashboard/
├── transactions/
├── transaction-detail/
└── auth/

---

## 🚀 Instalación

1️⃣ Clonar el repositorio

git clone https://github.com/TU-USUARIO/moneywise-app.git

2️⃣ Entrar al proyecto

cd moneywise-app

3️⃣ Instalar dependencias

npm install

4️⃣ Ejecutar la aplicación

ionic serve

---

## 📊 Dashboard

El dashboard muestra:

* Total disponible
* Total de ingresos
* Total de gastos
* Gráfico de pastel con resumen financiero

---

## 📸 Captura de fotos

La aplicación permite tomar una foto usando la cámara del dispositivo y asociarla a una transacción.

---

## 👨‍💻 Autor

**Gilberto Andres Rivera**

Proyecto académico desarrollado para la asignatura de
**Desarrollo Mobile con Ionic / Angular**

---

## 📄 Licencia

Este proyecto es de uso educativo
