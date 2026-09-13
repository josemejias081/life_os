# 🚀 Guía Rápida de Deploy a GitHub Pages

## Paso 1: Crear el Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `lifeos` (o el que prefieras)
3. **NO** inicialices con README, .gitignore o license (ya los tenemos)
4. Click en "Create repository"

## Paso 2: Subir el Código

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🚀 Initial commit: LifeOS v0.1"

# Cambiar a rama main
git branch -M main

# Conectar con GitHub (REEMPLAZA TU-USUARIO con tu username de GitHub)
git remote add origin https://github.com/TU-USUARIO/lifeos.git

# Subir el código
git push -u origin main
```

## Paso 3: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En "Source", selecciona: **GitHub Actions**
5. ¡Listo! El workflow se ejecutará automáticamente

## Paso 4: Verificar el Deploy

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera ~2 minutos
4. Cuando termine, tu app estará en:
   ```
   https://TU-USUARIO.github.io/lifeos/
   ```

## ✅ ¡Eso es todo!

El workflow está configurado para:
- ✅ Detectar automáticamente el nombre del repositorio
- ✅ Construir la app con el base path correcto
- ✅ Desplegar a GitHub Pages
- ✅ Ejecutarse en cada push a la rama `main`

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios y los subas:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

GitHub Pages se actualizará automáticamente en ~2 minutos.

## 🐛 Solución de Problemas

### La página muestra 404
- Verifica que habilitaste GitHub Pages en Settings → Pages
- Espera unos minutos, el primer deploy puede tardar

### Los estilos no cargan
- Verifica que el workflow se completó exitosamente en la pestaña Actions
- Revisa que el nombre del repositorio en la URL coincide

### Quiero cambiar el nombre del repositorio
- Renombra el repo en GitHub
- El workflow detectará automáticamente el nuevo nombre
- Haz un push para redeployar

## 📱 Acceso Móvil

La app es 100% responsive. Puedes:
- Abrir la URL en tu móvil
- Agregar a pantalla de inicio (iOS/Android)
- Usarla como una PWA (Progressive Web App)

---

**¿Problemas?** Revisa el README.md para más detalles o abre un issue en GitHub.
