# UPB Hub - Mobile App

![UPB Logo](assets/upb.jpg)

## Una aplicación móvil para la gestión de eventos y anuncios universitarios

[![React Native](https://img.shields.io/badge/React_Native-0.73.6-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

## 📱 Descripción

UPB Hub es una aplicación móvil desarrollada para la Universidad Privada Boliviana que centraliza la gestión y visualización de eventos y anuncios universitarios. La aplicación permite a estudiantes y administradores crear, editar, aprobar y gestionar contenido institucional de manera eficiente.

## ✨ Características Principales

### 📅 Para Estudiantes

- Visualización de eventos y anuncios por campus
- Sistema de "me gusta" para guardar contenido favorito
- Notificaciones push para eventos importantes
- Integración con mapas para ubicación de eventos
- Filtrado por campus y categorías

### 👨‍💼 Para Administradores

- Panel de aprobación/rechazo de eventos y anuncios
- Edición de contenido existente
- Gestión de múltiples campus
- Control de estados (pendiente, aprobado, rechazado, oculto)
- Gestión de usuarios y permisos

## 🛠️ Tecnologías y Librerías

### Core Framework

- **React Native 0.73.6** - Framework principal
- **Expo 50.0.0** - Plataforma de desarrollo
- **TypeScript 5.0.0** - Tipado estático

### Navegación y UI

- **Expo Router** - Navegación basada en file-system
- **React Navigation** - Navegación entre pantallas
- **Expo Vector Icons** - Iconografía consistente

### Backend y Almacenamiento

- **Firebase Firestore** - Base de datos NoSQL
- **Firebase Auth** - Autenticación de usuarios
- **Cloudinary** - Almacenamiento de imágenes

### Notificaciones

- **Expo Notifications** - Sistema de notificaciones push
- **Expo Device** - Detección de características del dispositivo

### UI y Estilos

- **React Native Reanimated** - Animaciones fluidas
- **React Native Maps** - Integración de mapas
- **DateTimePicker** - Selectores de fecha y hora

### Utilidades

- **Async Storage** - Almacenamiento local
- **Expo Image Picker** - Selección de imágenes
- **Expo Constants** - Información de la app

## ✏️ Arquitectura del Proyecto

```bash
HopOnTheHub/
├── 📱 Configuración de la App
│   ├── app.json                    # Configuración de Expo
│   ├── package.json               # Dependencias del proyecto
│   ├── tsconfig.json              # Configuración TypeScript
│   └── .env                       # Variables de entorno
│
├── 🔧 Configuración de Plataformas
│   ├── android/                   # Configuración específica de Android
│   └── assets/                    # Recursos multimedia e iconos
│
├── 🎯 Núcleo de la Aplicación (App/)
│   ├── (drawer)/                  # Pantallas principales con navegación drawer
│   │   ├── index.tsx              # Pantalla de inicio
│   │   ├── events.tsx             # Lista de eventos
│   │   ├── announcements.tsx      # Lista de anuncios
│   │   ├── campus.tsx             # Vista por campus
│   │   ├── profile.tsx            # Perfil de usuario
│   │   ├── singleEvent.tsx        # Detalle de evento
│   │   ├── singleAnnouncement.tsx # Detalle de anuncio
│   │   └── create_edit_event.tsx  # Formulario eventos
│   │
│   └── auth/                      # Autenticación
│       ├── index.tsx              # Login
│       └── register.tsx           # Registro
│
├── 🧩 Componentes (src/components/)
│   ├── 🎴 Tarjetas de Contenido
│   │   ├── EventCard.tsx          # Tarjeta de evento
│   │   ├── AnnouncementCard.tsx   # Tarjeta de anuncio
│   │   ├── CampusCard.tsx         # Tarjeta de campus
│   │   └── SubjectCard.tsx        # Tarjeta de materia
│   │
│   ├── 📝 Formularios
│   │   ├── Create_Edit_EventForm.tsx    # Formulario eventos
│   │   └── CreateAnnouncementForm.tsx   #  Formulario anuncios
│   │
│   ├── 🗺️ Componentes de Mapa
│   │   ├── MapModal.tsx           # Modal de mapa principal
│   │   ├── GeneralMapModal.tsx    # Modal de mapa general
│   │   ├── MapFilters.tsx         # Filtros de mapa
│   │   └── AnimatedMarker.tsx     # Marcador animado
│   │
│   ├── 🎨 Componentes de UI
│   │   ├── AnimatedLikeButton.tsx # Botón de like animado
│   │   ├── ScreenTransitionView.tsx # Transiciones de pantalla
│   │   ├── FadeView.tsx           # Animaciones de fade
│   │   ├── Section.tsx            # Componente de sección
│   │   └── SearchBar.tsx          # Barra de búsqueda
│   │
│   └── 🎪 Componentes Especiales
│       ├── CreateEventCard.tsx    # Card para crear evento
│       ├── CreateAnnouncementCard.tsx # Card para crear anuncio
│       └── NotificationInitializer.tsx # Inicializador notificaciones
│
├── ⚙️ Configuración y Servicios (src/config/ & src/services/)
│   ├── config/
│   │   └── firebaseConfig.ts      # Configuración Firebase
│   │
│   └── services/
│       ├── notificationService.ts # Servicio de notificaciones
│       ├── cloudinary.ts          # Servicio de imágenes
│       ├── userService.ts         # Servicio de usuarios
│       └── eventService.ts        # Servicio de eventos
│
├── 🎮 Hooks Personalizados (src/hooks/)
│   ├── 🔐 Autenticación y Usuario
│   │   ├── useUser.ts             # Gestión de usuario
│   │   ├── useFirestoreUser.ts    # Usuario desde Firestore
│   │   └── useLikes.ts            # Gestión de likes
│   │
│   ├── 📊 Datos y Contenido
│   │   ├── useEvents.ts           # Hook de eventos
│   │   ├── useAnnouncements.ts    # Hook de anuncios
│   │   ├── useCareers.ts          # Hook de carreras
│   │   └── usePendingEvents.ts    # Eventos pendientes
│   │
│   ├── 🎨 UI y Animaciones
│   │   ├── usePushNotifications.ts # Notificaciones push
│   │   ├── useScreenTransition.ts # Transiciones de pantalla
│   │   ├── useFade.ts             # Animaciones fade
│   │   └── useThemeColors.ts      # Colores del tema
│   │
│   └── 📍 Mapas y Ubicación
│       ├── useMarkerAnimation.ts  # Animación de marcadores
│       └── useLikeAnimation.ts    # Animación de likes
│
├── 🎨 Estilos y Temas (src/styles/ & src/theme/)
│   ├── styles/
│   │   ├── homeStyles.ts          # Estilos pantalla principal
│   │   ├── eventCardStyles.ts     # Estilos tarjeta evento
│   │   ├── profileStyles.ts       # Estilos perfil
│   │   ├── createEventStyles.ts   # Estilos formulario evento
│   │   └── singleEventStyles.ts   # Estilos detalle evento
│   │
│   └── theme/
│       └── colors.ts              # Paleta de colores
│
├── 📚 Tipos y Utilidades (src/types/ & src/utils/)
│   ├── types/
│   │   └── types.ts               # Definiciones TypeScript
│   │
│   └── utils/
│       └── campusUtils.ts         # Utilidades de campus
│
├── 🛠️ Helpers y Scripts (src/helpers/ & src/scripts/)
│   ├── helpers/
│   │   ├── fetchEvents.ts         # Fetch de eventos
│   │   ├── fetchAnnouncements.ts  # Fetch de anuncios
│   │   ├── eventIdGenerator.ts    # Generador IDs eventos
│   │   └── likeHelpers.ts         # Helpers de likes
│   │
│   └── scripts/
│       ├── importEventsToFirebase.ts      # Importar eventos
│       ├── importAnnouncementsToFirebase.ts # Importar anuncios
│       └── migratePublishAt.ts    # Migración de datos
│
└── 🗃️ Datos y Contextos (src/data/ & src/context/)
    └── data/
        ├── events.ts              # Datos de eventos (mock)
        ├── announcements.ts       # Datos de anuncios (mock)
        └── careers.ts             # Datos de carreras
 
```

## 🚀 Configuración e Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn
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

## 🔔 Sistema de Notificaciones

La aplicación implementa un sistema completo de notificaciones:

### Tipos de Notificaciones

- **Recordatorios de eventos** - 1 hora antes del inicio
- **Cambios de estado** - Cuando un evento es aprobado/rechazado
- **Cambios de estado** - Cuando un anuncio es aprobado/rechazado y tambien cuando es ocultado y mostrado al público

## 📊 Estructura de Datos

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
  likes: string[];
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
  likes: string[];
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

## 📸 Capturas de Pantalla

### Pantalla Principal

![Home Screen](screenshots/home.png)
*Dashboard principal con eventos y anuncios*

### Detalle de Evento

![Event Detail](screenshots/event-detail.png)
*Vista detallada de evento con mapa y acciones*

### Panel de Administración

![Admin Panel](screenshots/admin-panel.png)
*Panel de control para administradores*

### Formulario de Evento

![Event Form](screenshots/event-form.png)
*Formulario para crear/editar eventos*

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👥 Autores

- **Joaquin Aguilera** - [Ver Perfil en Github](https://github.com/joackagui)
- **Camila Bocangel** - [Ver Perfil en Github](https://github.com/camilabocangel)

---
