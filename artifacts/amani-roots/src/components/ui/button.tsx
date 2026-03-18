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
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-1 disabled:pointer-events-none disabled:opacity-50",
          "hover:-translate-y-[3px]",
          {
            "bg-brand-rose text-white shadow-md shadow-brand-rose/20 hover:shadow-lg hover:shadow-brand-rose/30": variant === "default",
            "border border-brand-accent-1 text-brand-text hover:bg-brand-bg-2 hover:border-brand-accent-1/80": variant === "outline",
            "hover:bg-brand-bg-2 text-brand-text": variant === "ghost",
            "text-brand-text underline-offset-4 hover:underline": variant === "link",
            "h-10 px-8 py-2": size === "default",
            "h-9 px-6 text-xs": size === "sm",
            "h-12 px-10 text-base": size === "lg",
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
