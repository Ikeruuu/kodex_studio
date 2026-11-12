/* Content of the Kodex Studio page. Prices, plans, steps and questions live here.
   Every text has an English (en) and a Spanish (es) version. */
const PLANS=[
 {id:'presencia',name:{en:'Presence',es:'Presencia'},price:490,
  for:{en:'A single page so people can find you and get in touch.',es:'Una página para que te encuentren y te contacten.'},
  time:{en:'Ready in about 1 week',es:'Lista en torno a 1 semana'},
  items:{en:['One-page website, up to 5 sections','Looks right on phones and computers','Contact form or WhatsApp button, map and opening hours','Basic SEO and your Google Business profile','Put online on your own domain'],
         es:['Web de una página, hasta 5 secciones','Se ve bien en móvil y en ordenador','Formulario o botón de WhatsApp, mapa y horarios','SEO básico y tu ficha de Google','Publicada en tu propio dominio']}},
 {id:'negocio',name:{en:'Business',es:'Negocio'},price:990,featured:1,
  for:{en:'A full website that explains what you do and brings in enquiries.',es:'Una web completa que explica lo que haces y te trae consultas.'},
  time:{en:'Ready in 2 to 3 weeks',es:'Lista en 2 o 3 semanas'},
  items:{en:['A full multi-page website','Texts reviewed and organised with you','Gallery or catalogue (without online purchase)','Booking or quote requests by form','Several languages','Visit statistics'],
         es:['Web completa de varias páginas','Textos revisados y ordenados contigo','Galería o catálogo (sin compra online)','Reservas o peticiones de presupuesto por formulario','Varios idiomas','Estadísticas de visitas']}},
 {id:'tienda',name:{en:'Shop',es:'Tienda'},price:1790,
  for:{en:'Your business gone digital: sell or take orders online, with payments and stock under control.',es:'Tu negocio digitalizado: vende o recibe pedidos online, con pagos y stock controlados.'},
  time:{en:'Ready in 4 to 5 weeks',es:'Lista en 4 o 5 semanas'},
  items:{en:['A highly customised website, at the level of this one or beyond','Online shop or catalogue with payment','Stock and orders managed from one panel','Payment gateway set up and tested','Email notices for you and your customers','A session to teach you how to manage it'],
         es:['Web muy personalizada, al nivel de esta o superior','Tienda o catálogo con pago online','Stock y pedidos gestionados desde un solo panel','Pasarela de pago configurada y probada','Avisos por correo para ti y tus clientes','Una sesión para enseñarte a gestionarla']}}
];
const CARE={price:39,
 items:{en:['Backups and updates','We check that the site stays online','Reply within 24 hours','No minimum stay'],
        es:['Copias de seguridad y actualizaciones','Vigilamos que la web siga en línea','Respuesta en 24 horas','Sin permanencia']}};
