/**
 * Photos used across the site. All are free to use under the Pexels license
 * (https://www.pexels.com/license/). Keep the photo page link next to each one
 * so contributors can credit or swap them easily.
 */
const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const images = {
  /** https://www.pexels.com/photo/couple-buying-groceries-at-a-supermarket-4199490/ */
  heroGroceries: pexels(4199490),
  /** https://www.pexels.com/photo/a-woman-in-wedding-dress-holding-bouquet-of-flowers-9280110/ */
  heroBride: pexels(9280110),
  /** https://www.pexels.com/photo/multiethnic-couple-praying-at-table-before-eating-5996995/ */
  heroPraying: pexels(5996995),
  /** https://www.pexels.com/photo/portrait-of-muslim-couple-4046262/ */
  couplePortrait: pexels(4046262, 1000),
  /** https://www.pexels.com/photo/couple-holding-hands-over-table-4046987/ */
  holdingHands: pexels(4046987, 1400),
};
