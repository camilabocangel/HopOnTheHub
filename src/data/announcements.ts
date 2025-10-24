const announcements = [
  {
    id: 1,
    status: "accepted",
    //publishAt: new Date("2025-09-25T10:00:00Z"),
    image: "https://th.bing.com/th/id/OIP.srRu7kFApqCXvRq3ST_XMQHaE8?w=258&h=180&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3",
    description: "Convocatoria a becas de excelencia para el semestre 2025-II.",
    date: "2025-10-05",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    content:
      "Se ha abierto oficialmente la convocatoria para las **Becas de Excelencia 2025-II**, una oportunidad crucial para estudiantes que demuestran un rendimiento académico sobresaliente y un compromiso con los valores universitarios. Estas becas están diseñadas para reconocer y apoyar el esfuerzo y dedicación de nuestra comunidad estudiantil, cubriendo un porcentaje significativo de la matrícula. Invitamos a todos los postulantes elegibles de los campus de Cochabamba, La Paz y Santa Cruz a revisar detenidamente los requisitos de promedio, el formulario de aplicación y la documentación necesaria." +
      "El proceso de postulación estará abierto por tiempo limitado, y la presentación de documentos se realizará de forma virtual y presencial, según el campus. Se recomienda encarecidamente iniciar el trámite con antelación y asistir a las sesiones informativas que se anunciarán próximamente para resolver cualquier duda. Esta es tu oportunidad de asegurar tu formación con el respaldo de la excelencia académica que promueve la universidad. ¡No dejes pasar esta importante fecha límite!",
  },
  {
    id: 2,
    status: "accepted",
    image: "https://tse2.mm.bing.net/th/id/OIP.fg4SF9oLJJWGEdD06kMWiQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Inscripciones abiertas para el torneo interno de fútbol.",
    date: "2025-10-10",
    campus: ["Santa Cruz"],
    content:
      "¡Atención, campus Santa Cruz! Las inscripciones para el **Torneo Interno de Fútbol** ya están abiertas. Este es tu momento para armar tu equipo, representar a tu carrera o facultad y competir por el título de campeón universitario. El torneo busca promover la actividad física, el compañerismo y el espíritu deportivo entre la comunidad UPB. Pueden inscribirse equipos masculinos y femeninos, compuestos por un mínimo de 7 y un máximo de 12 jugadores." +
      "Los interesados deben llenar el formulario de registro en la oficina de Bienestar Estudiantil y adjuntar la lista de jugadores. El plazo límite de inscripción es la próxima semana, y el fixture se publicará inmediatamente después para dar inicio a la fase de grupos. ¡Asegúrate de que tu equipo esté listo para la acción! Habrá premios y reconocimiento para los primeros puestos. ¡Ven y demuestra tu pasión por el fútbol!",
  },
  {
    id: 3,
    status: "accepted",
    image: "https://th.bing.com/th/id/OIP.ddFikjoOUT6YmFQSv7t33AHaE8?w=266&h=180&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3",
    description: "Ceremonia de graduación programada para diciembre 2025.",
    date: "2025-09-30",
    campus: ["Cochabamba", "La Paz"],
    content:
      "La Dirección Académica tiene el placer de anunciar que la **Ceremonia de Graduación** para la promoción de 2025 ha sido programada para el mes de diciembre. Este magno evento se llevará a cabo en los campus de Cochabamba y La Paz y marca el cierre triunfal de la etapa universitaria de nuestros flamantes profesionales. Se enviará una comunicación individualizada a todos los graduandos elegibles con los detalles exactos de la fecha, hora y lugar." +
      "Es fundamental que los estudiantes que planean graduarse confirmen su asistencia y realicen el pago de derechos de graduación antes de la fecha límite especificada en el correo electrónico. Se realizarán ensayos obligatorios la semana previa a la ceremonia para asegurar que el evento se desarrolle con la solemnidad y organización que se merecen. ¡Esperamos celebrar este importante logro junto a sus familiares y seres queridos!",
  },
  {
    id: 4,
    status: "accepted",
    image: "https://tse1.explicit.bing.net/th/id/OIP.ahmGzM66Ux13oYsb4zb87QHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Se buscan voluntarios para programas de responsabilidad social universitaria.",
    date: "2025-10-12",
    campus: ["Cochabamba"],
    content:
      "La unidad de Responsabilidad Social Universitaria (RSU) del campus Cochabamba está buscando **voluntarios entusiastas** y comprometidos para participar en diversos programas comunitarios durante el resto del semestre. Si deseas aplicar tus conocimientos en proyectos que impacten positivamente a la sociedad en áreas como educación, medio ambiente o salud, esta es tu oportunidad. La participación en RSU es una valiosa experiencia de aprendizaje y servicio." +
      "Los interesados pueden inscribirse en la oficina de RSU o a través del enlace de registro en la intranet. Se requiere una disponibilidad mínima de 4 horas semanales y una alta dosis de compromiso. Los proyectos inician a finales de este mes. Únete a nosotros y contribuye a la transformación social mientras desarrollas habilidades de liderazgo y empatía. ¡Tu energía y talento son cruciales para el cambio!",
  },
  {
    id: 5,
    status: "accepted",
    image: "https://tse2.mm.bing.net/th/id/OIP.w9KlWYeZoEzyVisXjkPIMAHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Nueva colección de libros digitales disponible en la biblioteca.",
    date: "2025-10-08",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    content:
      "¡Grandes noticias para toda la comunidad UPB! Nuestra Biblioteca Central ha adquirido e implementado una **nueva y extensa colección de libros digitales (e-books)**, cubriendo las áreas de Ingeniería, Economía, Ciencias Sociales y Humanidades. Esta colección está disponible inmediatamente para todos los estudiantes, docentes y personal administrativo de los tres campus, ampliando significativamente nuestros recursos de investigación y estudio." +
      "Para acceder a la nueva colección, simplemente ingresa a la plataforma de la Biblioteca Virtual utilizando tus credenciales universitarias. La plataforma permite la lectura en línea y la descarga temporal en dispositivos móviles. Hemos organizado sesiones de capacitación virtual para familiarizarte con las nuevas funcionalidades. ¡Aprovecha estos valiosos recursos para potenciar tu aprendizaje e investigación!",
  },
  {
    id: 6,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Receso académico por Todos Santos.",
    date: "2025-11-01",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    content:
      "Se comunica a toda la comunidad universitaria que se otorgará un **receso académico** con motivo de la festividad de **Todos Santos**. El receso será efectivo el día 1 de noviembre, aplicando a todas las actividades académicas y administrativas en los campus de Cochabamba, La Paz y Santa Cruz." +
      "Las actividades académicas y administrativas se reanudarán de manera regular el 2 de noviembre. Se pide a los estudiantes y docentes tomar las previsiones necesarias para ajustar las entregas de trabajos y exámenes a esta pausa. Les deseamos a todos un tiempo de reflexión y descanso en esta importante fecha cultural.",
  },
  {
    id: 7,
    status: "accepted",
    image: "https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/d1tvgb9eds7paawjpzkv",
    description: "Convocatoria para intercambio estudiantil 2026-I.",
    date: "2025-10-18",
    campus: ["Cochabamba", "La Paz"],
    content:
      "¡Abre tus horizontes académicos! La Dirección de Relaciones Internacionales anuncia la apertura de la convocatoria para el **Programa de Intercambio Estudiantil 2026-I**. Esta oportunidad permite a estudiantes de los campus de Cochabamba y La Paz cursar un semestre en una de nuestras prestigiosas universidades socias en el extranjero, incluyendo destinos en Europa, Norteamérica y Latinoamérica." +
      "Los requisitos clave incluyen tener un promedio académico superior al establecido, haber completado un número mínimo de créditos y demostrar un nivel de idioma requerido (inglés o el idioma del país destino). La documentación detallada se encuentra en la página web de la Dirección. Se realizarán charlas informativas virtuales para resolver dudas sobre el proceso de postulación y las becas de movilidad disponibles. ¡Prepárate para vivir una experiencia global que transformará tu carrera!",
  },
  {
    id: 8,
    status: "accepted",
    image: "https://static.vecteezy.com/system/resources/previews/033/485/860/non_2x/concept-of-system-maintenance-program-and-application-update-technology-engineer-error-problem-fix-device-update-software-upgrade-process-system-update-operating-system-update-vector.jpg",
    description: "Mantenimiento programado en la plataforma virtual.",
    date: "2025-10-22",
    campus: ["Santa Cruz", "La Paz"],
    content:
      "Se informa a la comunidad académica de Santa Cruz y La Paz que se llevará a cabo un **mantenimiento programado** en la plataforma virtual de la universidad (LMS). Esta medida es esencial para optimizar el rendimiento, aplicar actualizaciones de seguridad y mejorar la experiencia del usuario. El mantenimiento se efectuará en la noche del día 22 de octubre." +
      "Durante el periodo de mantenimiento, la plataforma podría presentar interrupciones o estar completamente inaccesible. Se recomienda a docentes y estudiantes **descargar cualquier material** o tarea necesaria antes de la hora indicada. Agradecemos su comprensión mientras trabajamos para ofrecerles un servicio digital más eficiente y seguro.",
  },
  {
    id: 9,
    status: "accepted",
    image: "https://th.bing.com/th/id/OIP._Gg3Ilk7TeK_7Ju8PhTOUAHaE8?w=233&h=180&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3",
    description:
      "Entrega de carnets universitarios en oficina de Bienestar Estudiantil.",
    date: "2025-09-28",
    campus: ["Cochabamba"],
    content:
      "La oficina de Bienestar Estudiantil del campus Cochabamba comunica que se ha iniciado la **entrega de los nuevos carnets universitarios** para los estudiantes que realizaron el trámite en el periodo pasado. Este carnet es indispensable para acceder a diversos servicios dentro y fuera del campus, incluyendo la biblioteca, laboratorios y descuentos estudiantiles." +
      "Los estudiantes pueden recoger su carnet personalmente en la oficina, presentando su cédula de identidad original. El horario de atención para la entrega es de 09:00 a 17:00. Se solicita acudir únicamente en los horarios establecidos para evitar aglomeraciones. La fecha límite para la recolección inicial es el 15 de octubre. ¡No olvides recoger tu carnet!",
  },
  {
    id: 10,
    status: "accepted",
    image: "https://th.bing.com/th/id/OIP.luecSj-eBFN0fzzVHZ7jUQHaE8?w=203&h=135&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3",
    description: "Ampliación de plazo para pago de matrículas.",
    date: "2025-10-15",
    campus: ["Cochabamba", "Santa Cruz"],
    content:
      "Atendiendo a las solicitudes de nuestros estudiantes, la Dirección Financiera de los campus Cochabamba y Santa Cruz anuncia la **ampliación del plazo para el pago de matrículas** correspondientes al presente semestre. El nuevo plazo finaliza el 25 de octubre. Esta medida busca brindar mayor flexibilidad a aquellos que aún tienen pagos pendientes." +
      "Se recuerda que el pago oportuno es un requisito indispensable para la continuidad académica y la habilitación de exámenes finales. Los pagos pueden realizarse en ventanillas del banco o mediante transferencia bancaria. Para cualquier consulta o para revisar el estado de tu cuenta, por favor contacta a la oficina de Cobranzas. ¡Aprovecha la ampliación para regularizar tu situación financiera!",
  },
  {
    id: 11,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Exposición de proyectos de arquitectura abierta al público.",
    date: "2025-11-10",
    campus: ["La Paz"],
    content:
      "La Facultad de Arquitectura del campus La Paz invita a toda la comunidad a la **Exposición de Proyectos de Arquitectura**. Esta muestra anual es una vitrina del talento y la creatividad de nuestros estudiantes, presentando maquetas innovadoras, planos de diseño urbano y propuestas arquitectónicas sostenibles para la ciudad. La exposición estará abierta al público en general en la Galería Central." +
      "Los proyectos seleccionados han sido desarrollados con un fuerte enfoque en la funcionalidad, la estética y la responsabilidad ambiental. Es una excelente oportunidad para interactuar con los futuros arquitectos del país y debatir sobre las tendencias en diseño y construcción. La inauguración contará con un brindis y la presencia de autoridades. ¡Ven y sorpréndete con las visiones que están modelando el futuro de La Paz!",
  },
  {
    id: 12,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Taller gratuito de redacción académica.",
    date: "2025-10-28",
    campus: ["Santa Cruz"],
    content:
      "El Centro de Escritura del campus Santa Cruz ofrecerá un **Taller gratuito e intensivo de Redacción Académica**. Este taller está diseñado para fortalecer las habilidades de los estudiantes en la elaboración de ensayos, informes y trabajos de investigación con rigor y claridad, siguiendo las normas de citación y referenciación más utilizadas (APA, Vancouver)." +
      "El taller se llevará a cabo de forma presencial y está abierto a estudiantes de todas las carreras. Los cupos son limitados y la inscripción es obligatoria a través del enlace de registro. Invertir en tus habilidades de redacción es invertir en el éxito de tu carrera profesional. ¡Aprovecha esta herramienta fundamental para tu vida académica!",
  },
  {
    id: 13,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Convocatoria para asistentes de investigación 2025-II.",
    date: "2025-11-05",
    campus: ["Cochabamba"],
    content:
      "El Vicerrectorado de Investigación del campus Cochabamba convoca a estudiantes de pregrado destacados a postularse para las plazas de **Asistentes de Investigación 2025-II**. Esta posición ofrece la oportunidad de trabajar de cerca con docentes investigadores en proyectos financiados y publicar en revistas académicas, adquiriendo experiencia invaluable en metodología y análisis de datos." +
      "Los requisitos de postulación incluyen tener un alto promedio, demostrar interés en la investigación y presentar una carta de motivación. Los estudiantes seleccionados recibirán un estipendio mensual y un certificado que enriquecerá su perfil profesional. La fecha límite para la presentación de candidaturas es el 15 de noviembre. ¡Impulsa tu carrera en el ámbito de la investigación!",
  },
  {
    id: 14,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Viaje de estudio a Tiwanaku para la carrera de Historia.",
    date: "2025-11-12",
    campus: ["La Paz"],
    content:
      "La carrera de Historia del campus La Paz organiza un **viaje de estudio y exploración a Tiwanaku**, uno de los sitios arqueológicos más importantes de Bolivia. Esta salida académica está diseñada para complementar el aprendizaje en aula con la experiencia directa, permitiendo a los estudiantes interactuar con el patrimonio cultural y profundizar su comprensión de las civilizaciones prehispánicas." +
      "El viaje se llevará a cabo el martes 12 de noviembre y el costo incluye transporte, guía especializado y entrada al sitio. Los interesados deben inscribirse en la Jefatura de Carrera y realizar el pago correspondiente antes del 5 de noviembre. ¡Una oportunidad única para sumergirte en la historia viva de nuestra región!",
  },
  {
    id: 15,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Nueva área de coworking disponible en biblioteca central.",
    date: "2025-10-25",
    campus: ["Cochabamba", "Santa Cruz"],
    content:
      "Pensando en las necesidades de estudio colaborativo, la Biblioteca Central de los campus Cochabamba y Santa Cruz ha inaugurado una **nueva Área de Coworking**. Este espacio moderno está equipado con mesas modulares, tomas de corriente, y Wi-Fi de alta velocidad, diseñado para facilitar el trabajo en equipo, las sesiones de *brainstorming* y el estudio interactivo." +
      "El área de coworking está disponible en el horario regular de la biblioteca. Se solicita a los usuarios mantener el orden y utilizar el espacio para actividades académicas colaborativas. ¡Esperamos que este nuevo recurso contribuya a mejorar su productividad y experiencia universitaria!",
  },
  {
    id: 16,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Concurso de fotografía universitaria abierto a todas las carreras.",
    date: "2025-11-20",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    content:
      "¡Atención fotógrafos de la UPB! Se lanza el **Concurso de Fotografía Universitaria**, un evento abierto a estudiantes de todas las carreras en los tres campus. Este año, el tema central es 'Mi Visión de la Ciudadanía y la Sostenibilidad'. Es una invitación a capturar la realidad boliviana a través del lente, expresando tu perspectiva sobre el entorno y el futuro." +
      "Cada participante puede enviar hasta tres fotografías originales en alta resolución. Un jurado de fotógrafos profesionales evaluará la creatividad, la técnica y la relevancia del mensaje. Habrá premios en efectivo y la exposición de las obras ganadoras. La fecha límite para la recepción de trabajos es el 20 de noviembre. ¡Demuestra tu talento artístico y tu conciencia social!",
  },
  {
    id: 17,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Entrega de certificados de inglés internacional TOEFL.",
    date: "2025-10-30",
    campus: ["Cochabamba"],
    content:
      "La Dirección de Idiomas del campus Cochabamba informa que los **Certificados de Inglés Internacional (TOEFL)** correspondientes a la última sesión de examen ya están disponibles para su entrega. Estos certificados son cruciales para procesos de postulación a posgrados y programas de intercambio internacional." +
      "Los estudiantes que rindieron el examen pueden pasar a recoger su certificado en la oficina de la Dirección de Idiomas, presentando su cédula de identidad. Se ruega verificar los horarios de atención para una entrega expedita. Si un tercero recoge el certificado, deberá presentar una carta de autorización firmada y una copia de la cédula del estudiante.",
  },
  {
    id: 18,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description:
      "Se habilitan inscripciones para materias electivas de verano.",
    date: "2025-12-05",
    campus: ["Santa Cruz", "La Paz"],
    content:
      "La Dirección Académica de los campus Santa Cruz y La Paz anuncia la habilitación de las **inscripciones para materias electivas de verano**. Esta es una excelente oportunidad para avanzar en tu malla curricular, cursar materias de interés complementario o nivelar asignaturas pendientes de forma intensiva antes del inicio del próximo semestre regular." +
      "Las inscripciones se realizarán de manera virtual a través del sistema académico a partir del 5 de diciembre. El cupo es limitado para garantizar la calidad de la enseñanza intensiva. Recomendamos revisar el catálogo de materias ofrecidas y planificar tu inscripción con anticipación. ¡Aprovecha el verano para darle un impulso a tu formación!",
  },
  {
    id: 19,
    status: "accepted",
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    description: "Charlas de prevención de estrés académico.",
    date: "2025-11-08",
    campus: ["Cochabamba"],
    content:
      "La oficina de Bienestar Estudiantil del campus Cochabamba ha organizado una serie de **Charlas de Prevención de Estrés Académico**, especialmente diseñadas para ayudar a los estudiantes a manejar la presión de los exámenes finales y las entregas de proyectos. Profesionales de la salud mental compartirán técnicas de manejo del tiempo, mindfulness y estrategias de afrontamiento." +
      "Las charlas son gratuitas y se llevarán a cabo en el Auditorio Menor en diferentes horarios a lo largo de la semana del 8 de noviembre. No se requiere inscripción previa. Te invitamos a priorizar tu bienestar mental y a aprender herramientas prácticas para afrontar el cierre del semestre con calma y eficiencia.",
  },
  {
    id: 20,
    status: "accepted",
    image: "https://tse3.mm.bing.net/th/id/OIP.PqJOFba8hZ19CaNZVX5sHQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Examen de clasificación de inglés para nuevos estudiantes.",
    date: "2025-10-18",
    campus: ["La Paz", "Santa Cruz"],
    content:
      "Se convoca a todos los **nuevos estudiantes** de los campus La Paz y Santa Cruz a rendir el **Examen de Clasificación de Inglés**. Este examen es obligatorio y determinará el nivel de inicio de los cursos de inglés en el Centro de Idiomas, asegurando que cada estudiante comience en el grupo más adecuado a sus conocimientos." +
      "El examen se realizará de forma virtual y presencial (opcional) el 18 de octubre. Los detalles de acceso al examen virtual serán enviados a su correo electrónico institucional. Es fundamental participar en esta evaluación para poder inscribirte en las materias de idioma. Para cualquier duda, contacta al Centro de Idiomas de tu campus.",
  },
];

export default announcements;
