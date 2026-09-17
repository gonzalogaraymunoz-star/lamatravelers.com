'use client';

import { useEffect } from 'react';
import type { AppLanguage } from './LanguageProvider';
import { useLanguage } from './LanguageProvider';

type Translation = { en: string; 'pt-BR': string };

const D: Record<string, Translation> = {
  // Header / navigation
  'Menú': { en: 'Menu', 'pt-BR': 'Menu' },
  'Cerrar': { en: 'Close', 'pt-BR': 'Fechar' },
  'Abrir menú': { en: 'Open menu', 'pt-BR': 'Abrir menu' },
  'Cerrar menú': { en: 'Close menu', 'pt-BR': 'Fechar menu' },
  'Explora': { en: 'Explore', 'pt-BR': 'Explore' },
  'Experiencias': { en: 'Experiences', 'pt-BR': 'Experiências' },
  'Colecciones': { en: 'Collections', 'pt-BR': 'Coleções' },
  'Alta montaña': { en: 'High altitude', 'pt-BR': 'Alta montanha' },
  'Planifica': { en: 'Plan', 'pt-BR': 'Planeje' },
  'A tu medida': { en: 'Tailor-made', 'pt-BR': 'Sob medida' },
  'Contacto': { en: 'Contact', 'pt-BR': 'Contato' },
  'Complementos': { en: 'Add-ons', 'pt-BR': 'Complementos' },
  'Traslados y logística': { en: 'Transfers & logistics', 'pt-BR': 'Traslados e logística' },
  'WhatsApp ventas': { en: 'Sales WhatsApp', 'pt-BR': 'WhatsApp de vendas' },
  'San Pedro de Atacama · Chile': { en: 'San Pedro de Atacama · Chile', 'pt-BR': 'San Pedro de Atacama · Chile' },

  // Homepage
  'Atacama,': { en: 'Atacama,', 'pt-BR': 'Atacama,' },
  'hecho a tu medida.': { en: 'made around you.', 'pt-BR': 'feito sob medida.' },
  'Experiencias diseñadas con criterio local, logística clara y el tiempo suficiente para mirar de verdad.': {
    en: 'Experiences designed with local insight, clear logistics and enough time to truly take it all in.',
    'pt-BR': 'Experiências desenhadas com conhecimento local, logística clara e tempo suficiente para viver tudo de verdade.'
  },
  'Explorar experiencias': { en: 'Explore experiences', 'pt-BR': 'Explorar experiências' },
  'Crear mi viaje': { en: 'Build my trip', 'pt-BR': 'Criar minha viagem' },
  'Desliza para descubrir': { en: 'Scroll to discover', 'pt-BR': 'Role para descobrir' },
  'No se trata de hacer más tours.': { en: 'It is not about doing more tours.', 'pt-BR': 'Não se trata de fazer mais passeios.' },
  'Se trata de vivir mejor el desierto.': { en: 'It is about experiencing the desert better.', 'pt-BR': 'Trata-se de viver melhor o deserto.' },
  'Conectamos paisajes, cultura, movimiento y cielo en una misma estadía. Cuando el viaje lo necesita, también podemos sumar bienestar y traslados como servicios complementarios dentro de la planificación.': {
    en: 'We connect landscapes, culture, movement and sky within one stay. When your trip needs it, we can also add wellness and transfers as complementary services within the plan.',
    'pt-BR': 'Conectamos paisagens, cultura, movimento e céu em uma mesma estadia. Quando a viagem pede, também podemos incluir bem-estar e traslados como serviços complementares no planejamento.'
  },
  'Empieza por aquí': { en: 'Start here', 'pt-BR': 'Comece por aqui' },
  '¿Cómo quieres vivir Atacama?': { en: 'How do you want to experience Atacama?', 'pt-BR': 'Como você quer viver o Atacama?' },
  'Ver todas las experiencias ↗': { en: 'View all experiences ↗', 'pt-BR': 'Ver todas as experiências ↗' },
  'Desierto': { en: 'Desert', 'pt-BR': 'Deserto' },
  'Altiplano': { en: 'Highlands', 'pt-BR': 'Altiplano' },
  'Cielo': { en: 'Sky', 'pt-BR': 'Céu' },
  'Montaña': { en: 'Mountain', 'pt-BR': 'Montanha' },
  'Valles, salares, lagunas y paisajes esenciales de San Pedro.': { en: 'Valleys, salt flats, lagoons and essential San Pedro landscapes.', 'pt-BR': 'Vales, salares, lagoas e paisagens essenciais de San Pedro.' },
  'Géiseres, Piedras Rojas, lagunas y rutas de gran escala.': { en: 'Geysers, Piedras Rojas, lagoons and expansive routes.', 'pt-BR': 'Gêiseres, Piedras Rojas, lagoas e rotas de grande escala.' },
  'Noches atacameñas, astronomía y formatos privados.': { en: 'Atacama nights, astronomy and private formats.', 'pt-BR': 'Noites atacamenhas, astronomia e formatos privados.' },
  'Ascensiones con preparación, aclimatación y lectura de condiciones.': { en: 'Ascents with preparation, acclimatization and condition assessment.', 'pt-BR': 'Ascensões com preparação, aclimatação e leitura das condições.' },
  'Selección LAMA': { en: 'LAMA selection', 'pt-BR': 'Seleção LAMA' },
  'Conoce la experiencia antes de elegirla.': { en: 'Know the experience before choosing it.', 'pt-BR': 'Conheça a experiência antes de escolher.' },
  'Cada tarjeta abre una ficha conectada al catálogo de Supabase: duración, horario, recorrido, formato e imágenes reales disponibles para esa experiencia.': {
    en: 'Each card opens a profile connected to our catalog: duration, schedule, route, format and real images available for that experience.',
    'pt-BR': 'Cada card abre uma ficha conectada ao catálogo: duração, horário, percurso, formato e imagens reais disponíveis para essa experiência.'
  },
  'Conocer experiencia': { en: 'View experience', 'pt-BR': 'Conhecer experiência' },
  'Conocer experiencia ': { en: 'View experience ', 'pt-BR': 'Conhecer experiência ' },
  'Tu viaje empieza aquí': { en: 'Your trip starts here', 'pt-BR': 'Sua viagem começa aqui' },
  'Dinos cuándo vienes.': { en: 'Tell us when you are coming.', 'pt-BR': 'Conte quando você vem.' },
  'Nosotros ordenamos el resto.': { en: 'We organize the rest.', 'pt-BR': 'Nós organizamos o resto.' },
  'En vez de obligarte a comprar un paquete cerrado, partimos por tus fechas, número de pasajeros y la forma en que quieres viajar.': {
    en: 'Instead of forcing you into a fixed package, we start with your dates, number of travelers and the way you want to travel.',
    'pt-BR': 'Em vez de limitar você a um pacote fechado, começamos pelas datas, número de viajantes e a forma como você quer viajar.'
  },
  'experiencias turísticas conectadas': { en: 'tourism experiences connected', 'pt-BR': 'experiências turísticas conectadas' },
  'catálogo central en Supabase': { en: 'central catalog in Supabase', 'pt-BR': 'catálogo central no Supabase' },
  'equipo coordinando tu estadía': { en: 'team coordinating your stay', 'pt-BR': 'equipe coordenando sua estadia' },
  'registro SERNATUR': { en: 'SERNATUR registration', 'pt-BR': 'registro SERNATUR' },
  'Vigente': { en: 'Current', 'pt-BR': 'Vigente' },

  // Catalog
  'Experiencias LAMA · San Pedro de Atacama': { en: 'LAMA Experiences · San Pedro de Atacama', 'pt-BR': 'Experiências LAMA · San Pedro de Atacama' },
  'Elige una experiencia.': { en: 'Choose an experience.', 'pt-BR': 'Escolha uma experiência.' },
  'O construye un viaje.': { en: 'Or build a trip.', 'pt-BR': 'Ou monte uma viagem.' },
  'Todos': { en: 'All', 'pt-BR': 'Todos' },
  'Buscar': { en: 'Search', 'pt-BR': 'Buscar' },
  'Tour medio día': { en: 'Half-day tour', 'pt-BR': 'Passeio de meio dia' },
  'Tour día completo': { en: 'Full-day tour', 'pt-BR': 'Passeio de dia inteiro' },
  'Nocturno': { en: 'Night', 'pt-BR': 'Noturno' },

  // Experience detail
  'Altitud': { en: 'Altitude', 'pt-BR': 'Altitude' },
  'Dificultad': { en: 'Difficulty', 'pt-BR': 'Dificuldade' },
  'Edad': { en: 'Age', 'pt-BR': 'Idade' },
  'Duración': { en: 'Duration', 'pt-BR': 'Duração' },
  'Horario': { en: 'Schedule', 'pt-BR': 'Horário' },
  'Formato': { en: 'Format', 'pt-BR': 'Formato' },
  'Por confirmar': { en: 'To be confirmed', 'pt-BR': 'A confirmar' },
  'A coordinar': { en: 'To be arranged', 'pt-BR': 'A combinar' },
  'Detalle': { en: 'Details', 'pt-BR': 'Detalhes' },
  'La experiencia': { en: 'The experience', 'pt-BR': 'A experiência' },
  'Lugar de recogida:': { en: 'Pickup location:', 'pt-BR': 'Local de embarque:' },
  'Hora de recogida:': { en: 'Pickup time:', 'pt-BR': 'Horário de embarque:' },
  'Conoce más': { en: 'Learn more', 'pt-BR': 'Saiba mais' },
  'El lugar': { en: 'The place', 'pt-BR': 'O lugar' },
  'Itinerario': { en: 'Itinerary', 'pt-BR': 'Roteiro' },
  'La ruta': { en: 'The route', 'pt-BR': 'A rota' },
  'Servicio': { en: 'Service', 'pt-BR': 'Serviço' },
  'Qué incluye': { en: 'What is included', 'pt-BR': 'O que inclui' },
  'No incluye': { en: 'Not included', 'pt-BR': 'Não inclui' },
  'Recomendaciones': { en: 'Recommendations', 'pt-BR': 'Recomendações' },
  'Antes de salir': { en: 'Before you go', 'pt-BR': 'Antes de sair' },
  'Experiencia': { en: 'Experience', 'pt-BR': 'Experiência' },
  'Qué vas a vivir': { en: 'What you will experience', 'pt-BR': 'O que você vai viver' },
  'Coordinación previa': { en: 'Pre-trip coordination', 'pt-BR': 'Coordenação prévia' },
  'Confirmación de horario y condiciones': { en: 'Schedule and conditions confirmation', 'pt-BR': 'Confirmação de horário e condições' },
  'Galería': { en: 'Gallery', 'pt-BR': 'Galeria' },
  'Observaciones': { en: 'Notes', 'pt-BR': 'Observações' },
  'Operación en desierto': { en: 'Desert operations', 'pt-BR': 'Operação no deserto' },
  'Horarios, accesos y orden de recorrido pueden ajustarse por clima, temporada y condiciones operativas. LAMA confirma los detalles finales antes de la salida.': {
    en: 'Schedules, access and route order may change due to weather, season and operating conditions. LAMA confirms final details before departure.',
    'pt-BR': 'Horários, acessos e ordem do percurso podem mudar por clima, temporada e condições operacionais. A LAMA confirma os detalhes finais antes da saída.'
  },
  'Reserva aquí': { en: 'Book here', 'pt-BR': 'Reserve aqui' },
  'Cuéntanos tus fechas y pasajeros. Te confirmamos disponibilidad y la modalidad apropiada antes de cualquier pago.': {
    en: 'Tell us your dates and number of travelers. We confirm availability and the right format before any payment.',
    'pt-BR': 'Informe suas datas e número de viajantes. Confirmamos disponibilidade e a modalidade adequada antes de qualquer pagamento.'
  },
  'Consultar disponibilidad': { en: 'Check availability', 'pt-BR': 'Consultar disponibilidade' },
  'Sumar a mi viaje': { en: 'Add to my trip', 'pt-BR': 'Adicionar à minha viagem' },
  'Esta ficha muestra información pública y operativa. Precios, disponibilidad y condiciones comerciales se gestionan por separado.': {
    en: 'This page shows public and operational information. Prices, availability and commercial conditions are managed separately.',
    'pt-BR': 'Esta ficha mostra informações públicas e operacionais. Preços, disponibilidade e condições comerciais são tratados separadamente.'
  },
  'Sigue explorando': { en: 'Keep exploring', 'pt-BR': 'Continue explorando' },
  'Combina esta experiencia con tu estadía completa.': { en: 'Combine this experience with your full stay.', 'pt-BR': 'Combine esta experiência com sua estadia completa.' },
  'Volver al catálogo ↗': { en: 'Back to catalog ↗', 'pt-BR': 'Voltar ao catálogo ↗' },

  // Planner
  '¿Cuándo vienes?': { en: 'When are you coming?', 'pt-BR': 'Quando você vem?' },
  'Llegada': { en: 'Arrival', 'pt-BR': 'Chegada' },
  'Salida': { en: 'Departure', 'pt-BR': 'Saída' },
  'Fecha de llegada': { en: 'Arrival date', 'pt-BR': 'Data de chegada' },
  'Fecha de salida': { en: 'Departure date', 'pt-BR': 'Data de saída' },
  '¿Cuántos viajan?': { en: 'How many are traveling?', 'pt-BR': 'Quantas pessoas viajam?' },
  '¿Qué te mueve?': { en: 'What are you looking for?', 'pt-BR': 'O que você busca?' },
  'Paisajes y clásicos': { en: 'Landscapes & classics', 'pt-BR': 'Paisagens e clássicos' },
  'Aventura y trekking': { en: 'Adventure & trekking', 'pt-BR': 'Aventura e trekking' },
  'Cielo y astronomía': { en: 'Sky & astronomy', 'pt-BR': 'Céu e astronomia' },
  'Cultura local': { en: 'Local culture', 'pt-BR': 'Cultura local' },
  'Wellness y descanso': { en: 'Wellness & rest', 'pt-BR': 'Bem-estar e descanso' },
  'Un poco de todo': { en: 'A bit of everything', 'pt-BR': 'Um pouco de tudo' },
  'Hablar con ventas': { en: 'Talk to sales', 'pt-BR': 'Falar com vendas' },
  'Registrando…': { en: 'Registering…', 'pt-BR': 'Registrando…' },
  'Tus fechas y preferencias quedan asociadas a una solicitud LAMA antes de abrir WhatsApp, para no empezar de cero en ventas.': {
    en: 'Your dates and preferences are linked to a LAMA request before WhatsApp opens, so our sales team already has the context.',
    'pt-BR': 'Suas datas e preferências ficam vinculadas a uma solicitação LAMA antes de abrir o WhatsApp, para que a equipe de vendas já tenha o contexto.'
  },
  'Selecciona llegada y salida.': { en: 'Select arrival and departure dates.', 'pt-BR': 'Selecione as datas de chegada e saída.' },
  'La salida no puede ser anterior a la llegada.': { en: 'Departure cannot be before arrival.', 'pt-BR': 'A saída não pode ser anterior à chegada.' },
  'Preparando tu conversación con ventas…': { en: 'Preparing your conversation with sales…', 'pt-BR': 'Preparando sua conversa com vendas…' },

  // Footer
  'Experiencias y expediciones en San Pedro de Atacama.': { en: 'Experiences and expeditions in San Pedro de Atacama.', 'pt-BR': 'Experiências e expedições em San Pedro de Atacama.' },
  'Registro SERNATUR vigente.': { en: 'Current SERNATUR registration.', 'pt-BR': 'Registro SERNATUR vigente.' },
  'Viaje a tu medida': { en: 'Tailor-made trip', 'pt-BR': 'Viagem sob medida' },
  'Guía de San Pedro': { en: 'San Pedro guide', 'pt-BR': 'Guia de San Pedro' },
  'Cambios y cancelaciones': { en: 'Changes & cancellations', 'pt-BR': 'Alterações e cancelamentos' },
  'Ventas': { en: 'Sales', 'pt-BR': 'Vendas' },
  'Viajar bien empieza antes de salir.': { en: 'Traveling well starts before departure.', 'pt-BR': 'Viajar bem começa antes de sair.' },

  // Common tour names
  'Tour Astronómico': { en: 'Astronomy Tour', 'pt-BR': 'Tour Astronômico' },
  'Valle de la Luna': { en: 'Moon Valley', 'pt-BR': 'Vale da Lua' },
  'Géiseres del Tatio': { en: 'Tatio Geysers', 'pt-BR': 'Gêiseres do Tatio' },
  'Ruta de los Salares': { en: 'Salt Flats Route', 'pt-BR': 'Rota dos Salares' },
  'Piedras Rojas + Lagunas Altiplánicas + Laguna Chaxa': { en: 'Piedras Rojas + Highland Lagoons + Chaxa Lagoon', 'pt-BR': 'Piedras Rojas + Lagoas Altiplânicas + Lagoa Chaxa' },
  'Laguna Cejar + Ojos del Salar + Tebenquiche': { en: 'Cejar Lagoon + Ojos del Salar + Tebenquiche', 'pt-BR': 'Lagoa Cejar + Ojos del Salar + Tebenquiche' },
  'Lagunas Escondidas de Baltinache': { en: 'Hidden Lagoons of Baltinache', 'pt-BR': 'Lagoas Escondidas de Baltinache' },
  'Valle del Arcoíris + Yerbas Buenas': { en: 'Rainbow Valley + Yerbas Buenas', 'pt-BR': 'Vale do Arco-Íris + Yerbas Buenas' },
  'Termas de Puritama': { en: 'Puritama Hot Springs', 'pt-BR': 'Termas de Puritama' },
  'Trekking Guatín': { en: 'Guatín Trek', 'pt-BR': 'Trekking Guatín' },

  // Common operational terms inside product data
  'Baja': { en: 'Low', 'pt-BR': 'Baixa' },
  'Media': { en: 'Medium', 'pt-BR': 'Média' },
  'Alta': { en: 'High', 'pt-BR': 'Alta' },
  'Baja–media': { en: 'Low–medium', 'pt-BR': 'Baixa–média' },
  'Media por altura y temperatura': { en: 'Medium due to altitude and temperature', 'pt-BR': 'Média devido à altitude e temperatura' },
  'Transporte': { en: 'Transportation', 'pt-BR': 'Transporte' },
  'Guía': { en: 'Guide', 'pt-BR': 'Guia' },
  'Desayuno': { en: 'Breakfast', 'pt-BR': 'Café da manhã' },
  'Almuerzo': { en: 'Lunch', 'pt-BR': 'Almoço' },
  'Entradas': { en: 'Admission tickets', 'pt-BR': 'Ingressos' },
  'Entrada': { en: 'Admission ticket', 'pt-BR': 'Ingresso' },
  'Regreso': { en: 'Return', 'pt-BR': 'Retorno' },
  'Agua': { en: 'Water', 'pt-BR': 'Água' },
  'Gorro': { en: 'Hat', 'pt-BR': 'Gorro' },
  'Lentes': { en: 'Sunglasses', 'pt-BR': 'Óculos de sol' },
  'Protección solar': { en: 'Sun protection', 'pt-BR': 'Proteção solar' },
  'Bloqueador': { en: 'Sunscreen', 'pt-BR': 'Protetor solar' },
  'Toalla': { en: 'Towel', 'pt-BR': 'Toalha' },
  'Traje de baño': { en: 'Swimsuit', 'pt-BR': 'Roupa de banho' },
  'Ropa cómoda': { en: 'Comfortable clothing', 'pt-BR': 'Roupa confortável' },
  'Calzado cerrado': { en: 'Closed shoes', 'pt-BR': 'Calçado fechado' },
  'Abrigo': { en: 'Warm clothing', 'pt-BR': 'Agasalho' },
  'Ropa térmica': { en: 'Thermal clothing', 'pt-BR': 'Roupa térmica' },
  'Fotografías': { en: 'Photos', 'pt-BR': 'Fotografias' },
  'Telescopios': { en: 'Telescopes', 'pt-BR': 'Telescópios' },
  'Encuentro': { en: 'Meeting point', 'pt-BR': 'Encontro' },
  'Traslado al observatorio': { en: 'Transfer to the observatory', 'pt-BR': 'Traslado ao observatório' },
  'Interpretación del cielo': { en: 'Sky interpretation', 'pt-BR': 'Interpretação do céu' },
  'Observación con telescopios': { en: 'Telescope observation', 'pt-BR': 'Observação com telescópios' },
  'Regreso al hotel': { en: 'Return to hotel', 'pt-BR': 'Retorno ao hotel' },

  // Main product descriptions
  'Experiencia nocturna dedicada a descubrir el cielo de Atacama mediante relato guiado, observación astronómica y telescopios.': {
    en: 'A night experience dedicated to discovering the Atacama sky through guided storytelling, astronomical observation and telescopes.',
    'pt-BR': 'Uma experiência noturna dedicada a descobrir o céu do Atacama por meio de narrativa guiada, observação astronômica e telescópios.'
  },
  'La baja humedad, altitud, escasa contaminación lumínica y gran número de noches despejadas convierten al Desierto de Atacama en uno de los destinos astronómicos más importantes del mundo.': {
    en: 'Low humidity, altitude, minimal light pollution and a high number of clear nights make the Atacama Desert one of the world’s leading astronomy destinations.',
    'pt-BR': 'A baixa umidade, a altitude, a pouca poluição luminosa e o grande número de noites limpas fazem do Deserto do Atacama um dos principais destinos astronômicos do mundo.'
  },
  'Salida de madrugada hacia el altiplano para observar el campo geotérmico durante las primeras horas del día, cuando las bajas temperaturas hacen especialmente visibles las fumarolas.': {
    en: 'Early-morning departure to the highlands to observe the geothermal field at dawn, when low temperatures make the steam columns especially visible.',
    'pt-BR': 'Saída de madrugada rumo ao altiplano para observar o campo geotérmico nas primeiras horas do dia, quando as baixas temperaturas deixam as fumarolas especialmente visíveis.'
  },
  'Una jornada completa que conecta el Salar de Atacama con algunos de los paisajes más espectaculares del altiplano: Laguna Chaxa, Piedras Rojas y las lagunas Miscanti y Miñiques.': {
    en: 'A full day connecting the Atacama Salt Flat with some of the highlands’ most spectacular landscapes: Chaxa Lagoon, Piedras Rojas and the Miscanti and Miñiques lagoons.',
    'pt-BR': 'Um dia completo conectando o Salar de Atacama a algumas das paisagens mais espetaculares do altiplano: Lagoa Chaxa, Piedras Rojas e as lagoas Miscanti e Miñiques.'
  },
  'Ruta por distintos ecosistemas del Salar de Atacama que combina una laguna salina, formaciones de agua conocidas como Ojos del Salar y el paisaje abierto de Tebenquiche.': {
    en: 'A route through different Atacama Salt Flat ecosystems, combining a saline lagoon, the water formations known as Ojos del Salar and the open landscape of Tebenquiche.',
    'pt-BR': 'Uma rota por diferentes ecossistemas do Salar de Atacama, combinando uma lagoa salina, as formações de água conhecidas como Ojos del Salar e a paisagem aberta de Tebenquiche.'
  },
  'Una travesía por el altiplano que conecta salares, lagunas, volcanes y grandes extensiones prácticamente deshabitadas.': {
    en: 'A highland journey connecting salt flats, lagoons, volcanoes and vast, almost uninhabited landscapes.',
    'pt-BR': 'Uma travessia pelo altiplano conectando salares, lagoas, vulcões e grandes extensões praticamente desabitadas.'
  },
  'Tiempo dedicado al descanso y baño en aguas termales dentro de una quebrada natural del altiplano.': {
    en: 'Time dedicated to rest and bathing in thermal waters inside a natural highland canyon.',
    'pt-BR': 'Tempo dedicado ao descanso e banho em águas termais dentro de uma quebrada natural do altiplano.'
  },
  'Una ruta que combina patrimonio arqueológico y geología, recorriendo los petroglifos de Yerbas Buenas y las formaciones minerales multicolores del Valle del Arcoíris.': {
    en: 'A route combining archaeological heritage and geology, visiting the Yerbas Buenas petroglyphs and the multicolored mineral formations of Rainbow Valley.',
    'pt-BR': 'Uma rota que combina patrimônio arqueológico e geologia, passando pelos petróglifos de Yerbas Buenas e pelas formações minerais multicoloridas do Vale do Arco-Íris.'
  },
  'Recorrido por uno de los paisajes más reconocibles del Desierto de Atacama, atravesando formaciones minerales y relieves modelados por la erosión dentro de la Cordillera de la Sal. La experiencia culmina con un aperitivo y vistas panorámicas desde el sector de Ckari.': {
    en: 'A journey through one of the Atacama Desert’s most iconic landscapes, crossing mineral formations and erosion-shaped terrain in the Salt Range. The experience ends with an aperitif and panoramic views from Ckari.',
    'pt-BR': 'Um percurso por uma das paisagens mais reconhecíveis do Deserto do Atacama, atravessando formações minerais e relevos moldados pela erosão na Cordilheira do Sal. A experiência termina com um aperitivo e vistas panorâmicas de Ckari.'
  },
  'Caminata por el llamado Valle de los Cactus, recorriendo un paisaje de quebradas, vegetación andina y grandes cactus columnares.': {
    en: 'A hike through the so-called Cactus Valley, crossing ravines, Andean vegetation and large columnar cacti.',
    'pt-BR': 'Caminhada pelo chamado Vale dos Cactos, percorrendo uma paisagem de quebradas, vegetação andina e grandes cactos colunares.'
  },
  'Una alternativa más íntima dentro de la Cordillera de la Sal. Vallecito combina formaciones minerales, amplios horizontes del desierto y puntos fotográficos característicos, cerrando la experiencia con un aperitivo.': {
    en: 'A more intimate alternative within the Salt Range. Vallecito combines mineral formations, wide desert horizons and distinctive photo spots, ending with an aperitif.',
    'pt-BR': 'Uma alternativa mais íntima dentro da Cordilheira do Sal. Vallecito combina formações minerais, amplos horizontes do deserto e pontos fotográficos característicos, encerrando a experiência com um aperitivo.'
  },
};

