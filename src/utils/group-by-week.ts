import { formatISO, parseISO, startOfWeek } from 'date-fns';

/**
 * Función para agrupar datos por semana en base al campo `createdAt`.
 * @param {Array} data - Array de objetos con un campo `createdAt` en formato de fecha ISO.
 * @returns {Object} - Objeto donde las claves son las semanas y los valores son arrays de objetos de esa semana.
 */
function groupByWeek(data) {
  return data.reduce((acc, item) => {
    // Parseamos la fecha de `createdAt` y obtenemos el inicio de la semana correspondiente
    const weekStart = formatISO(startOfWeek(parseISO(item.createdAt)));

    // Si no existe una entrada para esta semana, inicializamos un array vacío
    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }

    // Agregamos el item actual al array de su semana correspondiente
    acc[weekStart].push(item);

    return acc;
  }, {});
}

export default groupByWeek;
