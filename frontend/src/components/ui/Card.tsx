import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

export function Card({ className, padding = "md", children, ...props }: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-sm",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-bold text-gray-800", className)} {...props}>
      {children}
    </h2>
  );
}
