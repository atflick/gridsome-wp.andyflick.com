export function capitalizeString(str) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getOffsetY(el) {
  let yPosition = 0;

  while(el) {
    yPosition += el.offsetTop
    el = el.offsetParent;
  }

  return yPosition
}