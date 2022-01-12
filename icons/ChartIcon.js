import * as React from "react"

const ChartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM9 17a1 1 0 0 1-2 0v-2a1 1 0 0 1 2 0Zm4 0a1 1 0 0 1-2 0v-6a1 1 0 0 1 2 0Zm4 0a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0Z"
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default ChartIcon
