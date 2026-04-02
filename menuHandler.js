/**
 * Lógica del menú principal y flujo del Chatbot para el área de Soporte Técnico.
 */

// Memoria volátil para seguir estados de los clientes. (Para producción se recomienda persistencia en Redis o BDD si el volumen es alto)
const userStates = {};

async function handleIncomingMessage(sock, msg) {
    const sender = msg.key.remoteJid;
    
    // Tratamiento para extraer el texto independientemente de WhatsApp Web antiguo o multi-dispositivo moderno
    const textMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const body = textMessage.trim().toLowerCase();
    
    if (!body) return;

    // Consultamos el estado o le definimos que inicie
    const currentState = userStates[sender] || 'MENU_PRINCIPAL';

    // Manejo de corte rapido de modo Operador Humano (Opción 3)
    if (currentState === 'HUMAN_SUPPORT') {
        if (body === 'fin' || body === 'salir') {
            userStates[sender] = 'MENU_PRINCIPAL';
            await sendMessage(sock, sender, 'Has finalizado la sesión con el soporte humano. Regresando al menú del bot... 🤖');
            await sendMainMenu(sock, sender);
        }
        // Mientras esté en estado HUMAN_SUPPORT, el bot de menús lo ignora para que un humano responda en la app.
        return; 
    }

    // Ruta transversal: Palabra clave para reiniciar
    if (body === 'menu' || body === 'menú' || body === 'volver') {
        userStates[sender] = 'MENU_PRINCIPAL';
        await sendMainMenu(sock, sender);
        return;
    }

    // Flujos del estado "MENU_PRINCIPAL"
    if (currentState === 'MENU_PRINCIPAL') {
        switch (body) {
            case '1':
                userStates[sender] = 'SUBMENU_SEGURIDAD';
                await sendMessage(sock, sender, '🛡️ *Área de Seguridad*\\nHas ingresado al departamento de alarmas, accesos y cámaras.\\n\\nPor favor, *escribe detalladamente tu incidencia* en un mensaje y un analista procesará el requerimiento.\\n\\n(_Escribe *Menu* para volver al inicio_).');
                break;
            case '2':
                userStates[sender] = 'SUBMENU_TELECOMUNICACIONES';
                await sendMessage(sock, sender, '📡 *Área de Telecomunicaciones*\\nHas contactado por temas de internet, redes o telefonía corporativa.\\n\\nPor favor, *escribe detalladamente* el fallo o requerimiento para ingresarlo al sistema.\\n\\n(_Escribe *Menu* para volver al inicio_).');
                break;
            case '3':
                userStates[sender] = 'HUMAN_SUPPORT';
                await sendMessage(sock, sender, '👨‍🔧 *Soporte Técnico Especializado*\\nEl bot de respuestas automáticas ha sido *pausado* temporalmente.\\n\\nEn breve un técnico especialista leerá tu conversación y te atenderá.\\n\\n_Para reconectarte con el Bot, escribe la palabra *fin*._');
                
                // Registro local en consola
                console.log(`====================================`);
                console.log(`[ALERTA TÉCNICO] El número ${sender.split('@')[0]} requiere asistencia de un operador.`);
                console.log(`====================================`);
                
                // Aquí en un futuro se puede derivar con algo como:
                // await sendMessage(sock, 'NUMERO_DEL_TECNICO@s.whatsapp.net', `¡Atención! El cliente ${sender} necesita ayuda.`);
                break;
            default:
                await sendMainMenu(sock, sender);
                break;
        }
    } 
    // Flujos de relleno de incidencia
    else if (currentState === 'SUBMENU_SEGURIDAD') {
        await sendMessage(sock, sender, 'Tu reporte de *Seguridad* ha sido cargado temporalmente. Generaremos un Ticket interno. Gracias.\\n\\n(Para iniciar otro ticket, escribe *menu*).');
    } else if (currentState === 'SUBMENU_TELECOMUNICACIONES') {
        await sendMessage(sock, sender, 'Tu reporte de *Telecomunicaciones* está siendo procesado vía mesa de ayuda. Nuestro personal evaluará el requerimiento. Gracias.\\n\\n(Para consultar u otra gestión escribe *menu*).');
    }
}

async function sendMainMenu(sock, to) {
    const menuText = `¡Hola! 👋 Bienvenido al bot de soporte de Seguridad y Telecomunicaciones.

Por favor, ingresa el *número* de la opción que necesitas:

*1.* Seguridad (Cámaras, alarmas, controles de acceso).
*2.* Telecomunicaciones (Internet, infraestructura de red, telefonía).
*3.* Hablar directo con un técnico especializado.
`;

    await sendMessage(sock, to, menuText);
}

// Función auxiliar
async function sendMessage(sock, to, text) {
    try {
        await sock.sendMessage(to, { text: text });
    } catch (e) {
        console.error('Fallo al mandar msj:', e);
    }
}

module.exports = { handleIncomingMessage };
