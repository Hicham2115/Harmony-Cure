import { toast as sonnerToast } from "sonner";
import { CheckCircle2, Leaf, XCircle } from "lucide-react";

function BrandToast({
  title,
  description,
  variant,
}: {
  title: string;
  description?: string;
  variant: "success" | "error";
}) {
  const accent = variant === "success" ? "#0e3927" : "#8a2f1f";
  const Icon = variant === "success" ? CheckCircle2 : XCircle;

  return (
    <div className="relative flex w-full items-start gap-3 overflow-hidden rounded-xl border border-[#a77d38]/20 bg-white p-4 shadow-[0_12px_30px_-8px_rgba(23,23,21,0.25)]">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: accent }}
      />
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${accent}1a`, color: accent }}
      >
        <Icon className="size-5" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
        <p className="font-roboto text-sm font-semibold text-[#171715]">
          {title}
        </p>
        {description ? (
          <p className="font-inter text-xs text-[#8a8478]">{description}</p>
        ) : null}
      </div>
      <Leaf
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 size-10 rotate-12 text-[#a77d38]/10"
        strokeWidth={1}
      />
    </div>
  );
}

export const brandToast = {
  success: (title: string, description?: string) =>
    sonnerToast.custom(() => (
      <BrandToast description={description} title={title} variant="success" />
    ), { duration: 5000 }),
  error: (title: string, description?: string) =>
    sonnerToast.custom(() => (
      <BrandToast description={description} title={title} variant="error" />
    ), { duration: 5000 }),
};
