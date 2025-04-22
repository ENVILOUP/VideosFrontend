import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/app/lib/utils";
import { Textarea } from "@/app/components/ui/textarea";

interface FormTextareaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  disabled?: boolean;
}

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder,
  disabled = false,
}: FormTextareaProps<T>) {
  return (
    <div className="space-y-1 px-1">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          "transition-colors focus-visible:ring-blue-500",
          errors[name] ? "border-red-500 focus-visible:ring-red-500" : "",
        )}
        disabled={disabled}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  );
}