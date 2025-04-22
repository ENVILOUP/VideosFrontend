import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/app/lib/utils";

interface FormFileInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  accept?: string;
  multiple?: boolean;
	disabled?: boolean;
	checkButton?: React.ReactNode;
}

export function FormFileInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  accept,
  multiple = false,
	disabled = false,
	checkButton
}: FormFileInputProps<T>) {
  return (
    <div className="space-y-1 px-1">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2 w-full">
        <Input
          id={name}
          type="file"
          accept={accept}
          multiple={multiple}
          {...register(name)}
          className={cn(
            "transition-colors focus-visible:ring-blue-500",
            errors[name] ? "border-red-500 focus-visible:ring-red-500" : ""
          )}
          disabled={disabled}
				/>
				{checkButton}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}