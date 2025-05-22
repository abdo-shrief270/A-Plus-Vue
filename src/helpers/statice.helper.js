export function getInitials(fullName = "") {
  const words = fullName.split(" ");
  const firstLetter = words[0].charAt(0).toUpperCase();
  const lastLetter =
    words.length > 1 ? words[words.length - 1].charAt(0).toUpperCase() : "";
  return firstLetter + lastLetter;
}
