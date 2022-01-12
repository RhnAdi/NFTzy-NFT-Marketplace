import * as React from "react"

const FolderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M20 6h-6.59L11 3.59A2 2 0 0 0 9.59 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default FolderIcon