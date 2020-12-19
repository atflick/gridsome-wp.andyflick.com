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

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};