import * as React from "react"

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M10 14v-2.1a1 1 0 0 1 .9-1l8.2-.82a1 1 0 0 0 .9-1V6a1 1 0 0 0-1-1h-2"
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      data-name="primary"
      d="M16 7H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1Zm-4 12v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2Z"
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

export default SvgComponent