const textState = new WeakMap<Text, { original: string; last: string }>();
const attrState = new WeakMap<Element, Map<string, { original: string; last: string }>>();

function dynamic(text: string, language: AppLanguage): string {
  if (language === 'es') return text;
  const T = (en: string, pt: string) => language === 'en' ? en : pt;
  let m: RegExpMatchArray | null;

  if ((m = text.match(/^(\d+) experiencias turísticas conectadas$/))) {
    return T(m[1] + ' tourism experiences connected', m[1] + ' experiências turísticas conectadas');
  }
  if ((m = text.match(/^(\d+) experiencias turísticas organizadas para conocer qué vas a vivir antes de consultar disponibilidad\.$/))) {
    return T(m[1] + ' tourism experiences organized so you know what you will experience before checking availability.', m[1] + ' experiências turísticas organizadas para você conhecer o que vai viver antes de consultar disponibilidade.');
  }
  if ((m = text.match(/^¿Quieres incluir (.+) en tu viaje\?$/))) {
    return T('Would you like to include ' + m[1] + ' in your trip?', 'Quer incluir ' + m[1] + ' na sua viagem?');
  }
  if ((m = text.match(/^(\d+) noche(s)? · (\d+) día(s)?$/))) {
    return T(m[1] + (m[1] === '1' ? ' night' : ' nights') + ' · ' + m[3] + (m[3] === '1' ? ' day' : ' days'), m[1] + (m[1] === '1' ? ' noite' : ' noites') + ' · ' + m[3] + (m[3] === '1' ? ' dia' : ' dias'));
  }
  if ((m = text.match(/^Solicitud (.+) registrada\. Abrimos WhatsApp para continuar\.$/))) {
    return T('Request ' + m[1] + ' registered. We are opening WhatsApp to continue.', 'Solicitação ' + m[1] + ' registrada. Vamos abrir o WhatsApp para continuar.');
  }
  return text;
}

