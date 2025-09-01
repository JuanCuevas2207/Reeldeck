# Reeldeck
Reto técnico: Catálogo de contenido (estilo Netflix)

Aplicación web construida con **Next.js 14**, **Supabase** y **TailwindCSS** para explorar series agrupadas por género, con navegación a una página de detalle.

---

## 💻 Tecnologías

- [Next.js 14](https://nextjs.org/) – Framework React
- [Supabase](https://supabase.com/) – Base de datos Postgres + API
- [TailwindCSS](https://tailwindcss.com/) – Estilos
- [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Estructura de Archivos

```bash
app/
├── index.tsx # Página principal (lista de géneros y series)
├── details.tsx # Página de detalle de una serie
src/
│── components/
│ └── Carousel.tsx # Sección de género con sus series
│
│── hooks/
│ └── useGenres.ts # Llamados a la tabla genres (generos) en supabase
│ └── useShow.ts # Llamado a la tabla shows en supabase
│
│── lib/
│ └── supabaseClient.ts # Cliente Supabase
```

## 🚀 Como correr el proyecto

1. Clona el repositorio en tu máquina local  
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
2. instalar las dependencia necesarias
   ```bash
   npm install
4. Crea un archivo .env en la raíz del proyecto con tus credenciales de Supabase
   NOTA: PARA FACILIDAD DE EJECUCION, ESTE ARCHIVO YA VIENE CREADO AL CLONAR EL REPOSITORIO.
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=https://<YOUR_SUPABASE_PROJECT>.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
   ```
5. Inicia el servidor de desarrollo en el entorno de preferencia
   * web:
     ```bash
     npm run web
   * Android:
     ```bash
     npm run android
   * IOS:
     ```bash
     npm run ios
6. Si es aplicación web, esta se abrira automaticamente en el navegador. Para dispositivos moviles se debe escanear el QR que aparece en la consola o se debe tener un emulador/dispositivo móvil correspondiente.

## 🗄️ Esquema de Base de Datos

### Tablas principales

```sql
-- Tabla de géneros
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Tabla de series
CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    poster_url TEXT
);

-- Tabla intermedia (muchos a muchos)
CREATE TABLE show_genre (
    show_id INT REFERENCES shows(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (show_id, genre_id)
); 
```

### Consultas realizadas desde react

```sql
-- 1. Obtener todos los géneros
SELECT * FROM genres;

-- 2. Obtener los shows agrupados por género
SELECT 
    g.id AS genre_id,
    g.name AS genre_name,
    s.id AS show_id,
    s.title,
    s.poster_url,
    s.synopsis
FROM genres g
JOIN show_genre sg ON sg.genre_id = g.id
JOIN shows s ON s.id = sg.show_id
ORDER BY g.id, s.id;

-- 3. Obtener detalle de un show específico
SELECT 
    s.id,
    s.title,
    s.poster_url,
    s.synopsis,
    ARRAY_AGG(g.name) AS genres
FROM shows s
JOIN show_genre sg ON sg.show_id = s.id
JOIN genres g ON g.id = sg.genre_id
WHERE s.id = $1
GROUP BY s.id, s.title, s.poster_url, s.synopsis;
```

## ⚙️ Decisiones técnicas

El proyecto fue desarrollado en TypeScript junto con Expo, ya que TypeScript facilita la escritura y mantenimiento del código mientras que Expo permite compilarlo y ejecutarlo en Android, iOS y Web sin mayor complejidad. Para la navegación, se optó por expo-router en lugar de @react-navigation. La primera no mantiene el estado al refrescar la página, mientras que expo-router permite resolverlo pasando únicamente el ID de la serie en la ruta y haciendo un fetch a la base de datos para recuperar toda su información.

En cuanto al manejo de estado y conexión a Supabase, se usaron useEffect y useState. El fetch devuelve error si la conexión falla o la consulta no es válida, y en caso contrario se actualiza el estado con los datos obtenidos. La base de datos tiene tres tablas (genres, shows, show_genre) con llaves foráneas en la intermedia para conectar los géneros con los shows. Todas las tablas tienen políticas de solo lectura, y la conexión se realiza con la URL y la anon key de Supabase.

##  🤖 Uso de IA en el desarrollo

La IA se utilizó principalmente para generar más rápido las vistas ubicadas en la carpeta app/ enviando imágenes de referencia a ChatGPT, así como para generar estructuras iniciales de archivos .tsx con Replit AI. Esto permitió ahorrar tiempo en la maquetación.

Para el resto de archivos, se utilizó GitHub Copilot en VS Code únicamente como apoyo para autocompletar código. En general, la IA fue una herramienta de aceleración pero no reemplazó la lógica principal.

## 🔮 Qué haría con más tiempo

Si contara con más tiempo, me enfocaría en:

- Mejorar el diseño y hacerlo responsive para diferentes tamaños de pantalla.
- Agregar los capítulos a la base de datos.
- Incluir una funcionalidad para guardar shows en favoritos.
- Implementar URLs más limpias y únicas para compartir sin exponer directamente los IDs de la DB.
- Reducir lógica en las vistas creando más componentes reutilizables.
- Incorporar IA para clasificar automáticamente los géneros de los shows sin necesidad de registrar manualmente cada relación.
- Mejorar la gestión de errores mostrando mensajes más amigables al usuario.
- Agregar tests unitarios e integración para garantizar calidad en las futuras versiones.
- Configurar CI/CD con GitHub Actions para automatizar despliegues y pruebas.
