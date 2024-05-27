export function getYears(startYear = 2020) {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years.reverse();
}
