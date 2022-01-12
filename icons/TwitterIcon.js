import * as React from "react"

const TwitterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M18.94 7.91a3.49 3.49 0 0 0-6.94.26C8.46 9.63 5 6 5 6c-1 6 2 8.75 2 8.75C5.64 16 3 16 3 16s1.58 3 8.58 3S19 11 19 11a3.08 3.08 0 0 0 2-3.3 7.9 7.9 0 0 1-2.06.21Z"
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

export default TwitterIcon
