/* Content of the Kodex Studio page. Prices, plans, steps and questions live here.
   Every text has an English (en) and a Spanish (es) version. */
const PLANS=[
 {id:'presencia',name:{en:'Presence',es:'Presencia'},price:490,
  for:{en:'A single page so people can find you and get in touch.',es:'Una página para que te encuentren y te contacten.'},
  time:{en:'Ready in 1 week',es:'Lista en 1 semana'},
  items:{en:['One-page website, up to 5 sections','Looks right on phones and computers','Contact form or WhatsApp button, map and opening hours','Basic SEO and your Google Business profile','Put online on your own domain'],
         es:['Web de una página, hasta 5 secciones','Se ve bien en móvil y en ordenador','Formulario o botón de WhatsApp, mapa y horarios','SEO básico y tu ficha de Google','Publicada en tu propio dominio']}},
 {id:'negocio',name:{en:'Business',es:'Negocio'},price:990,featured:1,
  for:{en:'A full website that explains what you do and brings in enquiries.',es:'Una web completa que explica lo que haces y te trae consultas.'},
  time:{en:'Ready in 2 weeks',es:'Lista en 2 semanas'},
  items:{en:['A full multi-page website','Texts reviewed and organised with you','Gallery or catalogue (without online purchase)','Booking or quote requests by form','Several languages','Visit statistics'],
         es:['Web completa de varias páginas','Textos revisados y ordenados contigo','Galería o catálogo (sin compra online)','Reservas o peticiones de presupuesto por formulario','Varios idiomas','Estadísticas de visitas']}},
 {id:'tienda',name:{en:'Shop',es:'Tienda'},price:1790,
  for:{en:'Your business gone digital: sell or take orders online, with payments and stock under control.',es:'Tu negocio digitalizado: vende o recibe pedidos online, con pagos y stock controlados.'},
  time:{en:'Ready in 3 weeks',es:'Lista en 3 semanas'},
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
/* The request tracer in "Under the hood". Each step: from, to, the technical line and a plain explanation. */
const TRACE=[
 {name:{en:'Book a slot',es:'Reservar una cita'},file:'POST /api/bookings',steps:[
  ['client','api','POST /api/bookings',{en:'The form sends the day and the time.',es:'El formulario envía el día y la hora.'}],
  ['api','api','validate(body)',{en:'The server checks the data before trusting it.',es:'El servidor comprueba los datos antes de fiarse de ellos.'}],
  ['api','db','SELECT … FROM slots WHERE free',{en:'Is that slot still free?',es:'¿Sigue libre ese hueco?'}],
  ['db','api','1 row',{en:'It is: the booking can go ahead.',es:'Lo está: la reserva puede seguir.'}],
  ['api','db','INSERT INTO bookings',{en:'The booking is saved and the slot is taken.',es:'Se guarda la reserva y el hueco queda ocupado.'}],
  ['api','mail','send(confirmation)',{en:'Confirmation for the customer, notice for the business.',es:'Confirmación para el cliente y aviso para el negocio.'}],
  ['api','client','201 Created',{en:'The screen shows "Booking confirmed".',es:'La pantalla muestra «Reserva confirmada».'}]]},
 {name:{en:'Pay an order',es:'Pagar un pedido'},file:'POST /api/orders',steps:[
  ['client','api','POST /api/orders',{en:'The cart arrives at the server.',es:'El carrito llega al servidor.'}],
  ['api','db','SELECT stock FROM products',{en:'Prices and stock are read from the database, never from the browser.',es:'Precios y stock se leen de la base de datos, nunca del navegador.'}],
  ['db','api','3 rows',{en:'Everything is in stock.',es:'Hay existencias de todo.'}],
  ['api','pay','create_payment(total)',{en:'The gateway takes the card. Card details never touch our server.',es:'La pasarela cobra la tarjeta. Los datos de la tarjeta nunca pasan por nuestro servidor.'}],
  ['pay','api','webhook: payment ok',{en:'The gateway confirms with a signed message.',es:'La pasarela confirma con un mensaje firmado.'}],
  ['api','db','UPDATE stock, orders',{en:'Stock goes down and the order is marked as paid.',es:'Baja el stock y el pedido queda como pagado.'}],
  ['api','mail','send(receipt)',{en:'Receipt for the customer, new order for the shop.',es:'Recibo para el cliente y pedido nuevo para la tienda.'}],
  ['api','client','200 OK',{en:'The screen shows "Payment received".',es:'La pantalla muestra «Pago recibido».'}]]},
 {name:{en:'Ask the data',es:'Preguntar a los datos'},file:'POST /api/ask',steps:[
  ['client','api','POST /api/ask',{en:'"What sold best in October?"',es:'«¿Qué se vendió más en octubre?»'}],
  ['api','ai','question → SQL',{en:'The model turns the question into a query.',es:'El modelo convierte la pregunta en una consulta.'}],
  ['ai','api','SELECT product, SUM(units) …',{en:'The server checks that the query only reads.',es:'El servidor revisa que la consulta solo lea.'}],
  ['api','db','run(query, read_only)',{en:'The query runs with a user that cannot change anything.',es:'La consulta se ejecuta con un usuario que no puede modificar nada.'}],
  ['db','api','3 rows',{en:'The real figures come back.',es:'Vuelven las cifras reales.'}],
  ['api','ai','rows → answer',{en:'The model writes the answer from those figures, not from memory.',es:'El modelo redacta la respuesta con esas cifras, no de memoria.'}],
  ['api','client','200 OK',{en:'Answer and chart on screen.',es:'Respuesta y gráfico en pantalla.'}]]}
];
const NODES={client:{en:'browser',es:'navegador'},api:{en:'server',es:'servidor'},db:{en:'database',es:'base de datos'},ai:{en:'AI',es:'IA'},pay:{en:'payments',es:'pagos'},mail:{en:'email',es:'correo'}};
const LAYERS=[
 {n:{en:'Interface',es:'Interfaz'},d:{en:'What people see and touch, on a phone or a computer.',es:'Lo que se ve y se toca, en el móvil o en el ordenador.'},t:['HTML','CSS','JavaScript','three.js','Flutter']},
 {n:{en:'Server',es:'Servidor'},d:{en:'The rules of your business: who can do what, and when.',es:'Las reglas de tu negocio: quién puede hacer qué y cuándo.'},t:['Python','FastAPI','Laravel']},
 {n:{en:'Data',es:'Datos'},d:{en:'Orders, customers and stock in one place, with no stray spreadsheets.',es:'Pedidos, clientes y stock en un solo sitio, sin hojas de cálculo sueltas.'},t:['SQL',{en:'Relational databases',es:'Bases de datos relacionales'}]},
 {n:{en:'AI',es:'IA'},d:{en:'Models that answer with your own data or sort what comes in.',es:'Modelos que responden con tus propios datos o clasifican lo que entra.'},t:['PyTorch','scikit-learn','RAG','NLP']},
 {n:{en:'Going live',es:'Puesta en marcha'},d:{en:'Published the same way every time, so an update breaks nothing.',es:'Publicado siempre de la misma forma, para que una actualización no rompa nada.'},t:['Docker','Git']}
];
const TYPED={en:['build a website','ship an app','tidy a database','shoot the photos'],es:['hacer una web','lanzar una app','ordenar una base de datos','hacer las fotos']};
const SHOP={en:[['Coffee beans 1 kg',18],['Ceramic mug',12],['Heather honey',9]],es:[['Café en grano 1 kg',18],['Taza de cerámica',12],['Miel de brezo',9]]};
const ASK=[
 {q:{en:'What sold best in October?',es:'¿Qué se vendió más en octubre?'},sql:'SELECT product, SUM(units) FROM sales WHERE month = 10 GROUP BY product',rows:{en:[['Coffee beans',82],['Honey',54],['Mugs',31]],es:[['Café en grano',82],['Miel',54],['Tazas',31]]}},
 {q:{en:'Which day do we get more bookings?',es:'¿Qué día hay más reservas?'},sql:'SELECT weekday, COUNT(*) FROM bookings GROUP BY weekday ORDER BY 2 DESC',rows:{en:[['Saturday',46],['Friday',38],['Thursday',21]],es:[['Sábado',46],['Viernes',38],['Jueves',21]]}},
 {q:{en:'Who has not ordered in 3 months?',es:'¿Quién no compra desde hace 3 meses?'},sql:"SELECT segment, COUNT(*) FROM customers WHERE last_order < NOW() - INTERVAL 90 DAY GROUP BY segment",rows:{en:[['Occasional',27],['Regular',9],['New',5]],es:[['Ocasionales',27],['Habituales',9],['Nuevos',5]]}}
];
