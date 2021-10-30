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
  } else {
    suffix = 'M';
    scale = 1_000_000;
  }

  const scaled = number / scale;

  return scaled.toFixed(2) + suffix;
};

export const toFixed = (num: number, decimalPoint: number) =>
  num.toFixed(decimalPoint);
