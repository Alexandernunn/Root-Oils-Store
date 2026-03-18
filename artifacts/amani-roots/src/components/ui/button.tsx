import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-xs uppercase tracking-[0.15em] font-body font-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#1A1714] text-white rounded-none hover:opacity-80": variant === "default",
            "border border-text text-text hover:bg-bg-alt rounded-none": variant === "outline",
            "hover:bg-bg-alt text-text rounded-none": variant === "ghost",
            "text-text underline-offset-4 hover:underline-offset-8 underline": variant === "link",
            "px-[32px] py-[12px]": size === "default" && variant !== "link",
            "px-[24px] py-[8px]": size === "sm" && variant !== "link",
            "px-[40px] py-[16px] text-sm": size === "lg" && variant !== "link",
            "p-0 h-auto": variant === "link",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
