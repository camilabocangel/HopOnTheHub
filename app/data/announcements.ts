export interface AnnouncementCardProps {
  id: number;
  image: string;
  description: string;
  date: string;
  campus: string[];
  liked: boolean;
  onLikeToggle: (id: number) => void;
}

export interface Announcement {
  id: number;
  image: string;
  description: string;
  date: string;
  campus: string[];
  like: boolean;
  content: string;
}

export const announcements = [
  {
    id: 1,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Convocatoria a becas de excelencia para el semestre 2025-II.",
    date: "2025-10-05",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 2,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Inscripciones abiertas para el torneo interno de fútbol.",
    date: "2025-10-10",
    campus: ["Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 3,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Ceremonia de graduación programada para diciembre 2025.",
    date: "2025-09-30",
    campus: ["Cochabamba", "La Paz"],
    like: false,
    content: "",
  },
  {
    id: 4,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Se buscan voluntarios para programas de responsabilidad social universitaria.",
    date: "2025-10-12",
    campus: ["Cochabamba"],
    like: false,
    content: "",
  },
  {
    id: 5,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Nueva colección de libros digitales disponible en la biblioteca.",
    date: "2025-10-08",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 6,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Receso académico por Todos Santos.",
    date: "2025-11-01",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 7,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Convocatoria para intercambio estudiantil 2026-I.",
    date: "2025-10-18",
    campus: ["Cochabamba", "La Paz"],
    like: false,
    content: "",
  },
  {
    id: 8,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Mantenimiento programado en la plataforma virtual.",
    date: "2025-10-22",
    campus: ["Santa Cruz", "La Paz"],
    like: false,
    content: "",
  },
  {
    id: 9,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Entrega de carnets universitarios en oficina de Bienestar Estudiantil.",
    date: "2025-09-28",
    campus: ["Cochabamba"],
    like: false,
    content: "",
  },
  {
    id: 10,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Ampliación de plazo para pago de matrículas.",
    date: "2025-10-15",
    campus: ["Cochabamba", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 11,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Exposición de proyectos de arquitectura abierta al público.",
    date: "2025-11-10",
    campus: ["La Paz"],
    like: false,
    content: "",
  },
  {
    id: 12,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Taller gratuito de redacción académica.",
    date: "2025-10-28",
    campus: ["Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 13,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Convocatoria para asistentes de investigación 2025-II.",
    date: "2025-11-05",
    campus: ["Cochabamba"],
    like: false,
    content: "",
  },
  {
    id: 14,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Viaje de estudio a Tiwanaku para la carrera de Historia.",
    date: "2025-11-12",
    campus: ["La Paz"],
    like: false,
    content: "",
  },
  {
    id: 15,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Nueva área de coworking disponible en biblioteca central.",
    date: "2025-10-25",
    campus: ["Cochabamba", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 16,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Concurso de fotografía universitaria abierto a todas las carreras.",
    date: "2025-11-20",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    like: false,
    content: "",
  },
  {
    id: 17,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Entrega de certificados de inglés internacional TOEFL.",
    date: "2025-10-30",
    campus: ["Cochabamba"],
    like: false,
    content: "",
  },
  {
    id: 18,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Se habilitan inscripciones para materias electivas de verano.",
    date: "2025-12-05",
    campus: ["Santa Cruz", "La Paz"],
    like: false,
    content: "",
  },
  {
    id: 19,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Charlas de prevención de estrés académico.",
    date: "2025-11-08",
    campus: ["Cochabamba"],
    like: false,
    content: "",
  },
  {
    id: 20,
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Examen de clasificación de inglés para nuevos estudiantes.",
    date: "2025-10-18",
    campus: ["La Paz", "Santa Cruz"],
    like: false,
    content: "",
  },
];
