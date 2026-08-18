[English](README.md) | [Español](README.es.md)
 
# Portafolio-PixelArt
 
Sitio web de portafolio construido con HTML, CSS y JavaScript para mostrar proyectos de pixel art y desarrollo de juegos indie.
Single-page app estática, sin frameworks ni dependencias externas.
 
## Funcionalidades
 
- Navegación por rutas con hash (`#inicio`, `#proyectos`, `#sobre-mi`, `#contactame`) sin recargar la página
- Carrusel hero de paisajes destacados, con controles manuales y navegación por teclado
- Animaciones de entrada (reveal) al hacer scroll usando `IntersectionObserver`, respetando `prefers-reduced-motion`
- Formulario de contacto con validación en tiempo real (nombre, email, asunto, mensaje)
- Sección de stack tecnológico generada dinámicamente desde un arreglo de íconos
- Diseño responsive con paleta y tipografía personalizadas (`colors_and_type.css`)
## Estructura del proyecto
 
```
├── index.html            # Estructura principal del sitio
├── app.js                # Lógica: routing, carrusel, animaciones, validación de formulario
├── styles.css             # Estilos generales
├── colors_and_type.css    # Variables de color y tipografía
├── assets/                 # Imágenes, íconos y logo
└── fonts/                  # Tipografías locales
```
 
## Cómo verlo localmente
 
No requiere instalación ni dependencias. Clona el repo y abre `index.html` en el navegador:
 
```bash
git clone https://github.com/Cristian-V9/Portafolio-PixelArt.git
cd Portafolio-PixelArt
```
 
Luego abre `index.html` directamente, o sirve la carpeta con un servidor local:
 
```bash
npx serve .
```
 
## Notas / pendientes
 
- El formulario de contacto solo valida en el cliente; no envía el mensaje a ningún servidor todavía (falta conectarlo a un backend o a un servicio como Formspree/EmailJS).
- Los enlaces a redes sociales (GitHub, LinkedIn, itch.io, X) están como placeholders y deben actualizarse con las URLs reales.
- Los testimonios mostrados son contenido de ejemplo para efectos del portafolio.
## Licencia
 
Este proyecto aún no tiene licencia definida.
