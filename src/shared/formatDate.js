// Преобразование из ДД.ММ.ГГГГ в ГГГГ-ММ-ДД
export const formatDateForInput = (date) => {
  if (!date) return '';
  const [day, month, year] = date.split('.');
  return `${year}-${month}-${day}`;
}

// Преобразование из ГГГГ-ММ-ДД в ДД.ММ.ГГГГ (если нужно для сохранения)
export const formatDateFromInput = (date) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}