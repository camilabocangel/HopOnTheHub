const events = [
  {
    id: 1,
    status: "accepted",
    title: "Feria de Innovación Tecnológica",
    date: "2025-10-20",
    time: "10:00",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Auditorio Principal",
    category: "Tecnología",
    description:
      "Presentación de proyectos innovadores realizados por estudiantes de la UPB.",
    image:
      "https://blog.maestriasydiplomados.tec.mx/hubfs/Blog%20notas%20maestrias%20y%20diplomados/Innovaci%C3%B3n%20tecnol%C3%B3gica.jpg",
    content:
      "La Feria de Innovación Tecnológica de la UPB es el evento cumbre donde la creatividad y el rigor académico de nuestros estudiantes de diversas facultades convergen. Este año, la feria promete ser un espacio vibrante de descubrimiento, presentando proyectos que abordan desafíos reales en áreas como la sostenibilidad, la salud digital y la automatización industrial. Los asistentes tendrán la oportunidad de interactuar directamente con los creadores, entendiendo el proceso de desarrollo e impacto potencial de cada innovación." +
      "Este evento no solo celebra el talento interno, sino que también fomenta la vinculación con el sector empresarial. Inversionistas, líderes de la industria y el público en general están invitados a presenciar el futuro tecnológico que se está gestando en la universidad. Habrá demostraciones en vivo, paneles de discusión con jueces expertos y una ceremonia de premiación a los proyectos más disruptivos y con mayor potencial de mercado." +
      "La feria se llevará a cabo simultáneamente en los campus de Cochabamba, La Paz y Santa Cruz, conectados por transmisiones en vivo y una plataforma virtual para asegurar una experiencia integral y nacional. Es una cita obligada para quienes deseen estar al tanto de las últimas tendencias en la innovación boliviana y para reclutar a los futuros líderes tecnológicos del país. ¡No te pierdas la oportunidad de ver la tecnología de mañana hoy!",
  },
  {
    id: 2,
    status: "accepted",
    title: "Conferencia de Inteligencia Artificial",
    date: "2025-11-02",
    time: "15:00",
    campus: ["Cochabamba"],
    place: "Sala de Conferencias B",
    category: "Académico",
    description:
      "Expertos en IA compartirán las últimas tendencias y aplicaciones en la industria.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "La Conferencia de Inteligencia Artificial de este año se centrará en el impacto transformador de la IA Generativa, el Aprendizaje Profundo y la Ética en los Algoritmos. Hemos reunido a un panel de destacados expertos nacionales e internacionales con experiencia en gigantes tecnológicos y startups de alto impacto. La agenda incluye ponencias magistrales que desglosarán cómo la IA está redefiniendo sectores clave como la banca, la medicina y la educación." +
      "Los participantes tendrán la oportunidad de sumergirse en casos de estudio reales y aprender sobre la implementación práctica de modelos de IA en el contexto empresarial boliviano. Se abordarán temas cruciales como la gobernanza de datos, el desarrollo de modelos de lenguaje natural (NLP) adaptados al español y lenguas nativas, y los desafíos de la automatización inteligente." +
      "Este encuentro académico está diseñado para estudiantes, profesionales de TI, investigadores y tomadores de decisiones que busquen una comprensión profunda de las herramientas y estrategias necesarias para liderar en la era de la inteligencia artificial. Además de las charlas, habrá un espacio de networking para facilitar la colaboración y el intercambio de conocimientos.",
  },
  {
    id: 3,
    status: "accepted",
    title: "Torneo Interno de Fútbol",
    date: "2025-10-15",
    time: "14:00",
    campus: ["Santa Cruz"],
    place: "Cancha UPB",
    category: "Deportivo",
    description:
      "Competencia deportiva entre las diferentes carreras de la universidad.",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.fg4SF9oLJJWGEdD06kMWiQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    content:
      "¡Prepárense para el evento deportivo más esperado del semestre! El Torneo Interno de Fútbol es una tradición en la UPB-Santa Cruz, que une a estudiantes de todas las carreras en una sana y emocionante competencia. Este torneo fomenta el espíritu de equipo, el compañerismo y la vida activa, permitiendo a los participantes tomarse un descanso de los estudios y liberar energías en la cancha. Los equipos representarán a sus respectivas facultades, luchando por la gloria y el trofeo universitario." +
      "Los partidos se llevarán a cabo en la Cancha UPB, conocida por sus excelentes instalaciones. Se espera una gran afluencia de público, con barras organizadas por cada carrera, creando un ambiente festivo y lleno de adrenalina. El sistema de juego será por eliminatorias, garantizando partidos intensos desde la fase inicial hasta la gran final. Se premiará al equipo campeón, al goleador del torneo y al arquero menos batido." +
      "Animamos a toda la comunidad universitaria a asistir y apoyar a sus equipos favoritos. Este evento va más allá del deporte; es una celebración de la unidad y el orgullo UPB. Además de los partidos, habrá stands de hidratación y música para mantener la energía. ¡Ven y demuestra que tu carrera no solo es la mejor en las aulas, sino también en el campo de juego!",
  },
  {
    id: 4,
    status: "accepted",
    title: "Concierto Cultural UPB",
    date: "2025-12-01",
    time: "19:00",
    campus: ["Cochabamba", "La Paz"],
    place: "Teatro Universitario",
    category: "Cultural",
    description:
      "Evento cultural con presentaciones musicales y artísticas de estudiantes.",
    image:
      "https://cdn.pixabay.com/photo/2019/06/24/03/09/jakarta-4295095_1280.jpg",
    content:
      "El Concierto Cultural UPB es una vitrina del vasto talento artístico que reside en nuestra comunidad estudiantil. La noche promete ser un despliegue de diversas expresiones culturales, incluyendo interpretaciones musicales (desde clásica hasta rock), danzas folklóricas y contemporáneas, y actos de teatro breve. Este evento subraya el compromiso de la universidad con una formación integral, valorando las artes como un pilar fundamental del desarrollo humano." +
      "El majestuoso Teatro Universitario será el escenario que acogerá estas presentaciones en los campus de Cochabamba y La Paz, ofreciendo una acústica impecable y un ambiente íntimo para que los artistas brillen. Los estudiantes han estado ensayando arduamente durante meses, preparando repertorios originales y coreografías impactantes. Es una oportunidad única para apreciar la calidad y la diversidad de las expresiones artísticas cultivadas fuera de las aulas." +
      "Invitamos a toda la familia UPB, amigos y público de la ciudad a disfrutar de esta velada inolvidable. El Concierto Cultural no es solo entretenimiento; es una experiencia que enriquece el alma y fortalece la conexión con nuestra identidad. Las entradas se podrán adquirir una semana antes en las oficinas de Bienestar Estudiantil, y parte de la recaudación se destinará a un fondo para el desarrollo de futuras actividades culturales.",
  },
  {
    id: 5,
    status: "accepted",
    title: "Hackathon UPB 2025",
    date: "2025-11-25",
    time: "08:00",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Laboratorios de Computación",
    category: "Competencia",
    description:
      "Competencia intensiva de programación e innovación con equipos multidisciplinarios.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/030/194/162/small_2x/hackathon-technology-programming-startup-concept-wooden-block-on-desk-with-hackathon-icon-on-virtual-screen-forum-for-software-developers-to-solve-problems-photo.jpg",
    content:
      "El Hackathon UPB 2025 es un desafío de 24 horas ininterrumpidas donde mentes brillantes de ingeniería, diseño, y negocios se unen para crear soluciones tecnológicas innovadoras. Los equipos multidisciplinarios trabajarán bajo presión para desarrollar prototipos funcionales que respondan a problemas específicos planteados por empresas patrocinadoras y la propia universidad, en áreas como la educación digital, la logística urbana y la inclusión financiera." +
      "Esta maratón de desarrollo no solo pondrá a prueba las habilidades de programación y diseño de los participantes, sino también su capacidad de trabajo en equipo, gestión del tiempo y presentación de ideas (pitch). Contaremos con la presencia de mentores expertos de la industria que guiarán a los equipos, ofreciendo feedback técnico y estratégico. La energía de los Laboratorios de Computación, equipados con la última tecnología en los tres campus, será el motor de este evento." +
      "Al finalizar, los proyectos serán evaluados por un jurado de alto nivel. Hay premios significativos para los primeros lugares, incluyendo capital semilla para el desarrollo del proyecto, pasantías y equipos tecnológicos. El Hackathon UPB es el lugar ideal para transformar una idea brillante en un producto viable en tiempo récord y para ser reclutado por empresas que buscan talento proactivo e innovador. ¡Inscríbete y acepta el desafío!",
  },
  {
    id: 6,
    status: "accepted",
    title: "Charla sobre Emprendimiento",
    date: "2025-10-18",
    time: "11:00",
    campus: ["Cochabamba"],
    place: "Auditorio Menor",
    category: "Emprendimiento",
    description: "Charla motivacional con emprendedores bolivianos de éxito.",
    image:
      "https://alpina.com/media/mageplaza/blog/post/t/i/tipos-de-emprendimiento-que-pueden-impulsar-tu-proyecto.png",
    content:
      "La Charla sobre Emprendimiento reunirá a un grupo selecto de emprendedores bolivianos de éxito que han logrado consolidar sus negocios a nivel nacional e incluso internacional. Este evento está diseñado para inspirar a la próxima generación de líderes y startups de la UPB. Los oradores compartirán sus historias de fracasos y éxitos, revelando las estrategias que les permitieron superar obstáculos en el competitivo ecosistema empresarial boliviano." +
      "Los temas centrales girarán en torno a la resiliencia empresarial, la captación de inversión ángel, la creación de una cultura de innovación y el escalamiento de negocios en mercados emergentes. Esta será una oportunidad inestimable para obtener consejos prácticos y conocimientos de primera mano sobre lo que realmente se necesita para convertir una idea ambiciosa en un negocio rentable y sostenible. Se enfocará en casos bolivianos para asegurar la relevancia del contexto." +
      "Después de las ponencias, habrá una sesión de preguntas y respuestas (Q&A) donde los asistentes podrán interactuar directamente con los emprendedores y resolver sus dudas sobre planes de negocio, marketing digital y gestión financiera. Si sueñas con crear tu propia empresa o buscas darle un giro innovador a tu carrera, esta charla te proporcionará la motivación y las herramientas necesarias para dar el primer gran paso.",
  },
  {
    id: 7,
    status: "accepted",
    title: "Taller de Ciberseguridad",
    date: "2025-11-10",
    time: "09:30",
    campus: ["La Paz"],
    place: "Laboratorio 101",
    category: "Tecnología",
    description:
      "Taller práctico sobre hacking ético y buenas prácticas de seguridad informática.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Taller de Ciberseguridad es un evento intensivo y práctico diseñado para dotar a los participantes de las habilidades necesarias para proteger sistemas y datos en un mundo cada vez más digital. Impartido por un experto en seguridad ofensiva y defensiva, el taller se centrará en los fundamentos del hacking ético, enseñando a pensar como un atacante para fortalecer las defensas." +
      "Los asistentes trabajarán con herramientas reales en un entorno de laboratorio controlado en el campus de La Paz. La agenda incluye módulos sobre detección de vulnerabilidades (penetration testing), cifrado de datos, y técnicas de mitigación contra ataques comunes como phishing y ransomware. La meta es que, al finalizar, los participantes puedan identificar y corregir fallas de seguridad en redes y aplicaciones web, aplicando las buenas prácticas de seguridad informática a nivel profesional." +
      "Este taller está dirigido a estudiantes de ingeniería de sistemas, desarrolladores de software y cualquier profesional que maneje información sensible y desee profundizar sus conocimientos en seguridad. Se recomienda traer una computadora portátil. ¡Asegura tu lugar y conviértete en un defensor digital! Es una inversión crucial para la carrera en el panorama tecnológico actual.",
  },
  {
    id: 8,
    status: "accepted",
    title: "Feria de Salud Universitaria",
    date: "2025-10-22",
    time: "08:00",
    campus: ["Santa Cruz"],
    place: "Patio Central",
    category: "Salud",
    description: "Jornada de salud gratuita para estudiantes y docentes.",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.7n7qJ64p_Ote3rhmyxnaTwHaD4?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    content:
      "La Feria de Salud Universitaria es una iniciativa de Bienestar Estudiantil destinada a promover estilos de vida saludables entre la comunidad UPB de Santa Cruz. Durante esta jornada gratuita, se ofrecerán una variedad de servicios de chequeo y prevención médica en el Patio Central, transformándolo en un centro de salud temporal." +
      "Entre los servicios disponibles se incluyen mediciones de presión arterial, control de glucemia, valoración nutricional con dietistas, y tests rápidos de VIH. Además, habrá stands informativos sobre salud mental, prevención de adicciones y primeros auxilios. Nuestro equipo médico y estudiantes de carreras afines estarán disponibles para responder preguntas y proporcionar consejería personalizada sobre el manejo del estrés académico y la importancia del sueño." +
      "La feria también contará con actividades interactivas como clases de aeróbicos y demostraciones de técnicas de relajación. Es un recordatorio de que la salud física y mental es la base del éxito académico. Anímate a participar; tu bienestar es nuestra prioridad. ¡Invierte una mañana en tu salud!",
  },
  {
    id: 9,
    status: "accepted",
    title: "Competencia de Ajedrez",
    date: "2025-11-12",
    time: "14:00",
    campus: ["Cochabamba", "Santa Cruz"],
    place: "Biblioteca Central",
    category: "Deportivo",
    description: "Torneo de ajedrez abierto a toda la comunidad universitaria.",
    image:
      "data:image/webp;base64,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",
    content:
      "La Competencia de Ajedrez invita a jugadores de todos los niveles a poner a prueba su intelecto y estrategia. Este torneo, abierto a toda la comunidad universitaria (estudiantes, docentes y personal administrativo), celebra al 'deporte ciencia' como una disciplina que agudiza la mente y fomenta la toma de decisiones lógicas y anticipadas. Se llevará a cabo en la tranquila atmósfera de la Biblioteca Central en los campus indicados para garantizar la concentración de los competidores." +
      "Se utilizará un sistema de competición suizo o de eliminación directa, dependiendo del número de inscritos, con partidas rápidas para mantener la intensidad. Los participantes competirán por el título de Campeón Universitario de Ajedrez y por premios que incluyen libros de estrategia y materiales de ajedrez. Más allá de la competencia, es una excelente oportunidad para practicar el pensamiento crítico y la paciencia." +
      "El evento también contará con una sección de partidas simultáneas con un maestro local invitado, ofreciendo un desafío para los más experimentados y una gran lección para los principiantes. Si crees tener la mente más aguda de la UPB, inscríbete y demuestra tu dominio en las 64 casillas. La estrategia espera por ti.",
  },
  {
    id: 10,
    status: "accepted",
    title: "Exposición de Robótica",
    date: "2025-12-05",
    time: "16:00",
    campus: ["Cochabamba"],
    place: "Sala de Exposiciones",
    category: "Tecnología",
    description:
      "Demostraciones de robots diseñados por estudiantes de ingeniería.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "La Exposición de Robótica es el clímax del semestre para los entusiastas de la ingeniería y la mecatrónica en el campus Cochabamba. En la Sala de Exposiciones, los estudiantes de la UPB presentarán sus creaciones, fruto de meses de diseño, programación y ensamblaje. La exposición mostrará una amplia gama de proyectos, desde robots móviles autónomos para logística hasta soluciones robóticas aplicadas a la agricultura de precisión y la asistencia médica." +
      "Los asistentes podrán observar demostraciones en vivo, donde los robots ejecutarán tareas complejas, mostrando su precisión y la sofisticación de sus algoritmos. Los propios creadores estarán presentes para explicar los desafíos técnicos superados y el potencial de sus inventos para el mercado boliviano. Un panel de expertos evaluará los proyectos, destacando la originalidad y la funcionalidad." +
      "Esta es una actividad perfecta para estudiantes de secundaria, padres y cualquier persona interesada en el futuro de la automatización. La exposición busca inspirar a más jóvenes a incursionar en la ciencia y la tecnología. Además, se premiará el robot más innovador y el de mayor impacto social. ¡Ven y sorpréndete con la destreza de la ingeniería estudiantil!",
  },
  {
    id: 11,
    status: "accepted",
    title: "Semana de la Ingeniería",
    date: "2025-11-17",
    time: "10:00",
    campus: ["La Paz", "Cochabamba"],
    place: "Múltiples espacios",
    category: "Académico",
    description:
      "Charlas, talleres y exposiciones en celebración de la semana de la ingeniería.",
    image:
      "https://img.freepik.com/premium-vector/technological-mosaics_507704-17075.jpg?w=2000",
    content:
      "La Semana de la Ingeniería es un evento anual dedicado a celebrar la innovación, la creatividad y el rigor científico de las disciplinas de ingeniería en la UPB. A lo largo de cinco días, los campus de La Paz y Cochabamba se llenarán de actividades diseñadas para enriquecer la formación de los futuros ingenieros y mostrar el impacto de la ingeniería en la sociedad." +
      "El programa es extenso e incluye charlas magistrales de líderes del sector, talleres prácticos sobre software especializado (como CAD y simulaciones), visitas guiadas a laboratorios de última generación y competencias de diseño. Se cubrirán las diversas ramas, desde la ingeniería civil y eléctrica hasta la ingeniería de software y industrial. Es una oportunidad de oro para interactuar con el cuerpo docente y alumni de éxito." +
      "El evento culminará con una ceremonia de reconocimiento a los estudiantes más destacados y la presentación de los proyectos de fin de carrera más prometedores. La Semana de la Ingeniería busca inspirar, conectar y proporcionar herramientas prácticas para el crecimiento profesional. Asegúrate de revisar la agenda detallada por campus para no perderte las actividades de tu interés.",
  },
  {
    id: 12,
    status: "accepted",
    title: "Festival Gastronómico UPB",
    date: "2025-10-28",
    time: "12:00",
    campus: ["Santa Cruz"],
    place: "Comedor Universitario",
    category: "Cultural",
    description:
      "Exposición de gastronomía regional preparada por estudiantes.",
    image:
      "https://th.bing.com/th/id/OIP.YPa4hc8hUUhiJVt7t3KWCQHaE7?w=305&h=203&c=7&r=0&o=7&cb=12&dpr=1.4&pid=1.7&rm=3",
    content:
      "El Festival Gastronómico UPB transforma el Comedor Universitario de Santa Cruz en un vibrante mercado de sabores y culturas. Este evento es una celebración de la rica y diversa gastronomía boliviana y regional, con cada stand representando una fusión de tradiciones y creatividad culinaria. Los estudiantes, con gran pasión y esmero, prepararán y expondrán platillos típicos y fusiones innovadoras." +
      "Los asistentes podrán degustar desde las especialidades de la Amazonía y el Altiplano hasta las delicias del Oriente boliviano, incluyendo postres y bebidas artesanales. El festival es una plataforma para que los estudiantes muestren sus talentos culinarios, promuevan la cultura alimentaria sostenible y, en muchos casos, recauden fondos para sus actividades académicas o proyectos sociales. Un jurado de chefs locales evaluará la creatividad, el sabor y la presentación de los platos." +
      "Además de la comida, el ambiente estará animado con música tradicional y actividades culturales. Es una excelente manera de compartir en comunidad y honrar las raíces culinarias. Ven con el estómago vacío y el espíritu abierto a experimentar una explosión de sabor y cultura. ¡Una fiesta para el paladar que no te puedes perder!",
  },
  {
    id: 13,
    status: "accepted",
    title: "Concurso de Programación",
    date: "2025-11-08",
    time: "08:30",
    campus: ["Cochabamba", "La Paz"],
    place: "Laboratorio 202",
    category: "Competencia",
    description: "Competencia de programación estilo ICPC.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.Funi8KXxZCjaWBV0tXnx_wHaEW?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    content:
      "El Concurso de Programación UPB es la prueba definitiva de las habilidades algorítmicas y de resolución de problemas. Siguiendo el prestigioso formato ICPC (International Collegiate Programming Contest), equipos de estudiantes se enfrentarán a un conjunto de problemas complejos que deberán resolver mediante la programación de soluciones eficientes en un límite de tiempo estricto." +
      "La competencia fomenta el pensamiento lógico, la destreza en la codificación y la colaboración bajo presión. Los equipos trabajarán codo a codo en el Laboratorio 202, con solo una computadora por equipo para simular las condiciones reales de las competencias internacionales. El ambiente será de intensa concentración y camaradería, con una tabla de clasificación en tiempo real que añadirá dramatismo a la jornada." +
      "Los ganadores no solo recibirán premios tecnológicos, sino también el reconocimiento de ser los programadores más rápidos y efectivos de la universidad. Este concurso es fundamental para identificar y preparar a los equipos que representarán a la UPB en futuras competencias nacionales e internacionales. ¡Demuestra tu dominio del código y lleva a tu equipo a la victoria!",
  },
  {
    id: 14,
    status: "accepted",
    title: "Seminario de Blockchain",
    date: "2025-11-14",
    time: "18:00",
    campus: ["Santa Cruz"],
    place: "Auditorio Norte",
    category: "Tecnología",
    description:
      "Discusión sobre el impacto de la tecnología blockchain en la industria financiera.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Seminario de Blockchain abordará la tecnología que está revolucionando no solo las finanzas (FinTech), sino también la logística, la gobernanza y la propiedad digital. Este evento está dirigido a desmitificar la tecnología blockchain y sus aplicaciones prácticas, más allá de las criptomonedas, centrándose en el desarrollo de contratos inteligentes (Smart Contracts) y la seguridad de las cadenas de suministro." +
      "Expertos en economía digital y desarrollo web3 compartirán sus perspectivas sobre el potencial de la tecnología en Bolivia y la región. Se presentarán casos de uso de blockchain empresarial y cómo esta tecnología puede mejorar la transparencia y la eficiencia en diversos procesos. La sesión será altamente interactiva, con espacio para debatir sobre los marcos regulatorios necesarios para su adopción masiva." +
      "Tanto si eres un estudiante de finanzas interesado en la disrupción, como un desarrollador que busca especializarse en solidity, este seminario te proporcionará una visión integral de las oportunidades y desafíos. Es una excelente oportunidad para networking con profesionales que están a la vanguardia de esta tecnología. ¡Aprende a construir sobre la confianza digital del futuro!",
  },
  {
    id: 15,
    status: "accepted",
    title: "Maratón Universitaria",
    date: "2025-12-10",
    time: "07:00",
    campus: ["Cochabamba"],
    place: "Ciudad Universitaria",
    category: "Deportivo",
    description: "Carrera universitaria abierta al público.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "La Maratón Universitaria es un evento atlético que promueve el deporte y la vida saludable, invitando a la participación de estudiantes, docentes, alumni y público en general. La ruta, diseñada para ser desafiante y escénica, recorrerá los alrededores de la Ciudad Universitaria de Cochabamba, ofreciendo distancias para corredores de todos los niveles (p. ej., 5K y 10K)." +
      "El evento se llevará a cabo a primera hora de la mañana para aprovechar el clima fresco y fomentar una jornada de actividad física. Todos los inscritos recibirán un kit de corredor que incluye una camiseta conmemorativa, un dorsal y un chip de cronometraje. Habrá puestos de hidratación y asistencia médica a lo largo del recorrido para garantizar la seguridad de todos los participantes." +
      "La maratón culminará con una ceremonia de premiación a los ganadores por categoría y sexo. Es más que una carrera; es una celebración de la disciplina y el espíritu comunitario. Anímate a establecer un nuevo récord personal o simplemente a disfrutar de la energía de miles de personas corriendo juntas por la salud. ¡Ponte tus zapatillas y corre con el espíritu UPB!",
  },
  {
    id: 16,
    status: "accepted",
    title: "Encuentro de Egresados",
    date: "2025-12-15",
    time: "18:00",
    campus: ["La Paz", "Santa Cruz"],
    place: "Salón de Eventos",
    category: "Social",
    description: "Reencuentro con egresados de distintas generaciones.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Encuentro de Egresados es el evento social más importante del año, diseñado para reconectar a la vibrante red de alumni de la UPB. Se llevará a cabo simultáneamente en los campus de La Paz y Santa Cruz, en un ambiente elegante y festivo. Este reencuentro es una oportunidad invaluable para fortalecer la comunidad, compartir experiencias profesionales y revivir los mejores momentos de la vida universitaria." +
      "La velada incluirá un cóctel de bienvenida, discursos inspiradores de egresados destacados que han alcanzado el éxito en sus respectivos campos y música en vivo. El enfoque principal será el networking intergeneracional, facilitando que los alumni establezcan contactos profesionales que puedan llevar a colaboraciones, mentorías o nuevas oportunidades de negocio. Es un espacio para celebrar los logros de la red UPB." +
      "Invitamos a todas las generaciones, desde los recién graduados hasta aquellos con décadas de trayectoria, a unirse a esta celebración. Tu experiencia es un activo valioso para la universidad y para los egresados más jóvenes. Confirma tu asistencia con anticipación para asegurar tu lugar. ¡Esperamos verte para celebrar tu trayectoria y el futuro de la UPB!",
  },
  {
    id: 17,
    status: "accepted",
    title: "Cine Debate UPB",
    date: "2025-11-21",
    time: "17:30",
    campus: ["Cochabamba"],
    place: "Sala Audiovisual",
    category: "Cultural",
    description: "Proyección de película seguida de un debate académico.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Cine Debate UPB es un espacio cultural y académico que utiliza el cine como punto de partida para una profunda reflexión sobre temas sociales, éticos y políticos de actualidad. La película seleccionada para esta edición es una obra aclamada que desafía la percepción y obliga a cuestionar la realidad. La proyección se realizará en la cómoda Sala Audiovisual del campus Cochabamba." +
      "Inmediatamente después de la película, se llevará a cabo un debate moderado por un docente experto de la facultad de Humanidades o Ciencias Sociales. Este debate permitirá a los asistentes analizar la narrativa fílmica, el simbolismo y las implicaciones filosóficas del film, facilitando un diálogo abierto y respetuoso sobre las problemáticas planteadas. Es una actividad que fomenta el pensamiento crítico y la expresión de diversas perspectivas." +
      "Este evento está abierto a toda la comunidad y es especialmente recomendable para quienes disfrutan de la crítica cinematográfica y el análisis profundo. El Cine Debate busca trascender el entretenimiento, convirtiéndose en una herramienta educativa y de enriquecimiento cultural. Te invitamos a ver la película no solo con los ojos, sino también con la mente abierta. ¡Prepárate para un diálogo estimulante!",
  },
  {
    id: 18,
    status: "accepted",
    title: "Curso de Machine Learning",
    date: "2025-11-28",
    time: "09:00",
    campus: ["Cochabamba", "Santa Cruz"],
    place: "Laboratorio de Data Science",
    category: "Académico",
    description:
      "Curso intensivo sobre fundamentos de Machine Learning con Python.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Curso de Machine Learning es un bootcamp intensivo de un día diseñado para proporcionar una base sólida en los algoritmos y las técnicas fundamentales del Aprendizaje Automático, utilizando Python como lenguaje de programación principal. Este curso práctico es esencial para cualquier estudiante o profesional que busque entrar en el campo de la Ciencia de Datos y la Inteligencia Artificial." +
      "El temario cubrirá la Regresión Lineal y Logística, Árboles de Decisión, y una introducción a Neural Networks. Los participantes trabajarán en el Laboratorio de Data Science, equipado con software y hardware potentes. El enfoque será hands-on, dedicando la mayor parte del tiempo a ejercicios de codificación y a la implementación de modelos predictivos con librerías populares como Scikit-learn y TensorFlow." +
      "Se requiere conocimiento básico de programación en Python. El curso es impartido por un investigador con experiencia en aplicaciones industriales de IA. Los cupos son limitados para garantizar una atención personalizada. ¡Aprende a predecir el futuro con datos y potencia tu currículum con una de las habilidades más demandadas del siglo XXI!",
  },
  {
    id: 19,
    status: "accepted",
    title: "Expo Arte Estudiantil",
    date: "2025-10-30",
    time: "10:00",
    campus: ["La Paz"],
    place: "Galería Universitaria",
    category: "Cultural",
    description:
      "Exposición de arte creada por estudiantes de distintas carreras.",
    image:
      "https://cdnvos.lavoz.com.ar/sites/default/files/styles/width_1072/public/agenda/expoarte.jpg",
    content:
      "La Expo Arte Estudiantil convierte la Galería Universitaria de La Paz en un crisol de creatividad visual. Esta exposición anual celebra el talento artístico de los estudiantes de la UPB, demostrando que la pasión por el arte florece en todas las carreras, desde ingeniería hasta derecho. La muestra incluirá una amplia gama de disciplinas: pintura, escultura, fotografía, arte digital y videoarte." +
      "Las obras expuestas reflejan las inquietudes, las visiones y las perspectivas únicas de la juventud boliviana, abordando temas que van desde la identidad cultural hasta los desafíos sociales contemporáneos. Los artistas estarán presentes durante la inauguración para discutir sus técnicas, inspiraciones y el proceso detrás de sus creaciones. Un comité de la universidad otorgará menciones a las obras más destacadas." +
      "Invitamos a toda la comunidad a visitar la galería y a apoyar el desarrollo cultural de nuestros estudiantes. El arte es una forma poderosa de comunicación y expresión, y esta exposición es una ventana a la mente creativa de la próxima generación. Además, algunas de las obras estarán disponibles para su venta. ¡Sumérgete en el mundo del arte estudiantil y déjate inspirar!",
  },
  {
    id: 20,
    status: "accepted",
    title: "Simposio de Energías Renovables",
    date: "2025-12-20",
    time: "09:30",
    campus: ["Cochabamba", "La Paz", "Santa Cruz"],
    place: "Centro de Convenciones",
    category: "Académico",
    description:
      "Simposio sobre el futuro de las energías renovables en Bolivia.",
    image:
      "https://img.freepik.com/foto-gratis/ilustracion-concepto-ciberseguridad_23-2151883573.jpg",
    content:
      "El Simposio de Energías Renovables es un foro crucial para discutir la transición energética de Bolivia y la región. El evento reunirá a investigadores, políticos, líderes empresariales y estudiantes en el Centro de Convenciones para analizar el potencial de la energía solar, eólica, geotérmica e hidroeléctrica en el contexto boliviano." +
      "La agenda se centrará en la viabilidad técnica y económica de los proyectos de energía limpia, la formulación de políticas energéticas sostenibles y el papel de la innovación tecnológica en la reducción de costos y el aumento de la eficiencia. Habrá presentaciones de papers académicos, paneles de discusión sobre financiación verde y keynotes de altos funcionarios gubernamentales y de la industria. El simposio es una plataforma para influir en la toma de decisiones a nivel nacional." +
      "Este evento es indispensable para profesionales y estudiantes de ingeniería, economía, derecho y ciencias ambientales. Los participantes podrán conocer las últimas tendencias globales y cómo se están adaptando a la realidad local. Es una oportunidad para networking y colaborar en el desarrollo de un futuro energético más sostenible para el país. ¡Únete a la discusión que está definiendo el mañana!",
  },
];

export default events;