/**
 * Datos de la página /contacto (docs/copy.md §8).
 *
 * Centraliza el copy del formulario, los mensajes de validación, la
 * confirmación simulada y los datos de contacto de la columna derecha,
 * al mismo estilo que src/data/dining.js. El contrato del select "Tipo
 * de habitación" vive en src/data/rooms.js (slug + formLabel); aquí
 * solo se referencia, no se duplica.
 *
 * Las mayúsculas de los eyebrows las pone CSS (utilidad `eyebrow`),
 * nunca estos datos (copy §11).
 */

/** Encabezado de la página (copy §8.1). */
export const contactoHeader = {
  eyebrow: 'Reservaciones',
  titulo: 'Empecemos por tus fechas',
  intro:
    'Cuéntanos cuándo te gustaría venir y nuestro concierge te responderá el mismo día con disponibilidad y una propuesta a tu medida. Sin compromiso: una conversación, no una transacción.',
};

/** Opciones del selector de huéspedes (copy §8.2), mismo set que la BookingBar. */
export const guestOptions = [
  { value: '1', label: '1 huésped' },
  { value: '2', label: '2 huéspedes' },
  { value: '3', label: '3 huéspedes' },
  { value: '4', label: '4 huéspedes' },
  { value: '5', label: '5 o más' },
];

/** Labels, placeholders y ayudas del formulario (copy §8.2). */
export const formCopy = {
  nombre: {
    label: 'Nombre completo',
    placeholder: 'María Fernanda López',
  },
  email: {
    label: 'Correo electrónico',
    placeholder: 'nombre@correo.com',
  },
  llegada: {
    label: 'Fecha de llegada',
    ayuda: 'A partir de hoy',
  },
  salida: {
    label: 'Fecha de salida',
    ayuda: 'Posterior a tu llegada',
  },
  huespedes: {
    label: 'Huéspedes',
    placeholder: 'Selecciona',
  },
  habitacion: {
    label: 'Tipo de habitación',
    sinPreferencia: 'Sin preferencia',
  },
  mensaje: {
    label: 'Mensaje (opcional)',
    placeholder: '¿Celebras algo? ¿Llegas en vuelo nocturno? Cuéntanos.',
  },
  enviar: 'Enviar solicitud',
  enviando: 'Enviando…',
  nota: 'Al enviar no se realiza ningún cargo. Un concierge confirmará disponibilidad contigo por correo.',
};

/** Mensajes de error de validación (copy §8.3). */
export const errores = {
  nombreVacio: 'Escribe tu nombre para saber a quién respondemos.',
  emailVacio: 'Necesitamos tu correo para enviarte la respuesta.',
  emailInvalido:
    'Ese correo parece incompleto. Revisa que tenga el formato nombre@correo.com.',
  llegadaVacia: 'Elige tu fecha de llegada.',
  llegadaPasado: 'La fecha de llegada ya pasó. Elige una a partir de hoy.',
  salidaVacia: 'Elige tu fecha de salida.',
  salidaInvalida: 'La salida debe ser después de tu llegada. Ajusta las fechas.',
  huespedesVacio: 'Indícanos cuántos huéspedes serán.',
  resumen: 'Revisa los campos marcados antes de enviar tu solicitud.',
};

/** Confirmación simulada (copy §8.4). El cuerpo se interpola en la página. */
export const confirmacion = {
  titulo: 'Tu solicitud está en buenas manos',
  boton: 'Entendido',
  linkSecundario: 'Mientras tanto, conoce las experiencias →',
  linkSecundarioTo: '/experiencias',
};

/** Datos de contacto de la columna derecha (copy §8.5). */
export const contactoInfo = {
  encabezado: 'Aurea Vita',
  direccion: [
    'Av. Escénica 1200, Lomas del Pacífico',
    'Acapulco de Juárez, Guerrero, 39880 · México',
  ],
  telefono: '+52 744 482 0136',
  /* tel: en formato E.164 — sin espacios ni guiones para el marcador. */
  telefonoHref: 'tel:+527444820136',
  email: 'reservaciones@aureavita.mx',
  horario: 'Concierge disponible todos los días · 8:00 – 22:00',
  foto: {
    src: '/fotos_hotel/lobby/lobby_05.jpeg',
    alt: 'Lobby de Aurea Vita con arquitectura de doble altura y luz natural',
  },
};
