import * as React from "react"

const NotificationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon line"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M19.38 14.38a2.12 2.12 0 0 1 .62 1.5h0A2.12 2.12 0 0 1 17.88 18H6.12A2.12 2.12 0 0 1 4 15.88h0a2.12 2.12 0 0 1 .62-1.5L6 13V9a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v4ZM15 18H9a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3Z"
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

export default NotificationIcon
