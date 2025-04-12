import { cn } from "../../lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type Variant =
  | "default"
  | "outline"
  | "action"
  | "secondary"
  | "ghost"
  | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const buttonVariants: Record<Variant, string> = {
  default: "bg-teal-600 hover:bg-teal-700 text-white",
  outline: "border border-white text-white hover:bg-white hover:text-teal-800",
  secondary: "border border-orange-600 text-white hover:bg-teal-800",
  action: "border border-grey-600 text-white bg-yellow-800 hover:bg-yellow-800",
  ghost: "bg-transparent text-white hover:bg-white/10",
  link: "bg-transparent text-white underline hover:text-yellow-400",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300",
          buttonVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