const EXTRAS=[
 {n:{en:'Photo session for your website',es:'Sesión de fotos para tu web'},price:150},
 {n:{en:'Extra language',es:'Idioma adicional'},price:120},
 {n:{en:'Extra page',es:'Página adicional'},price:80}
];
const STEPS=[
 {t:{en:'We talk',es:'Hablamos'},d:{en:'A call or a coffee, free of charge. You tell us what you need and what you already have.',es:'Una llamada o un café, sin coste. Nos cuentas qué necesitas y qué tienes ya.'}},
 {t:{en:'Closed proposal',es:'Propuesta cerrada'},d:{en:'You get the fixed price, what it includes and the delivery date in writing.',es:'Recibes por escrito el precio fijo, lo que incluye y la fecha de entrega.'}},
 {t:{en:'First half and we start',es:'Primera mitad y empezamos'},d:{en:'You pay 50% to book the dates. You follow the progress on a private link, with two rounds of changes included.',es:'Pagas el 50 % para reservar fechas. Ves el avance en un enlace privado, con dos rondas de cambios incluidas.'}},
 {t:{en:'Delivery and second half',es:'Entrega y segunda mitad'},d:{en:'We put it online, we show you how to use it and you pay the remaining 50%.',es:'Lo publicamos, te enseñamos a usarlo y pagas el 50 % restante.'}},
 {t:{en:'We stay with you',es:'Seguimos contigo'},d:{en:'30 days of support included after delivery. After that, monthly maintenance if you want it.',es:'30 días de soporte incluidos tras la entrega. Después, mantenimiento mensual si lo quieres.'}}
];
const FAQ=[
 {q:{en:'Why a fixed price instead of an hourly rate?',es:'¿Por qué precio fijo y no por horas?'},a:{en:'So you know what you will pay before we start. If the job grows along the way, we talk about it and that part gets its own closed price.',es:'Para que sepas lo que vas a pagar antes de empezar. Si el encargo crece por el camino, lo hablamos y esa parte lleva su propio precio cerrado.'}},
 {q:{en:'How do payments work?',es:'¿Cómo se paga?'},a:{en:'In two halves: 50% to book the dates and start, 50% on delivery. Maintenance is paid month by month.',es:'En dos mitades: 50 % para reservar fechas y empezar, 50 % a la entrega. El mantenimiento se paga mes a mes.'}},
 {q:{en:'Who owns the website?',es:'¿De quién es la web?'},a:{en:'You do. The domain, the hosting and every account are registered in your name, and you keep all the access details.',es:'Tuya. El dominio, el alojamiento y todas las cuentas van a tu nombre, y te quedas con todos los accesos.'}},
 {q:{en:'What if I need changes later?',es:'¿Y si necesito cambios después?'},a:{en:'The first 30 days are covered. After that you can take the monthly maintenance or ask for a one-off change with a closed price.',es:'Los primeros 30 días están cubiertos. Después puedes contratar el mantenimiento mensual o pedir un cambio puntual con precio cerrado.'}},
 {q:{en:'My project does not fit any plan',es:'Mi proyecto no encaja en ningún plan'},a:{en:'Apps, databases with AI and integrations are quoted one by one. The way of working is the same: closed price, two halves and support afterwards.',es:'Las apps, las bases de datos con IA y las integraciones se presupuestan una a una. La forma de trabajar es la misma: precio cerrado, dos mitades y soporte después.'}}
];
const WORK=[
 {kind:{en:'Mobile and web app',es:'App móvil y web'},title:'TuTurno',d:{en:'An app that explains court proceedings to teenagers with a game, short lessons and a voice agent. Semifinalist at DATAthon Justicia 2026.',es:'Una app que explica el proceso judicial a adolescentes con un juego, lecciones cortas y un agente de voz. Semifinalista en el DATAthon Justicia 2026.'},link:{label:{en:'Try the demo',es:'Probar la demo'},u:'https://aliassdev.github.io/Hackaton-DataForum-2026/'}},
 {kind:{en:'Web app with AI',es:'Aplicación web con IA'},title:'Camín',d:{en:'Citizens report road incidents and a model sorts each one by severity and by the body that must act, on a live map.',es:'La ciudadanía reporta incidencias en carretera y un modelo ordena cada una por gravedad y por organismo responsable, sobre un mapa en vivo.'}},
 {kind:{en:'Database with AI',es:'Base de datos con IA'},title:{en:'A database you can ask questions',es:'Una base de datos a la que se le pregunta'},d:{en:'A Laravel setup that lets a business manage and query its database through AI instead of scattered spreadsheets.',es:'Un montaje en Laravel para que un negocio gestione y consulte su base de datos con IA en lugar de hojas de cálculo sueltas.'}},
 {kind:{en:'Websites with payments',es:'Webs con pagos'},title:{en:'Sites that take payments',es:'Webs que cobran'},d:{en:'Dynamic websites connected to payment gateways, so the order and the payment happen in the same place.',es:'Webs dinámicas conectadas a pasarelas de pago, para que el pedido y el cobro ocurran en el mismo sitio.'}},
 {kind:{en:'Association website',es:'Web de asociación'},title:'AsturTalent',d:{en:'Website of the first entrepreneurship association of the University of Oviedo.',es:'Web de la primera asociación de emprendimiento de la Universidad de Oviedo.'},link:{label:{en:'Visit the site',es:'Ver la web'},u:'https://www.asturtalent.org/'}}
];
const SHOTS=['01-cliffs.jpg','04-aurora-moon.jpg','10-karting.jpg','09-madrid-night.jpg','03-ice.jpg'];
const TYPED={en:['build a website','ship an app','tidy a database','shoot the photos'],es:['hacer una web','lanzar una app','ordenar una base de datos','hacer las fotos']};
const SHOP={en:[['Coffee beans 1 kg',18],['Ceramic mug',12],['Heather honey',9]],es:[['Café en grano 1 kg',18],['Taza de cerámica',12],['Miel de brezo',9]]};
const ASK=[
 {q:{en:'What sold best in October?',es:'¿Qué se vendió más en octubre?'},sql:'SELECT product, SUM(units) FROM sales WHERE month = 10 GROUP BY product',rows:{en:[['Coffee beans',82],['Honey',54],['Mugs',31]],es:[['Café en grano',82],['Miel',54],['Tazas',31]]}},
 {q:{en:'Which day do we get more bookings?',es:'¿Qué día hay más reservas?'},sql:'SELECT weekday, COUNT(*) FROM bookings GROUP BY weekday ORDER BY 2 DESC',rows:{en:[['Saturday',46],['Friday',38],['Thursday',21]],es:[['Sábado',46],['Viernes',38],['Jueves',21]]}},
 {q:{en:'Who has not ordered in 3 months?',es:'¿Quién no compra desde hace 3 meses?'},sql:"SELECT segment, COUNT(*) FROM customers WHERE last_order < NOW() - INTERVAL 90 DAY GROUP BY segment",rows:{en:[['Occasional',27],['Regular',9],['New',5]],es:[['Ocasionales',27],['Habituales',9],['Nuevos',5]]}}
];
