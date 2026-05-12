import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({ children, className, hoverable = true }: CardProps) {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6",
        hoverable && "glass-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
