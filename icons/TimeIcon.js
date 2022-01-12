import * as React from "react"

const TimeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm2.55 13.83A.94.94 0 0 1 14 16a1 1 0 0 1-.83-.45l-2-3A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0v4.7l1.83 2.75a1 1 0 0 1-.28 1.38Z"
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default TimeIcon
