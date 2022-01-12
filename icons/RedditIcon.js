import * as React from "react"

const RedditIcon = (props) => (
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
      d="m12 9 2-6 4 1"
    />
    <path
      data-name="primary"
      d="M21 11a3 3 0 0 0-5.56-1.54 13.09 13.09 0 0 0-6.88 0A3 3 0 0 0 3 11a2.92 2.92 0 0 0 .63 1.81A4.31 4.31 0 0 0 3 15c0 3.31 4 6 9 6s9-2.69 9-6a4.31 4.31 0 0 0-.63-2.19A2.92 2.92 0 0 0 21 11Z"
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
      d="M17.95 4h.1"
    />
    <path
      data-name="primary-upstroke"
      style={{
        fill: "none",
        stroke: props.color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
      d="M15.45 14h.1M8.45 14h.1"
    />
  </svg>
)

export default RedditIcon
