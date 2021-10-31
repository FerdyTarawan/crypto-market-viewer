export const abbreviateNumber = (num: string | number) => {
  const isString = typeof num === 'string';
  const number = isString ? Number(num) : num;

  if (number < 1000) {
    return isString ? num : num.toString();
  }

  let suffix = '';
  let scale = 1;

  if (number >= 1000 && number < 1_000_000) {
    suffix = 'K';
    scale = 1000;
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    suffix = 'M';
    scale = 1_000_000;
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    suffix = 'B';
    scale = 1_000_000_000;
  } else {
    suffix = 'T';
    scale = 1_000_000_000_000;
  }

  const scaled = number / scale;

  return scaled.toFixed(2) + suffix;
};
