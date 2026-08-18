[English](README.md) | [Español](README.es.md)
 
# Portafolio-PixelArt
 
Web portfolio site built with HTML, CSS and JavaScript to showcase pixel art and indie game projects.
Static single-page app, no frameworks or external dependencies.
 
## Features
 
- Hash-based route navigation (`#inicio`, `#proyectos`, `#sobre-mi`, `#contactame`) without page reloads
- Hero carousel of featured landscapes, with manual controls and keyboard navigation
- Reveal animations on scroll using `IntersectionObserver`, respecting `prefers-reduced-motion`
- Contact form with real-time validation (name, email, subject, message)
- Tech stack section rendered dynamically from an icon list
- Responsive design with custom color palette and typography (`colors_and_type.css`)
## Project structure
 
```
├── index.html            # Main site structure
├── app.js                # Logic: routing, carousel, animations, form validation
├── styles.css             # General styles
├── colors_and_type.css    # Color and typography variables
├── assets/                 # Images, icons and logo
└── fonts/                  # Local fonts
```
 
## Running locally
 
No installation or dependencies required. Clone the repo and open `index.html` in the browser:
 
```bash
git clone https://github.com/Cristian-V9/Portafolio-PixelArt.git
cd Portafolio-PixelArt
```
 
Then open `index.html` directly, or serve the folder with a local server:
 
```bash
npx serve .
```
 
## Notes / pending
 
- The contact form only validates on the client; it does not send the message to any server yet (needs a backend or a service like Formspree/EmailJS).
- Social links (GitHub, LinkedIn, itch.io, X) are placeholders and should be updated with real URLs.
- The testimonials shown are example content for portfolio demonstration purposes.
## License
 
This project does not have a defined license yet.
 .
