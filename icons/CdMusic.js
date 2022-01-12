import * as React from "react"

const CdIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M10 18.94A8 8 0 1 1 18.75 9"
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
      d="M11 9a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm7 10a2 2 0 1 1-2-2 2 2 0 0 1 2 2ZM21 16a2.9 2.9 0 0 0-3-3v6"
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

export default CdIcon
