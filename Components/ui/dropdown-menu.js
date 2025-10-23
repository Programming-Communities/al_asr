// Components/ui/dropdown-menu.js
"use client"

import * as React from "react"

const DropdownMenuContext = React.createContext(null)

const DropdownMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef(({ asChild = false, children, ...props }, ref) => {
  const { setOpen } = React.useContext(DropdownMenuContext)
  
  const handleClick = () => {
    setOpen(prev => !prev)
  }

  if (asChild) {
    return React.cloneElement(React.Children.only(children), {
      onClick: handleClick,
      ref,
      ...props
    })
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, align = "start", ...props }, ref) => {
  const { open } = React.useContext(DropdownMenuContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={`
        absolute z-50 min-w-32 overflow-hidden rounded-md border bg-white p-1 shadow-md
        ${align === "end" ? "right-0" : "left-0"}
        ${className || ""}
      `}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
      transition-colors focus:bg-gray-100 w-full text-left
      ${className || ""}
    `}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }