# Bot de Soporte - WhatsApp (Seguridad y Telecomunicaciones)

Este proyecto está construido en **Node.js** usando la librería ligera `@whiskeysockets/baileys`. Este stack evita requerir navegadores completos internamente, haciéndolo extremadamente veloz y perfectamente compatible en consumo de memoria para un servidor **Linux On-Premise**.

## Pre-Requisitos
- **Node.js** v18 o superior.
- **npm** (Package Manager).

## 1. Etapa de Desarrollo (MacBook Local)

1. Descarga el stack de librerías. Abre una Terminal dentro de este directorio y corre:
   ```bash
   npm install
   ```
2. Inicia los motores del Dashboard web y de WhatsApp al mismo tiempo:
   ```bash
   npm start
   ```
3. Ingresa utilizando Safari o Chrome a:
   👉 **http://localhost:3000**
4. La contraseña por defecto del panel es: `admin123` (editable desde código fuente o variable de entorno `DASHBOARD_PASSWORD`).
5. Se generará un **Código QR**. Escanéalo mediante tu móvil de área de soporte. Automáticamente desaparecerá y dirá "Conectado".

### Sesión Persistente (No más QRs)
Automáticamente verás crearse un directorio oculto a la vista llamado `baileys_auth_info` (junto al código fuente). Allí viven encripatos los tokens.
Si por alguna razón cierras el proceso de Node (o apagas la Mac), _cuando vuelvas a abrir el `npm start`, el bot regresará inmediatamente sin escanear el QR_.
> Nota: Si cambias de número WhatsApp, simplemente elimina esta carpeta entera y te dará un QR nuevo.

---

## 2. Migración a Servidor Linux (On-Premise)

A la hora de llevar esto a un VPS Local Ubuntu/Debian u otra variante Linux, en vez de mantener la terminal abierta 24/7 utilizaremos **PM2**, un gestor de procesos que mantiene Node vivo en el servidor en el fondo.

1. Instala PM2 como root globalmente en Linux:
   ```bash
   sudo npm install -g pm2
   ```
2. Sube esta carpeta al servidor (podés comprimirla en zip, mandarla por SFTP o vía Git). Repite en el servidor comando de librerías: `npm install`.
3. Arranca el daemon del bot para el sistema:
   ```bash
   pm2 start server.js --name "whatsapp-support"
   ```
4. (Opcional) Guarda el entorno vivo para sobrevivir los reinicios de hardware del VPS:
   ```bash
   pm2 save
   pm2 startup
   ```
5. Accede libremente vía web al servidor mediante su IP pública/privada en el puerto 3000: `http://<IP_LINUX>:3000`, e ingresas con la contraseña para volver a vincular el código QR en la nueva máquina.

¡Fin! Disfruten de la operativa de soporte.
