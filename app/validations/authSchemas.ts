import * as yup from "yup";

export const loginSchema = yup.object({
  login: yup
    .string()
    .required("Пожалуйста, введите логин")
    .min(4, "Логин должен содержать хотя бы 4 символа")
    .max(32, "Слишком длинный логин — максимум 32 символа"),
  password: yup
    .string()
    .required("Введите пароль, чтобы продолжить")
    .min(12, "Пароль должен быть не короче 12 символов")
    .max(64, "Пароль может быть не длиннее 64 символов"),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Похоже, здесь ошибка. Проверьте формат email")
    .required("Email нужен для регистрации"),
  login: yup
    .string()
    .required("Придумайте логин для входа")
    .min(4, "Логин должен содержать хотя бы 4 символа")
    .max(32, "Слишком длинный логин — максимум 32 символа"),
  password: yup
    .string()
    .min(12, "Пароль должен быть длиной от 12 символов")
    .max(64, "Максимальная длина пароля — 64 символа")
    .required("Введите пароль, чтобы создать аккаунт"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают. Попробуйте ещё раз")
    .required("Пожалуйста, подтвердите пароль"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
