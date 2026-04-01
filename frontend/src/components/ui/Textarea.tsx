import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef, useId } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={3}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 resize-none transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400",
            error
              ? "border-red-300 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-gray-300",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
