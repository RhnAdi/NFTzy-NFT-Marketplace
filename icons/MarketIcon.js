import * as React from "react"

const MarketIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M20 14.81V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5.19a4.25 4.25 0 0 0 1.25.19 4.3 4.3 0 0 0 2.25-.64 4.28 4.28 0 0 0 4.5 0 4.28 4.28 0 0 0 4.5 0 4.3 4.3 0 0 0 2.25.64 4.25 4.25 0 0 0 1.25-.19ZM21.76 9l-1.59-5.55A2 2 0 0 0 18.25 2H5.75a2 2 0 0 0-1.92 1.45L2.24 9A6.48 6.48 0 0 0 2 10.75a3.25 3.25 0 0 0 5.5 2.34 3.24 3.24 0 0 0 4.5 0 3.24 3.24 0 0 0 4.5 0 3.25 3.25 0 0 0 5.5-2.34A6.48 6.48 0 0 0 21.76 9Z"
      style={{
        fill: props.color
      }}
    />
  </svg>
)

export default MarketIcon;