# 🚀 LifeOS - Sistema Operativo Personal

> "No administres tu tiempo. Dirige tu vida."

LifeOS es un sistema operativo personal que ayuda a dirigir tu vida con la misma claridad y estructura con la que una empresa dirige su negocio.

## 🎯 Características

- **Modo Amanecer**: Pantalla de bienvenida diaria con tu Focus y misión
- **Sesiones de Trabajo**: Timer con modo Focus para trabajo profundo
- **Proyectos**: Gestión de proyectos con misiones y hitos
- **Revisiones Semanales**: Solo 3 preguntas para reflexionar
- **Diseño Moderno**: Dark mode, glassmorphism, animaciones fluidas

## 🛠️ Stack Técnico

- **TypeScript** + **React 18**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Framer Motion** (animaciones)
- **Lucide React** (iconos)

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/lifeos.git
cd lifeos

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Deploy a GitHub Pages

### Opción 1: Deploy Automático (Recomendado)

Este proyecto ya incluye un workflow de GitHub Actions que despliega automáticamente.

**Pasos:**

1. **Crear repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LifeOS v0.1"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/lifeos.git
   git push -u origin main
   ```

2. **Configurar el base path** (IMPORTANTE)
   
   Edita `vite.config.js` y agrega la línea `base`:
   ```javascript
   export default defineConfig({
     base: '/lifeos/', // ← Agrega esta línea con el nombre de tu repo
     plugins: [react(), tailwindcss()],
     // ... resto del código
   });
   ```

3. **Habilitar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   - Guarda

4. **Esperar el deploy**
   - El workflow se ejecutará automáticamente
   - En ~2 minutos tu app estará en: `https://TU-USUARIO.github.io/lifeos/`

### Opción 2: Deploy Manual

Si prefieres hacer el build y subirlo manualmente:

```bash
# Build
npm run build

# La carpeta dist/ está lista para subir
# Puedes subirla a la rama gh-pages
```

## 📁 Estructura del Proyecto

```
lifeos/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── types/
│   │   └── index.ts            # Modelo de dominio
│   ├── store/
│   │   └── index.ts            # Lógica de negocio
│   ├── pages/
│   │   ├── DawnPage.tsx        # Modo Amanecer
│   │   ├── HomePage.tsx        # Dashboard
│   │   ├── ProjectsPage.tsx    # Proyectos
│   │   ├── SessionsPage.tsx    # Sesiones
│   │   ├── SessionActivePage.tsx # Timer
│   │   └── ...
│   ├── App.tsx                 # Router principal
│   └── index.css               # Estilos globales
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Filosofía de Diseño

- **Una vida antes que una lista de tareas**
- **Un proyecto principal a la vez** (Focus)
- **Session es el corazón operativo**
- **Cada pantalla responde UNA sola pregunta**
- **Cero ansiedad, máxima claridad**

## 🔄 Roadmap

- [x] v0.1 - MVP con dominio completo
- [ ] v0.5 - Backend con Supabase
- [ ] v0.6 - Sincronización multi-dispositivo
- [ ] v0.7 - Métricas y gráficos
- [ ] v1.0 - Versión estable con todas las features

## 📝 Licencia

MIT

---

**"Construye la vida que imaginas, una sesión de trabajo a la vez."**