export function translateUiText(value: string, language: AppLanguage): string {
  if (language === 'es') return value;
  const lead = value.match(/^(\s*)(.*?)(\s*)$/s);
  if (!lead) return value;
  const [, before, core, after] = lead;
  if (!core) return value;
  const translated = D[core]?.[language] || dynamic(core, language);
  return before + translated + after;
}

function blocked(node: Node) {
  const parent = node.nodeType === Node.ELEMENT_NODE ? node as Element : node.parentElement;
  return Boolean(parent?.closest('script,style,code,pre,[data-no-translate="true"]'));
}

function processText(node: Text, language: AppLanguage) {
  if (blocked(node)) return;
  const current = node.nodeValue || '';
  if (!current.trim()) return;
  let state = textState.get(node);
  if (!state) {
    state = { original: current, last: current };
    textState.set(node, state);
  } else if (current !== state.last) {
    state.original = current;
  }
  const next = translateUiText(state.original, language);
  state.last = next;
  if (current !== next) node.nodeValue = next;
}

const ATTRS = ['placeholder', 'title', 'aria-label'];

function processElement(el: Element, language: AppLanguage) {
  if (blocked(el)) return;
  let states = attrState.get(el);
  if (!states) {
    states = new Map();
    attrState.set(el, states);
  }
  for (const attr of ATTRS) {
    if (!el.hasAttribute(attr)) continue;
    const current = el.getAttribute(attr) || '';
    let state = states.get(attr);
    if (!state) {
      state = { original: current, last: current };
      states.set(attr, state);
    } else if (current !== state.last) {
      state.original = current;
    }
    const next = translateUiText(state.original, language);
    state.last = next;
    if (current !== next) el.setAttribute(attr, next);
  }
}

