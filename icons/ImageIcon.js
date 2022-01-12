import * as React from "react"

const ImageIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
      d="M13.92 8.29h-.1M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4.71 6L3 15.73V19a1 1 0 0 0 1 1h4.29l5.2-5.2Zm7.58 2-8 8H20a1 1 0 0 0 1-1v-2.29Z"
    />
  </svg>
)

export default ImageIcon
