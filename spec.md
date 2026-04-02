# Especificaciones del Proyecto: Bot de WhatsApp para Soporte Técnico

## 1. Descripción General
Desarrollo de un chatbot interactivo de WhatsApp orientado al soporte técnico de una empresa dedicada a la seguridad y las telecomunicaciones. El bot proveerá un flujo de menús predefinidos y la gestión de derivación a agentes humanos. Adicionalmente, se dotará de una interfaz web protegida para la autenticación en WhatsApp.

## 2. Requerimientos Funcionales
- **Menús de Interacción (Lógica de Bot)**:
  - Opción 1: Seguridad.
  - Opción 2: Telecomunicaciones.
  - Opción 3: Hablar con un técnico.
- **Autenticación de Sesión**: Generación y exposición de QR para vincular el número de la empresa.
- **Dashboard Web (Control QR)**:
  - Interfaz web simple para mostrar el código QR.
  - Protección de la interfaz mediante una contraseña obligatoria de acceso.
- **Persistencia de Sesión Permanente**: Guardado de sesión de WhatsApp (tokens y credenciales) de forma local en archivos tipo JSON en la estructura del proyecto.

## 3. Entorno y Perspectivas Técnicas
- **Desarrollo Inicial**: Local en entorno macOS (MacBook).
- **Producción Destino**: Servidor Linux On-Premise.
- **Portabilidad**: Especificación estricta de dependencias (requerimientos) para permitir una migración fluida e ininterrumpida a Linux.
- **Formatos y Almacenamiento**: Persistencia de autenticación basada fuertemente en sistema de archivos local, aislada en variables controladas dentro del workspace del proyecto.