function walk(root: Node, language: AppLanguage) {
  if (root.nodeType === Node.TEXT_NODE) {
    processText(root as Text, language);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
  if (root.nodeType === Node.ELEMENT_NODE) processElement(root as Element, language);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.nodeType === Node.TEXT_NODE) processText(node as Text, language);
    else if (node.nodeType === Node.ELEMENT_NODE) processElement(node as Element, language);
  }
}

export default function LocalizationBridge() {
  const { language } = useLanguage();

  useEffect(() => {
    const root = document.body;
    document.title = language === 'en'
      ? 'LAMA Travelers | Experiences in San Pedro de Atacama'
      : language === 'pt-BR'
        ? 'LAMA Travelers | Experiências em San Pedro de Atacama'
        : 'LAMA Travelers | Experiencias en San Pedro de Atacama';

    walk(root, language);

    let applying = false;
    const observer = new MutationObserver((records) => {
      if (applying) return;
      applying = true;
      try {
        for (const record of records) {
          if (record.type === 'characterData') processText(record.target as Text, language);
          else if (record.type === 'attributes') processElement(record.target as Element, language);
          else for (const node of Array.from(record.addedNodes)) walk(node, language);
        }
      } finally {
        applying = false;
      }
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });

    return () => observer.disconnect();
  }, [language]);

  return null;
}
