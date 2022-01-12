import * as React from "react"

const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M14 7h4V3h-4a5 5 0 0 0-5 5v3H6v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z"
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

export default FacebookIcon
