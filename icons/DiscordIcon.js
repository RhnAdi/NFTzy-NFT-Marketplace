import * as React from "react"

const DiscordIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M9 15.77 8 19a7.25 7.25 0 0 1-5-2.33A30 30 0 0 1 4.83 6.6a1 1 0 0 1 .6-.6A23.65 23.65 0 0 1 12 5a23.65 23.65 0 0 1 6.57 1 1 1 0 0 1 .6.59A30 30 0 0 1 21 16.67 7.25 7.25 0 0 1 16 19l-1-3.23"
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
      d="M7 15a13.38 13.38 0 0 0 5 1 13.38 13.38 0 0 0 5-1"
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
      d="M14.95 10h.1"
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
      d="M9.05 10h-.1"
    />
  </svg>
)

export default DiscordIcon
