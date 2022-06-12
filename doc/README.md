# Making a gallery APP

<!-- Explicación del proceso de desarrollo y justificación (cuál es la
arquitectura, qué técnicas has utilizado, así como todo lo que
creas relevante para nosotras ) -->

Para realizar este proyecto de galería de imágenes se ha optado por un enfoque `full-stack de microservicios:` la aplicación consta de un `back en NodeJS` compuesto de una API con distintos endpoints y un `front realizado en REACT y NEXTJS`, ambos escritos en `Typescript`.

La razón de este stack es la comodidad de escribir una API sólida con diversos endpoints que permita consultar nuestra base de datos desde cualquier punto autorizado. Con respecto al front, un framework como React es perfecto para trabajar de manera eficiente por su alta reutilización de componentes y muy adecuado para desarrollar una aplicación moderna que no requiera constantes refrescos de pantalla desde el cliente, ya que dispone de una actualización automática de los mismos en caso de producirse cualquier cambio en la data. Para facilitar el enrutamiento de las distintas secciones se ha empleado NextJS como bundler que facilite un futuro SEO eficiente de nuestra aplicación.

Ambos servicios están escritos en `Typescript` como lenguaje fuertemente tipado que nos proporciona herramientas para desarrollar un código más robusto, escalable y mantenible.

> `Microservicio`: cuando tenemos una web con compentencias diversas es una práctica recomendable comenzar a compartimentar en distintas actividades o microservicios. Un servicio puede ser el front (pintado de la web) mientras que otro puede constar de la ejecución de un servidor. De esta manera nuestro proyecto será más mantenible en el tiempo y sencillo de escalar.

## Table of Contents

