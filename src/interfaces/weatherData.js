import { arrayOf, number, shape, string } from 'prop-types';

export default shape({
  temp: shape({
    max: number,
    min: number,
  }),
  weather: arrayOf(
    shape({
      description: string,
      icon: string,
    }),
  ),
});
