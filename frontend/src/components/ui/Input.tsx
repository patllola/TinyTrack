import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightText, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-brand-500 ml-1">*</span>}
        </label>
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">{leftIcon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400",
              "disabled:bg-gray-50 disabled:text-gray-500",
              leftIcon && "pl-10",
              rightText && "pr-14",
              error
                ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                : "border-gray-200 hover:border-gray-300",
              className
            )}
            {...props}
          />
          {rightText && (
            <span className="absolute right-3 text-sm text-gray-500 pointer-events-none font-medium">
              {rightText}
            </span>
          )}
        </div>
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
