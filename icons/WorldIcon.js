import * as React from "react"

const WorldIcon = (props) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M12 21a9 9 0 1 1 9-9 9 9 0 0 1-9 9Zm4-9c0-5-1.79-9-4-9s-4 4-4 9 1.79 9 4 9 4-4 4-9Zm5 0H3"
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

export default WorldIcon
