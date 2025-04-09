"use client"

import { type LoginFormData, loginSchema } from "@/app/validations/authSchemas"
import { FormInput } from "@/app/components/Forms/FormInput"
import { FormPasswordInput } from "@/app/components/Forms/FormPasswordInput"
import { Button } from "@/app/components/ui/button"
import { DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/app/components/ui/dialog"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useLogin } from "@/app/hooks/useAuthorization"
import { ILoginRequest } from "@/app/types/IAuthorization"
import { useRef } from "react"

export default function LoginSection() {
	const loginMutation = useLogin();

	const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		mode: "onChange"
  })

  const onLoginSubmit = async (data: LoginFormData) => {
		const requestData: ILoginRequest = {
			username: data.login,
			password: data.password
		};

		loginMutation.mutate(requestData, {
			onSuccess: () => {
				dialogCloseRef.current?.click();
			},
		})
  }

  return (
    <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
      <DialogHeader className="text-left pb-4">
        <DialogTitle className="text-xl">Войти в аккаунт</DialogTitle>
			</DialogHeader>
			
      <div className="grid gap-5 py-2 max-h-[350px] overflow-y-auto pr-2">
        <FormInput
          label="Логин"
          name="login"
          register={registerLogin}
          errors={loginErrors}
					placeholder="Введите логин"
					disabled={loginMutation.isPending}
        />

        <FormPasswordInput
          label="Пароль"
          name="password"
          register={registerLogin}
          errors={loginErrors}
					placeholder="Введите пароль"
					disabled={loginMutation.isPending}
        />
      </div>

			<DialogFooter className="mt-6">
				<DialogClose ref={dialogCloseRef} />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition-colors" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Вход...
            </>
          ) : (
            "Войти"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

