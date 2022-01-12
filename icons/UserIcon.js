import * as React from "react"

const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M8 3.94a9 9 0 1 1-2.36 14.42A8.86 8.86 0 0 1 3.52 15"
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
      d="M8.54 13A4 4 0 1 0 12 7a3.66 3.66 0 0 0-1 .13"
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
      d="M7 19.5a9 9 0 0 0 9.94 0 5 5 0 0 0-9.94 0ZM3 9h4m-2 2V7"
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

export default UserIcon
