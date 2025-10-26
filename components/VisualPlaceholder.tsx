import { cn } from "@/lib/utils"

interface VisualPlaceholderProps {
  text: string
  className?: string
  shape?: "rectangle" | "circle" | "square"
  aspectRatio?: string
}

export function VisualPlaceholder({ text, className, shape = "rectangle", aspectRatio }: VisualPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-slate-200 border-2 border-dashed border-slate-400 flex items-center justify-center text-slate-600 text-center p-4",
        shape === "circle" && "rounded-full",
        shape === "square" && "rounded-lg aspect-square",
        shape === "rectangle" && "rounded-lg",
        className,
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
