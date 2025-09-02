// const checkAMPM = hour => hour >= 12 ? `PM` : `AM`;
// const hourIn12hFormat = hour => hour > 12 ? (hour - 12) : hour;

export function calcDateTime(isoString: string) {
  const dateString = new Date(isoString?.replace('Z', '+06:00')).toString();

  const month = dateString.slice(4, 7);
  const date = dateString.slice(8, 10);
  const year = dateString.slice(11, 15);
  // const hour = parseInt(dateString.slice(16, 18));
  // const minute = dateString.slice(19, 21);

  return `${date} ${month} ${year}`;
}
