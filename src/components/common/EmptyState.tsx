import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="border border-dashed rounded-xl p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-muted grid place-items-center mb-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="text-sm font-medium">{title}</div>
      {description ? (
        <div className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">{description}</div>
      ) : null}
    </div>
  );
}