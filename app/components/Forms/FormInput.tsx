import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { cn } from "@/app/lib/utils"

interface FormInputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
	errors: FieldErrors<T>
	type?: string
  placeholder?: string
	disabled?: boolean
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
	placeholder,
	type = "text",
  disabled = false,
}: FormInputProps<T>) {
  return (
    <div className="space-y-2 px-1">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
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
  )
}

