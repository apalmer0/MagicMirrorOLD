const kelvinToFarenheit = (kelvin) => {
  const constant = 459.67;
  const multiplier = kelvin * (9 / 5);

  return Math.floor(multiplier - constant);
};

export default {
  kelvinToFarenheit,
};
