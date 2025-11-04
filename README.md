# UPB Hub - Mobile App

![UPB Logo](assets/upb.jpg)

## Una aplicación móvil para la gestión de eventos y anuncios universitarios

[![React Native](https://img.shields.io/badge/React_Native-0.73.6-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

## Descripción

UPB Hub es una aplicación móvil desarrollada para la Universidad Privada Boliviana que centraliza la gestión y visualización de eventos y anuncios universitarios. La aplicación permite a estudiantes poder ver lo que ocurre dentro de la universidad y a los administradores crear, editar, aprobar y gestionar contenido institucional de manera eficiente.

## Características Principales

### Para Estudiantes

- Visualización de eventos y anuncios por campus
- Sistema de "me gusta" para guardar contenido favorito
- Notificaciones para eventos creados
- Mapas para ubicación para cada evento y anuncio
- Sistema de "como llegar" a cada campus
- Filtrado por campus y fechas
- Creación de eventos y anuncios (pendientes de aprobación)

### Para Administradores

- Vista de todo lo que tiene el estudiante
- No hay sistema de "me gusta"
- Panel de aprobación/rechazo de eventos y anuncios
- Gestión multi-campus para los tres campus de la UPB
- Edición de contenido de los eventos
- Control de estados (pendiente, aprobado, rechazado, oculto)
- Creación de eventos y anuncios

### Para Usuarios no Registrados

- No hay sistema de "me gusta"
- Filtrado por campus y fechas
- Mapas para ubicación para cada evento y anuncio

## Tecnologías y Librerías

### Core Framework

- **React Native 0.73.6** - Framework principal
- **Expo 50.0.0** - Plataforma de desarrollo
- **TypeScript 5.0.0** - Tipado estático

### Navegación y UI

- **Expo Router** - Navegación basada en file-system
- **React Navigation** - Navegación entre pantallas
- **Expo Vector Icons** - Iconografía consistente

### Backend y Almacenamiento

- **Firebase Firestore** - Base de datos NoSQL (no relacional)
- **Firebase Auth** - Autenticación de usuarios
- **Cloudinary** - Almacenamiento de imágenes
- **Zustand** - Datos locales como el tema de la aplicación

### Notificaciones

- **Expo Notifications** - Sistema de notificaciones push
- **Expo Device** - Detección de características del dispositivo

### UI y Estilos

- **React Native Reanimated** - Animaciones fluidas
- **React Native Maps** - Integración de mapas
- **DateTimePicker** - Selectores de fecha y hora

### Utilidades

- **Expo Image Picker** - Selección de imágenes

## Arquitectura del Proyecto

```bash
HopOnTheHub/
├── Configuración de la App
│   ├── app.json                   # Configuración de Expo
│   ├── package.json               # Dependencias del proyecto
│   ├── tsconfig.json              # Configuración TypeScript
│   ├── .env                       # Variables de entorno
│   ├── .gitignore                 # Archivos ignorados por Git
│   ├── App.tsx                    # Componente principal de la app
│   ├── index.ts                   # Punto de entrada
│   └── yarn.lock                  # Lock de dependencias
│
├── Configuración de Plataformas
│   │
│   └── assets/                    # Recursos multimedia e iconos
│
├── Núcleo de la Aplicación (App/)
│   ├── index.tsx                    # Punto de entrada de rutas
│   ├── _layout.tsx                  # Layout principal
│   │
│   ├── (drawer)/                    # Pantallas principales con navegación drawer
│   │   ├── _layout.tsx              # Layout del drawer
│   │   ├── index.tsx                # Pantalla de inicio
│   │   ├── about.tsx                # Acerca de
│   │   ├── announcements.tsx        # Lista de anuncios
│   │   ├── campus.tsx               # Vista por campus
│   │   ├── career.tsx               # Detalle de carrera
│   │   ├── careers.tsx              # Lista de carreras
│   │   ├── createAnnouncement.tsx   # Crear anuncio
│   │   ├── create_edit_event.tsx    # Crear/editar evento
│   │   ├── events.tsx               # Lista de eventos
│   │   ├── favorites.tsx            # Favoritos
│   │   ├── profile.tsx              # Perfil de usuario
│   │   ├── singleAnnouncement.tsx   # Detalle de anuncio
│   │   └── singleEvent.tsx          # Detalle de evento
│   │
│   └── auth/                      # Autenticación
│       ├── _layout.tsx            # Layout de auth
│       ├── index.tsx              # Login
│       └── register.tsx           # Registro
│
├── Componentes (src/components/)
│   ├── Tarjetas de Contenido
│   │   ├── AnimatedLikeButton.tsx     # Botón de like animado
│   │   ├── AnimatedMarker.tsx         # Marcador animado
│   │   ├── AnnouncementCard.tsx       # Tarjeta de anuncio
│   │   ├── CampusCard.tsx             # Tarjeta de campus
│   │   ├── CreateAnnouncementCard.tsx # Card para crear anuncio
│   │   ├── CreateEventCard.tsx        # Card para crear evento
│   │   ├── DateFilter.tsx             # Filtro de fechas
│   │   ├── EventCard.tsx              # Tarjeta de evento
│   │   ├── EventsPanel.tsx            # Panel de eventos
│   │   ├── Section.tsx                # Componente de sección
│   │   ├── SearchBar.tsx              # Barra de búsqueda
│   │   ├── SubjectCard.tsx            # Tarjeta de materia
│   │   └── seeMoreCreateCard.tsx      # Card ver más
│   │
│   ├── Formularios
│   │   ├── Create_Edit_EventForm.tsx    # Formulario eventos
│   │   └── CreateAnnouncementForm.tsx   # Formulario anuncios
│   │
│   ├── Componentes de Mapa
│   │   ├── GeneralMapModal.tsx          # Modal de mapa general
│   │   ├── MapFilters.tsx               # Filtros de mapa
│   │   ├── MapHeader.tsx                # Header de mapa
│   │   └── MapModal.tsx                 # Modal de mapa principal
│   │
│   ├── Componentes de UI
│   │   ├── FadeView.tsx                 # Animaciones de fade
│   │   ├── LoadingSplash.tsx            # Pantalla de carga
│   │   ├── ScreenTransitionView.tsx     # Transiciones de pantalla
│   │   └── NotificationInitializer.tsx  # Inicializador notificaciones
│
├── Configuración y Servicios (src/config/ & src/services/)
│   ├── config/
│   │   └── firebaseConfig.ts       # Configuración Firebase
│   │
│   └── services/
│       ├── cloudinary.ts           # Servicio de imágenes
│       ├── eventService.ts         # Servicio de eventos
│       ├── notificationService.ts  # Servicio de notificaciones
│       ├── statusUpdateService.ts  # Servicio de actualización de estado
│       └── userService.ts          # Servicio de usuarios
│
├── Hooks Personalizados (src/hooks/)
│   ├── Autenticación y Usuario
│   │   ├── useUser.ts              # Gestión de usuario
│   │   ├── useFirestoreUser.ts     # Usuario desde Firestore
│   │   └── useLikes.ts             # Gestión de likes
│   │
│   ├── Datos y Contenido
│   │   ├── useAnnouncements.ts          # Hook de anuncios
│   │   ├── useCareers.ts                # Hook de carreras
│   │   ├── useEvents.ts                 # Hook de eventos
│   │   ├── useFavorites.ts              # Hook de favoritos
│   │   ├── useHiddenAnnouncements.ts    # Anuncios ocultos
│   │   ├── useLikedAnnouncements.ts     # Anuncios con like
│   │   ├── usePendingAnnouncements.ts   # Anuncios pendientes
│   │   ├── usePendingEvents.ts          # Eventos pendientes
│   │   ├── useRejectedAnnouncements.ts  # Anuncios rechazados
│   │   └── useRejectedEvents.ts         # Eventos rechazados
│   │
│   ├── UI y Animaciones
│   │   ├── useFade.ts                   # Animaciones fade
│   │   ├── useLikeAnimation.ts          # Animación de likes
│   │   ├── useMarkerAnimation.ts        # Animación de marcadores
│   │   ├── usePushNotifications.ts      # Notificaciones push
│   │   ├── useScreenTransition.ts       # Transiciones de pantalla
│   │   └── useThemeColors.ts            # Colores del tema
│
├── Estilos y Temas (src/styles/ & src/theme/)
│   ├── styles/                          # Estilos para la mayorá de archivos tsx
│   │
│   └── theme/
│       └── colors.ts                    # Paleta de colores
│
├── Tipos y Utilidades (src/types/ & src/utils/)
│   ├── types/
│   │   └── types.ts                     # Archivos de types
│   │
│   └── utils/
│       └── campusUtils.ts               # Utilidades de campus
│
├── Helpers y Scripts (src/helpers/ & src/scripts/)
│   ├── helpers/
│   │   ├── announcementIdGenerator.ts   # Generador IDs anuncios
│   │   ├── eventIdGenerator.ts          # Generador IDs eventos
│   │   ├── fetchAnnouncements.ts        # Fetch de anuncios
│   │   ├── fetchCareers.ts              # Fetch de carreras
│   │   ├── fetchEvents.ts               # Fetch de eventos
│   │   └── likeHelpers.ts               # Helpers de likes
│   │
│   └── scripts/
│       ├── importAnnouncementsToFirebase.ts # Importar anuncios
│       ├── importCareersToFirebase.ts       # Importar carreras
│       └── importEventsToFirebase.ts        # Importar eventos
│
├── Datos y Contextos (src/data/ & src/context/)
│   ├── data/
│   │   ├── announcements.ts       # Datos de anuncios (mock)
│   │   ├── careers.ts             # Datos de carreras
│   │   ├── events.ts              # Datos de eventos (mock)
│   │   └── users.ts               # Datos de usuarios (mock)
│   │
│   └── context/
│       └── AuthProvider.tsx       # Proveedor de autenticación
│
└── Estado Global (src/store/)
    ├── useThemeStore.ts           # Estado del tema
    └── useUserStore.ts            # Estado del usuario
 
```

## Configuración e Instalación

### Prerrequisitos

- Node.js 18+
- yarn
- Expo CLI
- Cuenta de Firebase
- Cuenta de Expo

### 1. Clonar el repositorio

```bash
git clone https://github.com/camilabocangel/HopOnTheHub
cd HopOnTheHub
```

### 2. Instalar dependencias

```bash
yarn install
# o simplemente
yarn
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_dominio
EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id

EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
```

### 4. Configurar Firebase

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication (Email/Password)
3. Crear base de datos Firestore

### 5. Ejecutar la aplicación

```bash
yarn start
```

## Sistema de Notificaciones

La aplicación implementa un sistema completo de notificaciones:

### Tipos de Notificaciones

- **Recordatorios de eventos** - 1 hora antes del inicio
- **Cambios de estado** - Cuando un evento es aprobado/rechazado
- **Cambios de estado** - Cuando un anuncio es aprobado/rechazado y tambien cuando es ocultado y mostrado al público

## Estructura de Datos

### Modelo de Evento

```typescript
type Event = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "passed";
  title: string;
  date: string;
  time: string;
  campus: string[];
  place: string;
  category: string;
  description: string;
  image: string;
  content: string;
  attendees: string[];
  createdAt?: any;
  createdBy?: string;
  locations: { lat: number; lng: number }[];
  modality: string;
  creatorPushToken?: string;
};
```

### Modelo de Anuncio

```typescript
type Announcement = {
  id: string;
  status: "pending" | "accepted" | "rejected" | "passed" | "hidden";
  image: string;
  description: string;
  date: string;
  campus: string[];
  content: string;
  createdAt?: any;
  creatorPushToken?: string;
};
```

### Modelo de Usuario

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'normal';
  campus: string;
  pushToken?: string;
  likedEvents: string[];
  likedAnnouncements: string[];
}
```

## Capturas de Pantalla

### Autenticacion y Registro

- #### Log In

![Log In](../HopOnTheHub/assets/screenshots/log_in.jpg)
*Autenticación segura con Firebase Auth*

- #### Registro

![Registro](../HopOnTheHub/assets/screenshots/registro.jpg)
*Formulario de registro con validación*

### Pantallas Principales

- #### Pantalla Principal como Admin

![Adminstrador](../HopOnTheHub/assets/screenshots/pantalla_admin.jpg)
*Panel de control con moderación de contenido, se tiene acceso a todo tipo de evento y anuncio*

- #### Pantalla Principal como estudiante

![Estudiante](../HopOnTheHub/assets/screenshots/pantalla_estudiante.jpg)
*Vista personalizada con su horario y eventos que ocurren en su respectivo campus*

- #### Pantalla Principal sin Iniciar Sesión

![Invitado](../HopOnTheHub/assets/screenshots/pantalla_invitado.jpg)
*Acceso limitado a contenido público (no puede ver horario, a diferencia del estudiante)*

### Filtrados

- #### Filtro por Mapa General

![Mapa General](../HopOnTheHub/assets/screenshots/filtrado_mapa.jpg)
*Vista de todos los campus UPB, además cuenta con varias etiquetas para filtrar a disposición del usuario*

- #### Filtrado por Campus

![Filtrado por Campus](../HopOnTheHub/assets/screenshots/filtrado_campus.jpg)
*Dashboard que contiene eventos y anuncios del campus seleccionado previamente (desde la pantalla principal)*

- #### Filtrado por Tiempo y Nombre (Pantalla de Eventos)

![Eventos](../HopOnTheHub/assets/screenshots/filtrado_nombre_fecha.jpg)
*Formulario para crear/editar eventos*

### Información

- #### Pantalla de Perfil

![Perfil de Usuario](../HopOnTheHub/assets/screenshots/perfil.jpg)
*Gestión de datos personales y preferencias*

- #### Pantalla de Carreras

![Carreras](../HopOnTheHub/assets/screenshots/carreras.jpg)
*Información académica de la universidad*

- #### Pantalla de Materias por Carrera

![Materias](../HopOnTheHub/assets/screenshots/materias.jpg)
*Información académica de cada carrera*

### Gestión de Contenido

- #### Detalle de Evento

![Detalle de Evento](../HopOnTheHub/assets/screenshots/detalle_evento.jpg)
*Información completa con mapa integrado*

- #### Acciones del administrador

![Acciones del Admin](../HopOnTheHub/assets/screenshots/acciones_admin.jpg)
*Aceptar o rechazar eventos*

- #### Formulario de Evento

![Formulario de Evento](../HopOnTheHub/assets/screenshots/crear_evento.jpg)
*Creación y edición de eventos*

### Notificaciones Recibidas

- #### Notificaciones (Estado actualizado y 1 hora pendiente)

![Notificaciones](../HopOnTheHub/assets/screenshots/notificaciones.jpg)
*Notificación cuando el contenido es aprobado/rechazado y recordatorio de una hora*

## Características Técnicas Destacadas

### Implementaciones Completadas

- Autenticación con Firebase Auth

- Creación, edición y lectura de eventos y anuncios

- Sistema de roles (Admin/Usuario)

- Integración de mapas con React Native Maps

- Notificaciones Push con Expo Notifications

- Animaciones fluidas con Reanimated

- Gestión de estado con Zustand

- Persistencia de datos con Firebase Firestore

- Upload de imágenes con Cloudinary

- Navegación con Expo Router

### Features Avanzados

- Búsqueda y filtrado en tiempo real

- Sistema de likes/favoritos persistente

- Geolocalización de eventos en mapas

- Responsive design para diferentes dispositivos

- Tema claro/oscuro consistente

## Autores

- **Joaquin Aguilera** - [Ver Perfil en Github](https://github.com/joackagui)
- **Camila Bocangel** - [Ver Perfil en Github](https://github.com/camilabocangel)

---
