export function isArabicName(name) {
  const arabicRegex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/;
  return arabicRegex.test(name);
}
