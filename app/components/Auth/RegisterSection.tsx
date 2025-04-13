"use client"

import { type RegisterFormData, registerSchema } from "@/app/validations/authSchemas"
import { FormInput } from "@/app/components/Forms/FormInput"
import { FormPasswordInput } from "@/app/components/Forms/FormPasswordInput"
import { Button } from "@/app/components/ui/button"
import { DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useRegister } from "@/app/hooks/useAuthorization"
import { IRegisterRequest } from "@/app/types/IAuthorization"

interface RegisterSectionProps {
	onRegisterSuccess: () => void;
}

export default function RegisterSection({ onRegisterSuccess }: RegisterSectionProps) {
	const registerMutation = useRegister();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<RegisterFormData>({
		resolver: yupResolver(registerSchema),
		mode: "onChange"
  })

  const onSignupSubmit = async (data: RegisterFormData) => {
		console.log("Signup data:", data);

		const requestData: IRegisterRequest = {
			email: data.email,
			username: data.login,
			password: data.password,
		};

		registerMutation.mutate(requestData, {
			onSuccess: () => {
				onRegisterSuccess();
			},
		})
  }

  return (
    <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
      <DialogHeader className="text-left pb-4">
        <DialogTitle className="text-xl">Регистрация</DialogTitle>
      </DialogHeader>

      <div className="grid gap-5 py-2 max-h-[350px] overflow-y-auto pr-2">
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={registerSignup}
          errors={signupErrors}
					placeholder="Введите email"
					disabled={registerMutation.isPending}
        />

        <FormInput
          label="Логин"
          name="login"
          register={registerSignup}
          errors={signupErrors}
					placeholder="Введите логин"
					disabled={registerMutation.isPending}
        />

        <FormPasswordInput
          label="Пароль"
          name="password"
          register={registerSignup}
          errors={signupErrors}
					placeholder="Введите пароль"
					disabled={registerMutation.isPending}
        />

        <FormPasswordInput
          label="Подтвердите пароль"
          name="confirmPassword"
          register={registerSignup}
          errors={signupErrors}
					placeholder="Повторите пароль"
					disabled={registerMutation.isPending}
        />
      </div>

      <DialogFooter className="mt-6">
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition-colors" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Регистрация...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

