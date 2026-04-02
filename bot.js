const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const QRCode = require('qrcode');
const { handleIncomingMessage } = require('./menuHandler');

async function initBot() {
    // Definimos el sistema local donde Baileys guardará el cache de los tokens 
    // JSON en la ruta ./baileys_auth_info para que sobreviva a los reinicios
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info');
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Usando versión de WhatsApp v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
        version,
        auth: state,
        browser: Browsers.macOS('Desktop'),
        syncFullHistory: false,
        logger: pino({ level: 'silent' }) // 'silent' para no saturar los logs
    });

    // Guardar credenciales al detectar sincronización
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            global.botStatus = 'Esperando escaneo de QR...';
            // Convertimos la data del QR a Base64 para exponerla en Express
            try {
                const qrImage = await QRCode.toDataURL(qr);
                global.currentQR = qrImage;
            } catch (err) {
                console.error('Error generando arte gráfico para el QR:', err);
            }
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada. Razón:', lastDisconnect.error?.output?.statusCode, 'Reconectando:', shouldReconnect);
            
            if (shouldReconnect) {
                global.botStatus = 'Reconectando con los servidores de Meta...';
                initBot();
            } else {
                global.botStatus = 'Desconectado permanentemente. La sesión fue cerrada desde el teléfono. Por favor vacía la carpeta baileys_auth_info.';
                console.log('Advertencia: Debes borrar la carpeta de sesión para solicitar un nuevo QR.');
            }
        } else if (connection === 'open') {
            console.log('¡Conectado e inicializado a WhatsApp correctamente!');
            global.botStatus = 'Conectado a WhatsApp. Bot escuchando mensajes.';
            global.currentQR = ''; 
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        // Retornar en caso de que el mensaje no traiga cuerpo, o sea disparado por nuestro propio bot.
        if (!msg.message || msg.key.fromMe) return; 

        // Delegar manejo a lógica separada
        await handleIncomingMessage(sock, msg);
    });
}

module.exports = initBot;
