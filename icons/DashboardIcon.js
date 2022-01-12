import * as React from "react"

const DashboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <rect
      x={2}
      y={2}
      width={9}
      height={11}
      rx={2}
      style={{
        fill: props.color,
      }}
    />
    <rect
      x={13}
      y={2}
      width={9}
      height={7}
      rx={2}
      style={{
        fill: props.color,
      }}
    />
    <rect
      x={2}
      y={15}
      width={9}
      height={7}
      rx={2}
      style={{
        fill: props.color,
      }}
    />
    <rect
      x={13}
      y={11}
      width={9}
      height={11}
      rx={2}
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default DashboardIcon
