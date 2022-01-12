import * as React from "react"

const SunIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M16 12a4 4 0 1 1-4-4 4 4 0 0 1 4 4Zm-4-9v1M5.64 5.64l.7.7M3 12h1m1.64 6.36.7-.7M12 21v-1m6.36-1.64-.7-.7M21 12h-1m-1.64-6.36-.7.7"
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

export default SunIcon
