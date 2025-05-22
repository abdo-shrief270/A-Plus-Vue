export function useDateFormate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
    .format(new Date(date))
    .replace(/\//g, '-');
}
