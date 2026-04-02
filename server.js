const express = require('express');
const session = require('express-session');
const initBot = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'admin123';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'whatsapp-bot-secret-key-123',
    resave: false,
    saveUninitialized: true
}));

// Estado global para compartir iteraciones entre Baileys y Express de forma ligera
global.currentQR = '';
global.botStatus = 'Iniciando...';

// --- Rutas Web ---
app.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/login');
    }
    
    // Vista simple del Dashboard HTML para el QR
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard - WhatsApp Bot</title>
            <style>
                body { font-family: system-ui, sans-serif; background: #f0f2f5; margin: 0; padding: 2rem; display: flex; flex-direction: column; align-items: center; }
                .card { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 500px; width: 100%; }
                h1 { color: #1a1a1a; margin-top: 0; }
                img { max-width: 300px; margin: 1rem 0; border: 1px solid #ddd; padding: 10px; border-radius: 5px; }
                .status { padding: 10px; margin: 1rem 0; border-radius: 5px; font-weight: bold; }
                .connected { background: #d4edda; color: #155724; }
                .waiting { background: #fff3cd; color: #856404; }
                .btn { display: inline-block; background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;}
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Panel de Control del Bot</h1>
                <p>Estado actual:</p>
                <div class="status ${global.botStatus.includes('Conectado') ? 'connected' : 'waiting'}">
                    ${global.botStatus}
                </div>
                
                ${global.currentQR && !global.botStatus.includes('Conectado') 
                    ? `<div><p>Escanea este QR con tu aplicación corporativa de WhatsApp:</p><img src="${global.currentQR}" alt="WhatsApp QR Code"/></div>` 
                    : ''}
                    
                <a href="/logout" class="btn">Cerrar Sesión (Panel Web)</a>
            </div>
            <script>
                // Recargar cada 3 segundos si no está conectado para captar el nuevo QR
                if (!document.querySelector('.connected')) {
                    setTimeout(() => window.location.reload(), 3000);
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Login Dashboard</title>
            <style>
                body { font-family: system-ui, sans-serif; background: #25D366; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .login-box { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); width: 300px; text-align: center; }
                input[type="password"] { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
                button { width: 100%; padding: 10px; background: #128C7E; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold; }
                button:hover { background: #075E54; }
            </style>
        </head>
        <body>
            <div class="login-box">
                <h2>Acceso Restringido</h2>
                <form action="/login" method="POST">
                    <input type="password" name="password" placeholder="Contraseña de acceso" required autofocus />
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
    if (req.body.password === DASHBOARD_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('<script>alert("Contraseña incorrecta"); window.location.href="/login";</script>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Levantar el servidor y luego el proceso de WhatsApp
app.listen(PORT, () => {
    console.log(`Servidor web levantado. Accede localmente a: http://localhost:${PORT}`);
    console.log(`Contraseña por defecto exigida por el Dashboard web: ${DASHBOARD_PASSWORD}`);
    // Inicializamos Baileys
    initBot();
});
