export type EventProps = {
  id: number;
  title: string;
  date: string;
  time: string;
  campus: string[];
  place: string;
  category: string;
  description: string;
  image: any;
  content: string;
};

export type EventCardProps = {
  id: number;
  title: string;
  date: string;
  time: string;
  place: string;
  category: string;
  description: string;
  image: any;
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "La Feria de Innovación Tecnológica de la UPB es el evento cumbre donde la creatividad y el rigor académico de nuestros estudiantes de diversas facultades convergen. Este año, la feria promete ser un espacio vibrante de descubrimiento, presentando proyectos que abordan desafíos reales en áreas como la sostenibilidad, la salud digital y la automatización industrial. Los asistentes tendrán la oportunidad de interactuar directamente con los creadores, entendiendo el proceso de desarrollo e impacto potencial de cada innovación." +
      "Este evento no solo celebra el talento interno, sino que también fomenta la vinculación con el sector empresarial. Inversionistas, líderes de la industria y el público en general están invitados a presenciar el futuro tecnológico que se está gestando en la universidad. Habrá demostraciones en vivo, paneles de discusión con jueces expertos y una ceremonia de premiación a los proyectos más disruptivos y con mayor potencial de mercado." +
      "La feria se llevará a cabo simultáneamente en los campus de Cochabamba, La Paz y Santa Cruz, conectados por transmisiones en vivo y una plataforma virtual para asegurar una experiencia integral y nacional. Es una cita obligada para quienes deseen estar al tanto de las últimas tendencias en la innovación boliviana y para reclutar a los futuros líderes tecnológicos del país. ¡No te pierdas la oportunidad de ver la tecnología de mañana hoy!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Conferencia de Inteligencia Artificial de este año se centrará en el impacto transformador de la IA Generativa, el Aprendizaje Profundo y la Ética en los Algoritmos. Hemos reunido a un panel de destacados expertos nacionales e internacionales con experiencia en gigantes tecnológicos y startups de alto impacto. La agenda incluye ponencias magistrales que desglosarán cómo la IA está redefiniendo sectores clave como la banca, la medicina y la educación." +
      "Los participantes tendrán la oportunidad de sumergirse en casos de estudio reales y aprender sobre la implementación práctica de modelos de IA en el contexto empresarial boliviano. Se abordarán temas cruciales como la gobernanza de datos, el desarrollo de modelos de lenguaje natural (NLP) adaptados al español y lenguas nativas, y los desafíos de la automatización inteligente." + 
      "Este encuentro académico está diseñado para estudiantes, profesionales de TI, investigadores y tomadores de decisiones que busquen una comprensión profunda de las herramientas y estrategias necesarias para liderar en la era de la inteligencia artificial. Además de las charlas, habrá un espacio de networking para facilitar la colaboración y el intercambio de conocimientos.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "¡Prepárense para el evento deportivo más esperado del semestre! El Torneo Interno de Fútbol es una tradición en la UPB-Santa Cruz, que une a estudiantes de todas las carreras en una sana y emocionante competencia. Este torneo fomenta el espíritu de equipo, el compañerismo y la vida activa, permitiendo a los participantes tomarse un descanso de los estudios y liberar energías en la cancha. Los equipos representarán a sus respectivas facultades, luchando por la gloria y el trofeo universitario." +
      "Los partidos se llevarán a cabo en la Cancha UPB, conocida por sus excelentes instalaciones. Se espera una gran afluencia de público, con barras organizadas por cada carrera, creando un ambiente festivo y lleno de adrenalina. El sistema de juego será por eliminatorias, garantizando partidos intensos desde la fase inicial hasta la gran final. Se premiará al equipo campeón, al goleador del torneo y al arquero menos batido." + 
      "Animamos a toda la comunidad universitaria a asistir y apoyar a sus equipos favoritos. Este evento va más allá del deporte; es una celebración de la unidad y el orgullo UPB. Además de los partidos, habrá stands de hidratación y música para mantener la energía. ¡Ven y demuestra que tu carrera no solo es la mejor en las aulas, sino también en el campo de juego!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Concierto Cultural UPB es una vitrina del vasto talento artístico que reside en nuestra comunidad estudiantil. La noche promete ser un despliegue de diversas expresiones culturales, incluyendo interpretaciones musicales (desde clásica hasta rock), danzas folklóricas y contemporáneas, y actos de teatro breve. Este evento subraya el compromiso de la universidad con una formación integral, valorando las artes como un pilar fundamental del desarrollo humano." +
      "El majestuoso Teatro Universitario será el escenario que acogerá estas presentaciones en los campus de Cochabamba y La Paz, ofreciendo una acústica impecable y un ambiente íntimo para que los artistas brillen. Los estudiantes han estado ensayando arduamente durante meses, preparando repertorios originales y coreografías impactantes. Es una oportunidad única para apreciar la calidad y la diversidad de las expresiones artísticas cultivadas fuera de las aulas." +
      "Invitamos a toda la familia UPB, amigos y público de la ciudad a disfrutar de esta velada inolvidable. El Concierto Cultural no es solo entretenimiento; es una experiencia que enriquece el alma y fortalece la conexión con nuestra identidad. Las entradas se podrán adquirir una semana antes en las oficinas de Bienestar Estudiantil, y parte de la recaudación se destinará a un fondo para el desarrollo de futuras actividades culturales.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Hackathon UPB 2025 es un desafío de 24 horas ininterrumpidas donde mentes brillantes de ingeniería, diseño, y negocios se unen para crear soluciones tecnológicas innovadoras. Los equipos multidisciplinarios trabajarán bajo presión para desarrollar prototipos funcionales que respondan a problemas específicos planteados por empresas patrocinadoras y la propia universidad, en áreas como la educación digital, la logística urbana y la inclusión financiera." + 
      "Esta maratón de desarrollo no solo pondrá a prueba las habilidades de programación y diseño de los participantes, sino también su capacidad de trabajo en equipo, gestión del tiempo y presentación de ideas (pitch). Contaremos con la presencia de mentores expertos de la industria que guiarán a los equipos, ofreciendo feedback técnico y estratégico. La energía de los Laboratorios de Computación, equipados con la última tecnología en los tres campus, será el motor de este evento." + 
      "Al finalizar, los proyectos serán evaluados por un jurado de alto nivel. Hay premios significativos para los primeros lugares, incluyendo capital semilla para el desarrollo del proyecto, pasantías y equipos tecnológicos. El Hackathon UPB es el lugar ideal para transformar una idea brillante en un producto viable en tiempo récord y para ser reclutado por empresas que buscan talento proactivo e innovador. ¡Inscríbete y acepta el desafío!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Charla sobre Emprendimiento reunirá a un grupo selecto de emprendedores bolivianos de éxito que han logrado consolidar sus negocios a nivel nacional e incluso internacional. Este evento está diseñado para inspirar a la próxima generación de líderes y startups de la UPB. Los oradores compartirán sus historias de fracasos y éxitos, revelando las estrategias que les permitieron superar obstáculos en el competitivo ecosistema empresarial boliviano." + 
      "Los temas centrales girarán en torno a la resiliencia empresarial, la captación de inversión ángel, la creación de una cultura de innovación y el escalamiento de negocios en mercados emergentes. Esta será una oportunidad inestimable para obtener consejos prácticos y conocimientos de primera mano sobre lo que realmente se necesita para convertir una idea ambiciosa en un negocio rentable y sostenible. Se enfocará en casos bolivianos para asegurar la relevancia del contexto." + 
      "Después de las ponencias, habrá una sesión de preguntas y respuestas (Q&A) donde los asistentes podrán interactuar directamente con los emprendedores y resolver sus dudas sobre planes de negocio, marketing digital y gestión financiera. Si sueñas con crear tu propia empresa o buscas darle un giro innovador a tu carrera, esta charla te proporcionará la motivación y las herramientas necesarias para dar el primer gran paso.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Taller de Ciberseguridad es un evento intensivo y práctico diseñado para dotar a los participantes de las habilidades necesarias para proteger sistemas y datos en un mundo cada vez más digital. Impartido por un experto en seguridad ofensiva y defensiva, el taller se centrará en los fundamentos del hacking ético, enseñando a pensar como un atacante para fortalecer las defensas." +
      "Los asistentes trabajarán con herramientas reales en un entorno de laboratorio controlado en el campus de La Paz. La agenda incluye módulos sobre detección de vulnerabilidades (penetration testing), cifrado de datos, y técnicas de mitigación contra ataques comunes como phishing y ransomware. La meta es que, al finalizar, los participantes puedan identificar y corregir fallas de seguridad en redes y aplicaciones web, aplicando las buenas prácticas de seguridad informática a nivel profesional." + 
      "Este taller está dirigido a estudiantes de ingeniería de sistemas, desarrolladores de software y cualquier profesional que maneje información sensible y desee profundizar sus conocimientos en seguridad. Se recomienda traer una computadora portátil. ¡Asegura tu lugar y conviértete en un defensor digital! Es una inversión crucial para la carrera en el panorama tecnológico actual.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Feria de Salud Universitaria es una iniciativa de Bienestar Estudiantil destinada a promover estilos de vida saludables entre la comunidad UPB de Santa Cruz. Durante esta jornada gratuita, se ofrecerán una variedad de servicios de chequeo y prevención médica en el Patio Central, transformándolo en un centro de salud temporal." +
      "Entre los servicios disponibles se incluyen mediciones de presión arterial, control de glucemia, valoración nutricional con dietistas, y tests rápidos de VIH. Además, habrá stands informativos sobre salud mental, prevención de adicciones y primeros auxilios. Nuestro equipo médico y estudiantes de carreras afines estarán disponibles para responder preguntas y proporcionar consejería personalizada sobre el manejo del estrés académico y la importancia del sueño." + 
      "La feria también contará con actividades interactivas como clases de aeróbicos y demostraciones de técnicas de relajación. Es un recordatorio de que la salud física y mental es la base del éxito académico. Anímate a participar; tu bienestar es nuestra prioridad. ¡Invierte una mañana en tu salud!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Competencia de Ajedrez invita a jugadores de todos los niveles a poner a prueba su intelecto y estrategia. Este torneo, abierto a toda la comunidad universitaria (estudiantes, docentes y personal administrativo), celebra al 'deporte ciencia' como una disciplina que agudiza la mente y fomenta la toma de decisiones lógicas y anticipadas. Se llevará a cabo en la tranquila atmósfera de la Biblioteca Central en los campus indicados para garantizar la concentración de los competidores." + 
      "Se utilizará un sistema de competición suizo o de eliminación directa, dependiendo del número de inscritos, con partidas rápidas para mantener la intensidad. Los participantes competirán por el título de Campeón Universitario de Ajedrez y por premios que incluyen libros de estrategia y materiales de ajedrez. Más allá de la competencia, es una excelente oportunidad para practicar el pensamiento crítico y la paciencia." + 
      "El evento también contará con una sección de partidas simultáneas con un maestro local invitado, ofreciendo un desafío para los más experimentados y una gran lección para los principiantes. Si crees tener la mente más aguda de la UPB, inscríbete y demuestra tu dominio en las 64 casillas. La estrategia espera por ti.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Exposición de Robótica es el clímax del semestre para los entusiastas de la ingeniería y la mecatrónica en el campus Cochabamba. En la Sala de Exposiciones, los estudiantes de la UPB presentarán sus creaciones, fruto de meses de diseño, programación y ensamblaje. La exposición mostrará una amplia gama de proyectos, desde robots móviles autónomos para logística hasta soluciones robóticas aplicadas a la agricultura de precisión y la asistencia médica." +
      "Los asistentes podrán observar demostraciones en vivo, donde los robots ejecutarán tareas complejas, mostrando su precisión y la sofisticación de sus algoritmos. Los propios creadores estarán presentes para explicar los desafíos técnicos superados y el potencial de sus inventos para el mercado boliviano. Un panel de expertos evaluará los proyectos, destacando la originalidad y la funcionalidad." + 
      "Esta es una actividad perfecta para estudiantes de secundaria, padres y cualquier persona interesada en el futuro de la automatización. La exposición busca inspirar a más jóvenes a incursionar en la ciencia y la tecnología. Además, se premiará el robot más innovador y el de mayor impacto social. ¡Ven y sorpréndete con la destreza de la ingeniería estudiantil!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Semana de la Ingeniería es un evento anual dedicado a celebrar la innovación, la creatividad y el rigor científico de las disciplinas de ingeniería en la UPB. A lo largo de cinco días, los campus de La Paz y Cochabamba se llenarán de actividades diseñadas para enriquecer la formación de los futuros ingenieros y mostrar el impacto de la ingeniería en la sociedad." + 
      "El programa es extenso e incluye charlas magistrales de líderes del sector, talleres prácticos sobre software especializado (como CAD y simulaciones), visitas guiadas a laboratorios de última generación y competencias de diseño. Se cubrirán las diversas ramas, desde la ingeniería civil y eléctrica hasta la ingeniería de software y industrial. Es una oportunidad de oro para interactuar con el cuerpo docente y alumni de éxito." + 
      "El evento culminará con una ceremonia de reconocimiento a los estudiantes más destacados y la presentación de los proyectos de fin de carrera más prometedores. La Semana de la Ingeniería busca inspirar, conectar y proporcionar herramientas prácticas para el crecimiento profesional. Asegúrate de revisar la agenda detallada por campus para no perderte las actividades de tu interés.",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Festival Gastronómico UPB transforma el Comedor Universitario de Santa Cruz en un vibrante mercado de sabores y culturas. Este evento es una celebración de la rica y diversa gastronomía boliviana y regional, con cada stand representando una fusión de tradiciones y creatividad culinaria. Los estudiantes, con gran pasión y esmero, prepararán y expondrán platillos típicos y fusiones innovadoras." + 
      "Los asistentes podrán degustar desde las especialidades de la Amazonía y el Altiplano hasta las delicias del Oriente boliviano, incluyendo postres y bebidas artesanales. El festival es una plataforma para que los estudiantes muestren sus talentos culinarios, promuevan la cultura alimentaria sostenible y, en muchos casos, recauden fondos para sus actividades académicas o proyectos sociales. Un jurado de chefs locales evaluará la creatividad, el sabor y la presentación de los platos." + 
      "Además de la comida, el ambiente estará animado con música tradicional y actividades culturales. Es una excelente manera de compartir en comunidad y honrar las raíces culinarias. Ven con el estómago vacío y el espíritu abierto a experimentar una explosión de sabor y cultura. ¡Una fiesta para el paladar que no te puedes perder!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
    "El Concurso de Programación UPB es la prueba definitiva de las habilidades algorítmicas y de resolución de problemas. Siguiendo el prestigioso formato ICPC (International Collegiate Programming Contest), equipos de estudiantes se enfrentarán a un conjunto de problemas complejos que deberán resolver mediante la programación de soluciones eficientes en un límite de tiempo estricto." + 
    "La competencia fomenta el pensamiento lógico, la destreza en la codificación y la colaboración bajo presión. Los equipos trabajarán codo a codo en el Laboratorio 202, con solo una computadora por equipo para simular las condiciones reales de las competencias internacionales. El ambiente será de intensa concentración y camaradería, con una tabla de clasificación en tiempo real que añadirá dramatismo a la jornada." + 
    "Los ganadores no solo recibirán premios tecnológicos, sino también el reconocimiento de ser los programadores más rápidos y efectivos de la universidad. Este concurso es fundamental para identificar y preparar a los equipos que representarán a la UPB en futuras competencias nacionales e internacionales. ¡Demuestra tu dominio del código y lleva a tu equipo a la victoria!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Seminario de Blockchain abordará la tecnología que está revolucionando no solo las finanzas (FinTech), sino también la logística, la gobernanza y la propiedad digital. Este evento está dirigido a desmitificar la tecnología blockchain y sus aplicaciones prácticas, más allá de las criptomonedas, centrándose en el desarrollo de contratos inteligentes (Smart Contracts) y la seguridad de las cadenas de suministro." + 
      "Expertos en economía digital y desarrollo web3 compartirán sus perspectivas sobre el potencial de la tecnología en Bolivia y la región. Se presentarán casos de uso de blockchain empresarial y cómo esta tecnología puede mejorar la transparencia y la eficiencia en diversos procesos. La sesión será altamente interactiva, con espacio para debatir sobre los marcos regulatorios necesarios para su adopción masiva." + 
      "Tanto si eres un estudiante de finanzas interesado en la disrupción, como un desarrollador que busca especializarse en solidity, este seminario te proporcionará una visión integral de las oportunidades y desafíos. Es una excelente oportunidad para networking con profesionales que están a la vanguardia de esta tecnología. ¡Aprende a construir sobre la confianza digital del futuro!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Maratón Universitaria es un evento atlético que promueve el deporte y la vida saludable, invitando a la participación de estudiantes, docentes, alumni y público en general. La ruta, diseñada para ser desafiante y escénica, recorrerá los alrededores de la Ciudad Universitaria de Cochabamba, ofreciendo distancias para corredores de todos los niveles (p. ej., 5K y 10K)." + 
      "El evento se llevará a cabo a primera hora de la mañana para aprovechar el clima fresco y fomentar una jornada de actividad física. Todos los inscritos recibirán un kit de corredor que incluye una camiseta conmemorativa, un dorsal y un chip de cronometraje. Habrá puestos de hidratación y asistencia médica a lo largo del recorrido para garantizar la seguridad de todos los participantes." + 
      "La maratón culminará con una ceremonia de premiación a los ganadores por categoría y sexo. Es más que una carrera; es una celebración de la disciplina y el espíritu comunitario. Anímate a establecer un nuevo récord personal o simplemente a disfrutar de la energía de miles de personas corriendo juntas por la salud. ¡Ponte tus zapatillas y corre con el espíritu UPB!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Encuentro de Egresados es el evento social más importante del año, diseñado para reconectar a la vibrante red de alumni de la UPB. Se llevará a cabo simultáneamente en los campus de La Paz y Santa Cruz, en un ambiente elegante y festivo. Este reencuentro es una oportunidad invaluable para fortalecer la comunidad, compartir experiencias profesionales y revivir los mejores momentos de la vida universitaria." + 
      "La velada incluirá un cóctel de bienvenida, discursos inspiradores de egresados destacados que han alcanzado el éxito en sus respectivos campos y música en vivo. El enfoque principal será el networking intergeneracional, facilitando que los alumni establezcan contactos profesionales que puedan llevar a colaboraciones, mentorías o nuevas oportunidades de negocio. Es un espacio para celebrar los logros de la red UPB." + 
      "Invitamos a todas las generaciones, desde los recién graduados hasta aquellos con décadas de trayectoria, a unirse a esta celebración. Tu experiencia es un activo valioso para la universidad y para los egresados más jóvenes. Confirma tu asistencia con anticipación para asegurar tu lugar. ¡Esperamos verte para celebrar tu trayectoria y el futuro de la UPB!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Cine Debate UPB es un espacio cultural y académico que utiliza el cine como punto de partida para una profunda reflexión sobre temas sociales, éticos y políticos de actualidad. La película seleccionada para esta edición es una obra aclamada que desafía la percepción y obliga a cuestionar la realidad. La proyección se realizará en la cómoda Sala Audiovisual del campus Cochabamba." +
      "Inmediatamente después de la película, se llevará a cabo un debate moderado por un docente experto de la facultad de Humanidades o Ciencias Sociales. Este debate permitirá a los asistentes analizar la narrativa fílmica, el simbolismo y las implicaciones filosóficas del film, facilitando un diálogo abierto y respetuoso sobre las problemáticas planteadas. Es una actividad que fomenta el pensamiento crítico y la expresión de diversas perspectivas." + 
      "Este evento está abierto a toda la comunidad y es especialmente recomendable para quienes disfrutan de la crítica cinematográfica y el análisis profundo. El Cine Debate busca trascender el entretenimiento, convirtiéndose en una herramienta educativa y de enriquecimiento cultural. Te invitamos a ver la película no solo con los ojos, sino también con la mente abierta. ¡Prepárate para un diálogo estimulante!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "El Curso de Machine Learning es un bootcamp intensivo de un día diseñado para proporcionar una base sólida en los algoritmos y las técnicas fundamentales del Aprendizaje Automático, utilizando Python como lenguaje de programación principal. Este curso práctico es esencial para cualquier estudiante o profesional que busque entrar en el campo de la Ciencia de Datos y la Inteligencia Artificial." +
      "El temario cubrirá la Regresión Lineal y Logística, Árboles de Decisión, y una introducción a Neural Networks. Los participantes trabajarán en el Laboratorio de Data Science, equipado con software y hardware potentes. El enfoque será hands-on, dedicando la mayor parte del tiempo a ejercicios de codificación y a la implementación de modelos predictivos con librerías populares como Scikit-learn y TensorFlow." + 
      "Se requiere conocimiento básico de programación en Python. El curso es impartido por un investigador con experiencia en aplicaciones industriales de IA. Los cupos son limitados para garantizar una atención personalizada. ¡Aprende a predecir el futuro con datos y potencia tu currículum con una de las habilidades más demandadas del siglo XXI!",
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
      "La Expo Arte Estudiantil convierte la Galería Universitaria de La Paz en un crisol de creatividad visual. Esta exposición anual celebra el talento artístico de los estudiantes de la UPB, demostrando que la pasión por el arte florece en todas las carreras, desde ingeniería hasta derecho. La muestra incluirá una amplia gama de disciplinas: pintura, escultura, fotografía, arte digital y videoarte." + 
      "Las obras expuestas reflejan las inquietudes, las visiones y las perspectivas únicas de la juventud boliviana, abordando temas que van desde la identidad cultural hasta los desafíos sociales contemporáneos. Los artistas estarán presentes durante la inauguración para discutir sus técnicas, inspiraciones y el proceso detrás de sus creaciones. Un comité de la universidad otorgará menciones a las obras más destacadas." + 
      "Invitamos a toda la comunidad a visitar la galería y a apoyar el desarrollo cultural de nuestros estudiantes. El arte es una forma poderosa de comunicación y expresión, y esta exposición es una ventana a la mente creativa de la próxima generación. Además, algunas de las obras estarán disponibles para su venta. ¡Sumérgete en el mundo del arte estudiantil y déjate inspirar!"
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
    image: "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content: 
    "El Simposio de Energías Renovables es un foro crucial para discutir la transición energética de Bolivia y la región. El evento reunirá a investigadores, políticos, líderes empresariales y estudiantes en el Centro de Convenciones para analizar el potencial de la energía solar, eólica, geotérmica e hidroeléctrica en el contexto boliviano." + 
    "La agenda se centrará en la viabilidad técnica y económica de los proyectos de energía limpia, la formulación de políticas energéticas sostenibles y el papel de la innovación tecnológica en la reducción de costos y el aumento de la eficiencia. Habrá presentaciones de papers académicos, paneles de discusión sobre financiación verde y keynotes de altos funcionarios gubernamentales y de la industria. El simposio es una plataforma para influir en la toma de decisiones a nivel nacional." + 
    "Este evento es indispensable para profesionales y estudiantes de ingeniería, economía, derecho y ciencias ambientales. Los participantes podrán conocer las últimas tendencias globales y cómo se están adaptando a la realidad local. Es una oportunidad para networking y colaborar en el desarrollo de un futuro energético más sostenible para el país. ¡Únete a la discusión que está definiendo el mañana!"  },
];