1. [Backend](#backend)
   1. [Server](#server)
   1. [Images](#images)
   1. [Postman](#postman)
1. [Frontend](#frontend)
   1. [REACT](#react)
   1. [NEXTJS](#nextjs)
   1. [Components](#components)
   1. [State](#state)
   1. [\_app](#app)
1. [Conclusion](#conclusion)

## Backend

Comenzamos la aplicación por el back. En lugar de hacer toda una estructura de lógica de proyecto, se emplea un enfoque de `API única`: pequeños endpoints encargados de devolver la información solicitada desde una base de datos para que sea la parte front la responsable de trabajar y pintar la información. De esta manera hacemos una clara diferenciación en cuanto a competencias y responsabilidades, al mismo tiempo que nuestro back se convierte en una herramienta más sencilla y fácil de mantener:

```
api-gallery
├─ .gitignore
├─ README.md
├─ package.json
├─ src
│ ├─ app.ts
│ ├─ bd.ts
│ ├─ config.ts
│ ├─ images
│ │ ├─ Image.model.ts
│ │ ├─ images.api.ts
│ │ └─ seed.images.ts
│ ├─ server.ts
│ └─ types
│ └─ types.ts
├─ tsconfig.json
└─ yarn.lock
```

## Server

La `carpeta de source` pose todas las piezas clave de nuestro servicio back. Se hace especial hincapié en que cada herramienta que emplea este proyecto (servidor, configuraciones, conexiones a bbdd...) esté claramente diferenciada en un documento independiente para que sea más fácil de mantener la herramienta en su conjunto:

- `server.ts`: En este fichero se establece una configuración básica del paquete de npm empleado para ejecutar un servidor en local: (fastify)[https://www.npmjs.com/package/fastify].
- `config.ts`: El archivo de configuración está diseñado para leer las variables de entorno (PORT y DB_URL) con una gramática de typescript y una función checkEnv con carácter defensivo que nos alertará si el desarrollador no ha configurado sus propias variables en el proyecto.
- `bd.ts`: La conexión a la bbdd se realiza en este fichero. Además, la conexión devuelve una función `close_connection` para poder, precisamente, cerrar dicha conexión con el servidor de una manera cómoda en el momento que queramos.
- `app.ts`: Este es el cuerpo principal de la aplicación. Aquí vamos cargando uno a uno todos los pluggins necesarios sobre nuestro servidor fastify: paquetes de reporte de estado, CORS, rutas principales y rutas específicas.

Una vez que el servidor está correctamente funcionando podemos verificar el mismo empleando la sencilla llamada que encontraremos en `routers/main_router.ts`:

```ts
export const main_router: FastifyPluginAsync = async (app) => {
	app.get('/', async () => ({ hello: 'world' }));
};
```

## Images

Las imágenes de este proyecto conforman en sí mismas todo un conjunto de estructuras de información y servicios. Por eso poseen su propia carpeta. En esta misma podremos encontrar:

- `Image.model.ts`: Cuando trabajamos con `bases de datos no relacionales` es importante hacer una buena definición de la estructura que tendrá nuestra data en los documentos. Por ello mismo, empleamos este fichero de modelo dónde estableceremos el esquema que deberán respetar siempre todas las imágenes que se suban al proyecto (nombre del fichero, título, author y userID).
- `seed.images.ts`: Con base en el fichero anterior podemos crear un script que cargue en nuestra bbdd información inicial de prueba sobre la que poder trabajar más adelante desde el front. Este fichero seed posee su propia línea de ejecución `yarn run seed` que abre una conexión con nuestra bbdd, limpia toda la data que encuentre, carga 3 imágenes completas y cierra dicha conexión al tiempo que notifica de todo el proceso en la terminal:

<div align="center" display="flex">
  <img src="../public/yarnrunseed.png" style="margin:2%; width: 25%">
</div>

- `images.api.ts`: En este fichero encontraremos el `CRUD principal` de la aplicación. Aquí se definen y ejecutan todas las llamadas `get, post y delete` a nuestra bbdd. Además, cada una de las llamadas posee sus propios métodos de alerta de errores tanto en la respuesta del servidor como mediante notificaciones en la consola del desarrollador:

```ts
const images_router: FastifyPluginAsync = async (app) => {
	app.addHook(
		'preHandler',
		async (request: FastifyRequest, reply: FastifyReply) => {}
	);
	app.get('/', list_images);
	app.get('/:_id', get_image);
	app.post('/', new_image);
	app.post('/:_id', update_image);
	app.delete('/', delete_all_image);
	app.delete('/:_id', delete_image);
};
```

<div align="center" display="flex">
  <img src="../public/yarnrundev.png" style="margin:2%; width: 25%">
</div>

## Postman

Llegados a este punto del desarrollo, si nuestro trabajo es correcto cuando ejecutemos nuestro servidor con `yarn run dev` en el puerto seleccionado, tendremos disponibles toda una serie de endpoints que nos responderán con la data almacenada en nuestra bbdd. Una de las maneras más cómodas de comprobar los resultados es mediante el cliente [postman](https://www.postman.com/): aquí podemos almacenar todas las llamadas que queramos, configurarlas, guardarlas en carpeta e incluso definir `query parameters ` y estructuras de información en el body de nuestras peticiones.

## Frontend

Una vez desarrollado nuestro back podemos centrarnos en un front que consuma, trabaje y pinte la información almacenada en bbdd. Este apartado de proyecto se ha realizado con [REACT](https://es.reactjs.org/) y [NEXTJS](https://nextjs.org/).

La implementación del front ha seguido un proceso gradual. El primer objetivo es establecer un enrutado básico y los elementos compartidos por toda la aplicación (menú y estilos). Una vez hecho, se procede a un pintado básico de la información de bbdd mediante una fetcher hecho con axios:

```ts
const api_client = axios.create({ baseURL: 'http://127.0.0.1:3001' });
```

Si podemos pintar la información por pantalla, el resto del trabajo consiste en hacer las llamadas correctas y hacer un pintado de la data atractivo desde el front con las herramientas y procesos detallados a continuación.

Cabe destacar la estructura de carpetas del proyecto:

- `components`: carpeta donde encontraremos todos los componentes reutilizables del proyecto.
- `lib`: librería de utilidades como el fetcher, el state general de la aplicación o el tipado de Typescript.
- `pages`: pieza clave para el enrutamiento con NextJS.
- `public`: que sirve los ficheros estáticos de manera temporal (más adelante podríamos modificar estas acciones por llamadas a un servidor de imágenes).
- `style`: centralización de los estilos generales de nuestra app.
- `utils`: la carpeta útiles puede llegar a ser un riesgo para un proyecto, ya que puede tornarse en un "cajón de sastre". En este caso almacenará funciones específicas de apoyo para el funcionamiento del proyecto, como la detección de imágenes en local.

## React

`React` es una librería o framework de frontend especializada en el pintado por pantalla mediante componentes. La principal ventaja de React es que genera su propio DOM (o `DOM en la sombra`): si el DOM creaba un árbol DOM global, el Shadow DOM crea dentro del DOM regular un sub-árbol. Dentro del mismo, los nodos HTML, el CSS y el JS son independientes, siendo esta su principal ventaja, ya que permite la encapsulación de pequeñas partes del documento. Bajo esta premisa, cada vez que un componente de react se actualiza, autmáticamente se ejecutará una reconciliación con el DOM de aquellos elementos modificados: es decir, ya no es necesario recargar constantemente desde cliente para apreciar los cambios en la aplicación sino que `React se encargará por nosotros de actualizar los componentes modificados`.

## NextJS

`NextJS` es un bundler que nos permite crear páginas completamente renderizadas desde el servidor para ser consumidas por el cliente. Dicho de otra manera, NEXTJS nos ayudará a generar páginas con un posicionamiento SEO más eficiente y al mismo tiempo nos facilitará un enrutamiento de nuestros proyectos mucho más sencillo mediante una estructura de carpetas determinada.

## Components

Una de las principales ventajas que posee el framework de React es la creación de entidades visuales o `componentes interactivos y reutilizables`. Dichos componentes aúnan un lenguaje de marcado de etiquetas y código javascript que les permite actualizar su contenido sin necesidad de refrescar la página desde el cliente. El concepto reutilizable es si cabe más importante: un mismo componente bien ejecutado podrá ser empleado cuantas veces queramos a lo largo de nuestro proyecto. Esta centralización de componentes es vital, ya que todos los cambios o correcciones necesarias a futuro se ejecutarán en un único archivo de nuestro proyecto.

Los componentes que encontraremos en este proyecto son un menú, un formulario para añadir imágenes, una lista de imágenes y un componente especial para la carga de la data (ver más adelante).

## State

Otro de los puntos a destacar de los componentes son sus `propiedades`: variables de información que pueden recibir y que emplearán para pintar un resultado u otro. Estas propiedades pueden generarse desde cualquier componente y pasar dicha data a todos sus descendientes (o padres) respetando siempre el orden jerárquico del DOM. No obstante, una jerarquía de componentes demasiado extensa puede acabar suponiendo un proyecto difícil de mantener en el tiempo debido a un exceso de `properting drilling` o `state lifting` (nombre que da la comunidad a este tipo de acciones). Dichas técnicas no malas en sí mismas, pero en el momento en que una web se convierte en una jerarquía con muchos componentes, abusar de dichos métodos puede complicar la calidad y mantenimiento del proyecto. Es por ello por lo que es siempre recomendable acudir al `State`.

El State o Estado de la aplicación es un componente especial que almacena toda la información útil para los componentes (nombre de usuario, imágenes disponibles, funciones compartidas...) y que está al alcance de todos ellos mediante su propio hook.

En lugar de emplear un hook State se ha optado por emplear una librería sintácticamente más sencilla y fácil de trabajar: [react-sweet-state](https://atlassian.github.io/react-sweet-state). El estado general de nuestra aplicación se dividirá en un initialState (`images.ts`) y en una serie de acciones que modificarán dicho estado (`image_actions.ts`).

Estas acciones (load_images, add_image, remove y edit) y la data (o lista de imágenes) estarán disponibles a todos los componentes mediante el hook `useImages()`.

En este momento, tenemos una aplicación en el front que posee distintos componentes, los cuales pueden acceder a una data comun (en este caso las imágenes de bbdd) gracias a un estado compartido y, además, quedan definidos un conjunto de acciones sobre dichas imágenes, ejecutables desde cualquier punto de la jerarquía de nuestros componentes.

## \_app

Como hemos mencionado antes, una de las ventas de NextJS es la generación de enrutamiento dentro de nuestra aplicación mediante su estructura de carpetas. De esta manera, todos los ficheros que se encuentren dentro de la carpeta pages pasarán a ser rutas navegables del proyecto. Es este aspecto, recibe una mención especial el fichero `_app.ts`, ya que constituirá una página compartida por todas las demás páginas de nuestro proyecto, lo que nos permitirá tener un state general, un layout y un CSS global:

```tsx
const App = ({ Component, pageProps }) => (
	<>
		<ThemeProvider theme={lightTheme}>
			<GlobalStyles />
			<header>
				<Menu />
			</header>
			<main>
				<LoadData>
					<Component {...pageProps} />
				</LoadData>
			</main>
		</ThemeProvider>
	</>
);
```

## Conclusion

Considero que el proceso aplicado para la elaboración en este proyecto presenta un ejemplo moderno de desarrollo de webs, no solo con respecto a frameworks y herramientas empleadas, sino en cuanto a metodologías como son los microservicios.

Esta aplicación puede ser fácilmente reconvertida a un proyecto con cualquier temática deseable con un enfoque de SPA o MPA. Además, su estructura de servidor y endpoints hace muy sencillo implementar pluggins de mejora (como identificación de usuario mediante [Auth0](https://auth0.com)).

Por otro lado, un front hecho con NextJS supone un despliegue muy sencillo en producción en (Vercel)[https://vercel.com/], o dockerizar el mismo para hacer un despliegue controlado en [Heroku](https://www.heroku.com/) o [AWS](https://aws.amazon.com/es/).
