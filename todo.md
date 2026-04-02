# Roadmap del Proyecto (TODO)

- [ ] **Fase 1: Inicialización y Definición del Stack**
  - [ ] Seleccionar lenguaje y librerías principales (ej. Node.js + Baileys o Python + Selenium/Venom).
  - [ ] Inicializar repositorio/proyecto con un archivo claro de dependencias.
  - [ ] Crear estructura de directorios.

- [ ] **Fase 2: Core del Bot de WhatsApp y Autenticación**
  - [ ] Implementar inicialización del cliente de WhatsApp en el backend.
  - [ ] Configurar el sistema de persistencia de sesión local permanente (archivos JSON).
  - [ ] Capturar la generación del código QR en eventos desde el core.

- [ ] **Fase 3: Dashboard Web (Lógica de Seguridad para el QR)**
  - [ ] Crear servidor web (Express o similar) y montar la vista HTML/Dashboard de soporte.
  - [ ] Desarrollar middleware/verificación de contraseña obligatoria para acceder a la ruta del QR.
  - [ ] Exponer el código generado dinámicamente mediante la web protegida.

- [ ] **Fase 4: Lógica de Negocio (Menús del Chatbot)**
  - [ ] Implementar la captura/intercepción de mensajes entrantes.
  - [ ] Desarrollar enrutador para el Menú Principal y reconocimiento de palabras clave/números.
  - [ ] Lógica para respuesta a: _Opción 1: Seguridad_.
  - [ ] Lógica para respuesta a: _Opción 2: Telecomunicaciones_.
  - [ ] Diseñar y ejecutar mecanismo de derivación: _Opción 3: Hablar con un técnico_ (ej. notificar, loguear, o derivar a otra línea).

- [ ] **Fase 5: Documentación y Preparación para Producción**
  - [ ] Generar un script de inicio universal (como `npm start` o script en bash).
  - [ ] Configurar adecuadamente el archivo `package.json` o `requirements.txt` para garantizar la compatibilidad on-premise en Linux.
  - [ ] Revisión de rutas locales y variables de entorno.
  - [ ] (Opcional) Containerización en Docker si se considera óptimo para el servidor on-premise.
