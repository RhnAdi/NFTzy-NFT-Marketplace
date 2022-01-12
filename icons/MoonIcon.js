import * as React from "react"

const MoonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M6 20.29a8.26 8.26 0 0 0 3.36.71A8.83 8.83 0 0 0 18 12a8.83 8.83 0 0 0-8.64-9A8.26 8.26 0 0 0 6 3.71 9 9 0 0 1 11.28 12 9 9 0 0 1 6 20.29Z"
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
)

export default MoonIcon
