export type EventProps = {
  title: string;
  date: string;
  time: string;
  place: string;
  category: string;
  description: string;
  image: string;
};

export type EventCardProps = {
  title: string;
  date: string;
  time: string;
  place: string;
  category: string;
  description: string;
  image: string;
};

export const events = [
  {
    id: 1,
    title: "Feria de Innovación Tecnológica",
    date: "2025-10-20",
    time: "10:00",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Auditorio Principal",
    category: "Tecnología",
    description:
      "Presentación de proyectos innovadores realizados por estudiantes de la UPB.",
    coverUri: "",
  },
  {
    id: 2,
    title: "Conferencia de Inteligencia Artificial",
    date: "2025-11-02",
    time: "15:00",
    campus: ["Cochabamba"],
    place: "Sala de Conferencias B",
    category: "Académico",
    description:
      "Expertos en IA compartirán las últimas tendencias y aplicaciones en la industria.",
    coverUri: "",
  },
  {
    id: 3,
    title: "Torneo Interno de Fútbol",
    date: "2025-10-15",
    time: "14:00",
    campus: ["Santa Cruz"],
    place: "Cancha UPB",
    category: "Deportivo",
    description:
      "Competencia deportiva entre las diferentes carreras de la universidad.",
    coverUri: "",
  },
  {
    id: 4,
    title: "Concierto Cultural UPB",
    date: "2025-12-01",
    time: "19:00",
    campus: ["Cochabamba", "La Paz"],
    place: "Teatro Universitario",
    category: "Cultural",
    description:
      "Evento cultural con presentaciones musicales y artísticas de estudiantes.",
    coverUri: "",
  },
  {
    id: 5,
    title: "Hackathon UPB 2025",
    date: "2025-11-25",
    time: "08:00",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Laboratorios de Computación",
    category: "Competencia",
    description:
      "Competencia intensiva de programación e innovación con equipos multidisciplinarios.",
    coverUri: "",
  },
  {
    id: 6,
    title: "Charla sobre Emprendimiento",
    date: "2025-10-18",
    time: "11:00",
    campus: ["Cochabamba"],
    place: "Auditorio Menor",
    category: "Emprendimiento",
    description: "Charla motivacional con emprendedores bolivianos de éxito.",
    coverUri: "",
  },
  {
    id: 7,
    title: "Taller de Ciberseguridad",
    date: "2025-11-10",
    time: "09:30",
    campus: ["La Paz"],
    place: "Laboratorio 101",
    category: "Tecnología",
    description:
      "Taller práctico sobre hacking ético y buenas prácticas de seguridad informática.",
    coverUri: "",
  },
  {
    id: 8,
    title: "Feria de Salud Universitaria",
    date: "2025-10-22",
    time: "08:00",
    campus: ["Santa Cruz"],
    place: "Patio Central",
    category: "Salud",
    description: "Jornada de salud gratuita para estudiantes y docentes.",
    coverUri: "",
  },
  {
    id: 9,
    title: "Competencia de Ajedrez",
    date: "2025-11-12",
    time: "14:00",
    campus: ["Cochabamba", "Santa Cruz"],
    place: "Biblioteca Central",
    category: "Deportivo",
    description: "Torneo de ajedrez abierto a toda la comunidad universitaria.",
    coverUri: "",
  },
  {
    id: 10,
    title: "Exposición de Robótica",
    date: "2025-12-05",
    time: "16:00",
    campus: ["Cochabamba"],
    place: "Sala de Exposiciones",
    category: "Tecnología",
    description:
      "Demostraciones de robots diseñados por estudiantes de ingeniería.",
    coverUri: "",
  },
  {
    id: 11,
    title: "Semana de la Ingeniería",
    date: "2025-11-17",
    time: "10:00",
    campus: ["La Paz", "Cochabamba"],
    place: "Múltiples espacios",
    category: "Académico",
    description:
      "Charlas, talleres y exposiciones en celebración de la semana de la ingeniería.",
    coverUri: "",
  },
  {
    id: 12,
    title: "Festival Gastronómico UPB",
    date: "2025-10-28",
    time: "12:00",
    campus: ["Santa Cruz"],
    place: "Comedor Universitario",
    category: "Cultural",
    description:
      "Exposición de gastronomía regional preparada por estudiantes.",
    coverUri: "",
  },
  {
    id: 13,
    title: "Concurso de Programación",
    date: "2025-11-08",
    time: "08:30",
    campus: ["Cochabamba", "La Paz"],
    place: "Laboratorio 202",
    category: "Competencia",
    description: "Competencia de programación estilo ICPC.",
    coverUri: "",
  },
  {
    id: 14,
    title: "Seminario de Blockchain",
    date: "2025-11-14",
    time: "18:00",
    campus: ["Santa Cruz"],
    place: "Auditorio Norte",
    category: "Tecnología",
    description:
      "Discusión sobre el impacto de la tecnología blockchain en la industria financiera.",
    coverUri: "",
  },
  {
    id: 15,
    title: "Maratón Universitaria",
    date: "2025-12-10",
    time: "07:00",
    campus: ["Cochabamba"],
    place: "Ciudad Universitaria",
    category: "Deportivo",
    description: "Carrera universitaria abierta al público.",
    coverUri: "",
  },
  {
    id: 16,
    title: "Encuentro de Egresados",
    date: "2025-12-15",
    time: "18:00",
    campus: ["La Paz", "Santa Cruz"],
    place: "Salón de Eventos",
    category: "Social",
    description: "Reencuentro con egresados de distintas generaciones.",
    coverUri: "",
  },
  {
    id: 17,
    title: "Cine Debate UPB",
    date: "2025-11-21",
    time: "17:30",
    campus: ["Cochabamba"],
    place: "Sala Audiovisual",
    category: "Cultural",
    description: "Proyección de película seguida de un debate académico.",
    coverUri: "",
  },
  {
    id: 18,
    title: "Curso de Machine Learning",
    date: "2025-11-28",
    time: "09:00",
    campus: ["Cochabamba", "Santa Cruz"],
    place: "Laboratorio de Data Science",
    category: "Académico",
    description:
      "Curso intensivo sobre fundamentos de Machine Learning con Python.",
    coverUri: "",
  },
  {
    id: 19,
    title: "Expo Arte Estudiantil",
    date: "2025-10-30",
    time: "10:00",
    campus: ["La Paz"],
    place: "Galería Universitaria",
    category: "Cultural",
    description:
      "Exposición de arte creada por estudiantes de distintas carreras.",
    coverUri: "",
  },
  {
    id: 20,
    title: "Simposio de Energías Renovables",
    date: "2025-12-20",
    time: "09:30",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Centro de Convenciones",
    category: "Académico",
    description:
      "Simposio sobre el futuro de las energías renovables en Bolivia.",
    coverUri: "",
  },
];