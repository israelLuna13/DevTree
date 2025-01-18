# LinkTree

LinkTree es un proyecto desarrollado para practicar y mejorar habilidades en **TypeScript**, **React**, y **MongoDB**. Este proyecto incluye funcionalidades completas como autenticación, autorización, y manejo de redes sociales del usuario, entre otras.

## Propósito del Proyecto

Este proyecto fue creado como una práctica personal para consolidar conocimientos en tecnologías como **TypeScript**, **React**, **MongoDB**, **Express**, y **Node.js**. Además, incluye características adicionales que no estaban en el curso del profesor Juan Pablo, en el que se basa.

---

## Características Principales

- **Autenticación**: Inicio de sesión seguro con JWT.
- **Autorización**: Gestión de permisos de usuario.
- **Envío de Emails**: Emails de prueba y notificaciones.
- **Confirmación de Cuenta**: Tokens para confirmar la cuenta.
- **Cambio de Contraseña**:
  - Desde sesión activa.
  - Mediante token de recuperación.
- **Edición de Perfil**: Actualización de información personal.
- **Gestión de Redes Sociales**: Agregar, editar y eliminar enlaces.
- **Subida de Archivos**: Integración con Cloudinary para almacenamiento.
- **Búsqueda**: Filtrado de usuarios o redes sociales.

---

## Tecnologías Utilizadas

- **Frontend**:
  - TypeScript
  - React (Vite)
- **Backend**:
  - Node.js (v20 o superior)
  - Express
  - MongoDB Atlas
- **Herramientas Adicionales**:
  - Postman
  - Cloudinary

---

## Requisitos Previos

1. Tener instalado Node.js (versión 20 o superior).
2. Contar con una base de datos en MongoDB Atlas.
3. Crear un archivo `.env` para el backend y frontend:

### Backend (`.env`):
```env
PORT=
MONGO_URI=
FRONTEND_URL=
POSTMAN_URL=
JWT_SECRET=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_HOST=
EMAIL_USER=
EMAIL_PORT=
EMAIL_PASS=
```

### Frontend (`.env`):
```env
VITE_API_URL=
```

---

## Instalación y Configuración

### Backend

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con las variables necesarias.
4. Inicia el servidor:
   ```bash
   npm run dev:api
   ```

### Frontend

1. Ve al directorio del frontend.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con la URL de la API.
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

---

## Uso del Proyecto

1. Usa **Postman** para probar los endpoints del backend.
2. Accede al frontend para interactuar con la aplicación de manera visual.
3. Explora las funcionalidades como registro, inicio de sesión, edición de perfil, y más.

---

## Créditos

- Basado en el curso del profesor **Juan Pablo**.
- Personalizado y ampliado por **Israel Castañeda Luna**.

---

## Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor abre un issue o envía un pull request con tus mejoras.

