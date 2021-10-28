function getMinMax(str) {
  let arrayFromStr = str
    .split(' ')
    .map(item => parseFloat(item))
    .filter(item => isFinite(item));
  return {
    min: Math.min(...arrayFromStr),
    max: Math.max(...arrayFromStr),
  };
}
