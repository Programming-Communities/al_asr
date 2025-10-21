// Components/ui/button.js
import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${variant === "default" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
        ${variant === "outline" ? "border border-gray-300 bg-white hover:bg-gray-100 text-gray-900" : ""}
        ${size === "default" ? "h-10 px-4 py-2" : ""}
        ${size === "sm" ? "h-9 rounded-md px-3" : ""}
        ${size === "lg" ? "h-11 rounded-md px-8" : ""}
        ${size === "icon" ? "h-10 w-10" : ""}
        ${className || ""}
      `}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }