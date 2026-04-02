## 🇪🇸 Versión en Español

# WhatsApp Support Bot (Seguridad y Telecomunicaciones)

Este proyecto consiste en un bot de soporte técnico automatizado construido en **Node.js** utilizando la librería ligera `@whiskeysockets/baileys`. Al ser una implementación basada en sockets, evita el uso de navegadores completos, lo que garantiza una ejecución extremadamente veloz y un consumo de memoria mínimo, ideal para servidores **Linux On-Premise** o VPS con recursos limitados.

## Requisitos Previos
- **Node.js** v18 o superior.
- **npm** (Gestor de paquetes).

## 1. Etapa de Desarrollo (Entorno Local)

1. **Instalación de dependencias:** Abre una terminal en el directorio raíz y ejecuta:
   ```bash
   npm install
   ```
2. **Inicio de servicios:** Inicia el Dashboard web y el cliente de WhatsApp simultáneamente:
   ```bash
   npm start
   ```
3. **Acceso al Panel:** Ingresa desde tu navegador (Chrome, Safari, Edge) a:
   👉 **http://localhost:3000**
4. **Autenticación:** La contraseña por defecto es `admin123` (configurable mediante la variable de entorno `DASHBOARD_PASSWORD` o directamente en el código fuente).
5. **Vinculación:** Se generará un **Código QR** en el panel. Escanéalo con el dispositivo móvil destinado al soporte. Una vez vinculado, el estado cambiará automáticamente a "Conectado".

### Sesión Persistente
El sistema genera automáticamente un directorio llamado `baileys_auth_info` donde se almacenan los tokens de sesión de forma segura. 
Si el proceso de Node se detiene o el equipo se reinicia, al ejecutar `npm start` nuevamente, **el bot recuperará la sesión automáticamente** sin necesidad de escanear el QR.
> **Nota:** Si deseas cambiar el número de WhatsApp vinculado, simplemente elimina la carpeta `baileys_auth_info` y reinicia el servicio.

---

## 2. Despliegue en Servidor Linux (On-Premise)

Para entornos de producción (VPS o servidores locales Ubuntu/Debian), se recomienda el uso de **PM2**. Este gestor de procesos garantiza que el bot se mantenga en ejecución constante en segundo plano.

1. **Instalación global de PM2:**
   ```bash
   sudo npm install -g pm2
   ```
2. **Preparación:** Transfiere la carpeta al servidor (vía Git, SFTP o SCP) y ejecuta `npm install` dentro del directorio.
3. **Ejecución del Daemon:**
   ```bash
   pm2 start server.js --name "whatsapp-support"
   ```
4. **Persistencia del sistema:** (Opcional) Configura el proceso para que se inicie automáticamente tras un reinicio del hardware:
   ```bash
   pm2 save
   pm2 startup
   ```
5. **Acceso Remoto:** Accede al panel mediante la dirección IP de tu servidor en el puerto 3000: `http://<IP_DEL_SERVIDOR>:3000`.

---

## 🇺🇸 English Version

# WhatsApp Support Bot (Security & Telecommunications)

This project is a technical support bot built with **Node.js** using the lightweight library `@whiskeysockets/baileys`. This stack bypasses the need for full headless browsers, making it extremely fast and highly memory-efficient—perfect for **On-Premise Linux** servers or resource-constrained VPS environments.

## Prerequisites
- **Node.js** v18 or higher.
- **npm** (Package Manager).

## 1. Development Stage (Local Environment)

1. **Install dependencies:** Open a terminal in the project directory and run:
   ```bash
   npm install
   ```
2. **Launch services:** Start both the Web Dashboard and the WhatsApp engine simultaneously:
   ```bash
   npm start
   ```
3. **Access the Dashboard:** Open your browser (Chrome, Safari, Edge) and go to:
   👉 **http://localhost:3000**
4. **Authentication:** The default password is `admin123` (customizable via the `DASHBOARD_PASSWORD` environment variable or within the source code).
5. **Linking:** A **QR Code** will be displayed. Scan it using your dedicated support mobile device. The status will automatically switch to "Connected" once paired.

### Persistent Session
A directory named `baileys_auth_info` is automatically created to store encrypted session tokens.
If the Node process is closed or the machine restarts, running `npm start` will **immediately restore the session** without requiring a new QR scan.
> **Note:** To switch the WhatsApp account, simply delete the `baileys_auth_info` folder and restart the service.

---

## 2. Linux Server Deployment (On-Premise)

To deploy this in a production environment (Ubuntu/Debian VPS or local server), we use **PM2**, a process manager that keeps the Node application running in the background.

1. **Install PM2 globally:**
   ```bash
   sudo npm install -g pm2
   ```
2. **Setup:** Upload the project folder to your server (via Git, SFTP, or SCP) and run `npm install`.
3. **Start the daemon:**
   ```bash
   pm2 start server.js --name "whatsapp-support"
   ```
4. **Enable Startup Persistence:** (Optional) Ensure the process survives hardware reboots:
   ```bash
   pm2 save
   pm2 startup
   ```
5. **Remote Access:** Access the dashboard via your server's IP address on port 3000: `http://<SERVER_IP>:3000`.

---
