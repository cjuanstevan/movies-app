# Movies App

Una aplicación Next.js para explorar y descubrir películas, construida con tecnologías web modernas y una interfaz limpia y adaptable.

## API elegida

#### IMDb de [Rapid API](https://rapidapi.com/)

* Elección: Sencilla de integrar, contiene imágenes y varias propiedades que hace que la UI quede muy completa en cuanto a datos. 
* Justificación: Para el ejercicio se prestaba perfectamente ya que solamente necesitaba listar, buscar y ver detalle.

#### Variables de entorno necesarias

* **RAPIDAPI_KEY**: Llave que provee Rapid Api para IMDb. 
* **RAPIDAPI_BASE_URL**: URL base de la API de IMDb.
* **CACHE_MAX_ITEMS**: Cache general (en milisegundos).
* **CACHE_TTL_SEARCH_MS**: Cache de búsquedas (en milisegundos).
* **CACHE_TTL_DETAIL_MS**: Cache de detalles (en milisegundos).

### Intrucciones de instalación y ejecución

#### Local:

##### Clona el repositorio [cjuanstevan/movies-app](https://github.com/cjuanstevan/movies-app.git)

##### 1. Instala las dependencias desde la términal:
cd movies-app
pnpm install


##### 2. Crea un archivo `.env.local` en /apps/web o en la raíz del directorio

##### 3. Agrega las variables de entorno mencionadas en `Variables de entorno necesarias` en archivo .env.local y configúralas

* RAPIDAPI_KEY=
* RAPIDAPI_BASE_URL=
* CACHE_MAX_ITEMS=
* CACHE_TTL_SEARCH_MS=
* CACHE_TTL_DETAIL_MS=

### Ejecución en modo desarrollo

pnpm turbo dev

### Métodos API Internos (TRPC)

GET searchMovies
  - Query params: search
  - Retorna un listado de películas (por defecto el límite está en 20)

GET getItemById
  - Retorna el detalle de la película mediante su id
  - Incluye reparto, sipnosis, etc
  


### Decisiones técnicas
##### Frontend

* ##### Full-stack con Next.js 13+ usando tRPC
* ##### TailwindCSS
* ##### TypeScript
* ##### React Query: Data fetching and caching
* ##### Client & Server components


### Despliegue con Vercel

https://movies-app-web-theta.vercel.app/