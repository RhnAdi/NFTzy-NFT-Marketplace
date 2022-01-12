import * as React from "react"

const BallIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M8.8 3.59c2.86 2.94 6.3 7.85 8.05 16"
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
      d="M3.24 9.91a18.3 18.3 0 0 0 7.2-.48 18.21 18.21 0 0 0 2.16-.71 16.85 16.85 0 0 0 5.46-3.37M21 12.8a13.07 13.07 0 0 0-10.14 1.31 14.32 14.32 0 0 0-5 4.45"
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <circle
      data-name="primary"
      cx={12}
      cy={12}
      r={9}
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

export default BallIcon
