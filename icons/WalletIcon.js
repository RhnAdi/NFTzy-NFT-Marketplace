import * as React from "react"

const WalletIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="icon glyph"
    width={32}
    height={32}
    {...props}
  >
    <path
      d="M22 13v2a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2Zm-2 5a2.85 2.85 0 0 0 1-.18V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.79l7.93-3.53a2 2 0 0 1 2.6.94L17.62 6H19a2 2 0 0 1 2 2v2.18a2.85 2.85 0 0 0-1-.18h-3a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3ZM10.71 6h4.67l-.85-1.7Z"
      style={{
        fill: props.color,
      }}
    />
  </svg>
)

export default WalletIcon
