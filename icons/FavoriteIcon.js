import * as React from "react"

const FavoriteIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="m21 17.89-3.79 3.81a1 1 0 0 1-1.42 0L12 17.89a3.45 3.45 0 0 1 4.5-5.2 3.45 3.45 0 0 1 4.5 5.2ZM20 5h-7.17l-2.42-2.41A2 2 0 0 0 9 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.31a5.45 5.45 0 0 1 6.19-8.58 5.46 5.46 0 0 1 2.05-.4 5.6 5.6 0 0 1 3.45 1.2V7a2 2 0 0 0-2-2Z"
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default FavoriteIcon
