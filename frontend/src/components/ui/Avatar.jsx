import * as React from "react"
import { cn } from "../../lib/utils"

const Avatar = React.forwardRef(({ className, src, alt, fallback, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  }

  return (
    <div
      ref={ref}
      className={cn("relative flex shrink-0 overflow-hidden rounded-full font-bold bg-muted", sizeClasses[size], className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-accent text-accent-foreground font-semibold">
          {fallback || "?"}
        </span>
      )}
    </div>
  )
})
Avatar.displayName = "Avatar"

export { Avatar }
