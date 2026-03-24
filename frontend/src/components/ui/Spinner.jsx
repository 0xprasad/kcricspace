import * as React from "react"
import { cn } from "../../lib/utils"

export function Spinner({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export function StumpsLoader({ className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="flex items-end gap-1 h-12">
        <div className="w-1.5 h-12 bg-primary rounded-t-sm" />
        <div className="w-1.5 h-12 bg-primary rounded-t-sm animate-bounce-subtle" />
        <div className="w-1.5 h-12 bg-primary rounded-t-sm" />
      </div>
      <p className="text-sm text-muted-foreground font-medium animate-pulse">Setting the field...</p>
    </div>
  )
}
