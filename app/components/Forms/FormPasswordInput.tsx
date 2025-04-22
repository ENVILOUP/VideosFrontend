"use client"

import { useState } from "react"
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface FormPasswordInputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  placeholder?: string
  disabled?: boolean
}

export function FormPasswordInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  placeholder,
  disabled = false,
}: FormPasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-1 px-1">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            "pr-10 transition-colors focus-visible:ring-blue-500",
            errors[name] ? "border-red-500 focus-visible:ring-red-500" : "",
          )}
          disabled={disabled}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          <span className="sr-only">{showPassword ? "Скрыть пароль" : "Показать пароль"}</span>
        </Button>
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message as string}</p>}
    </div>
  )
}

