/** An enumeration of the icon types available */
export enum IconTypes {
  ChevronRight = "chevron-right",
  ChevronDown = "chevron-down",
  Search = "search",
}

type IconProps = {
  /** Which icon to display */
  type: IconTypes;
};

/**
 * A basic Icon component to contain the various SVG icons used in the library.
 */
export const Icon = ({ type }: IconProps) => {
  switch (type) {
    case IconTypes.ChevronRight:
      return ChevronRight;
    case IconTypes.ChevronDown:
      return ChevronDown;
    case IconTypes.Search:
      return Search;
  }
};

const ChevronRight = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.74375 0.744802C0.41875 1.0698 0.41875 1.5948 0.74375 1.9198L3.97708 5.15314L0.74375 8.38647C0.41875 8.71147 0.41875 9.23647 0.74375 9.56147C1.06875 9.88647 1.59375 9.88647 1.91875 9.56147L5.74375 5.73647C6.06875 5.41147 6.06875 4.88647 5.74375 4.56147L1.91875 0.736469C1.60208 0.419802 1.06875 0.419802 0.74375 0.744802Z"
      fill="#8E9AA5"
    />
  </svg>
);

const ChevronDown = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.53243 0.259112L5.00447 3.69622L8.47651 0.259112C8.8255 -0.0863705 9.38926 -0.0863705 9.73825 0.259112C10.0872 0.604594 10.0872 1.16268 9.73825 1.50816L5.63087 5.57422C5.28187 5.9197 4.71811 5.9197 4.36912 5.57422L0.261732 1.50816C0.0941683 1.34266 0 1.11796 0 0.883637C0 0.649314 0.0941683 0.424617 0.261732 0.259112C0.610726 -0.077512 1.18343 -0.0863705 1.53243 0.259112Z"
      fill="#8E9AA5"
    />
  </svg>
);

const Search = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2589 9.66719H10.9172L14.4505 13.2172C14.7922 13.5589 14.7922 14.1172 14.4505 14.4589C14.1089 14.8005 13.5505 14.8005 13.2089 14.4589L9.66719 10.9172V10.2589L9.44219 10.0255C8.27552 11.0255 6.68385 11.5422 4.99219 11.2589C2.67552 10.8672 0.825521 8.93385 0.542188 6.60052C0.108855 3.07552 3.07552 0.108855 6.60052 0.542188C8.93385 0.825521 10.8672 2.67552 11.2589 4.99219C11.5422 6.68385 11.0255 8.27552 10.0255 9.44219L10.2589 9.66719ZM2.16719 5.91719C2.16719 7.99219 3.84219 9.66719 5.91719 9.66719C7.99219 9.66719 9.66719 7.99219 9.66719 5.91719C9.66719 3.84219 7.99219 2.16719 5.91719 2.16719C3.84219 2.16719 2.16719 3.84219 2.16719 5.91719Z"
      fill="#8E9AA5"
    />
  </svg>
);
