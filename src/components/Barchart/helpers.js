const PRECIP_0 = '#ffffff';
const PRECIP_1 = '#e5e5ff';
const PRECIP_2 = '#ccccff';
const PRECIP_3 = '#b2b2ff';
const PRECIP_4 = '#9999ff';
const PRECIP_5 = '#7f7fff';
const PRECIP_6 = '#6666ff';
const PRECIP_7 = '#4c4cff';
const PRECIP_8 = '#3232ff';
const PRECIP_9 = '#1919ff';
const precipColors = [
  PRECIP_0,
  PRECIP_1,
  PRECIP_2,
  PRECIP_3,
  PRECIP_4,
  PRECIP_5,
  PRECIP_6,
  PRECIP_7,
  PRECIP_8,
  PRECIP_9,
];

export const shadeOfBlue = (precipChance) => {
  const adj = precipChance > 0 ? 5 : 0;
  const val = Math.floor((precipChance - adj) / 10);

  return precipColors[val];
};

export default shadeOfBlue;
