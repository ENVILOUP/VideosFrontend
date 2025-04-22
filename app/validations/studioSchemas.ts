import * as yup from "yup";

export const uploadSchema = yup.object({
  title: yup
    .string()
    .required("Введите название ролика")
    .min(4, "Название должно содержать минимум 4 символа")
    .max(200, "Название слишком длинное — максимум 200 символов"),

  description: yup
    .string()
    .required("Добавьте описание ролика")
    .min(4, "Описание должно содержать хотя бы 4 символа")
    .max(2000, "Описание слишком длинное — максимум 2000 символов"),

  video: yup
    .mixed()
    .required("Загрузите видеофайл")
    .transform((value) => (value instanceof FileList ? value[0] : value))
    .test(
      "fileType",
      "Поддерживаeтся только формат mp4",
      (value) =>
        value instanceof File &&
        ["video/mp4"].includes(value.type)
    )
    .test(
      "fileSize",
      "Максимальный размер видео — 500 МБ",
      (value) => value instanceof File && value.size <= 500 * 1024 * 1024
    ),

  poster: yup
    .mixed()
    .required("Загрузите изображение-постер")
    .transform((value) => (value instanceof FileList ? value[0] : value))
    .test(
      "fileType",
      "Формат изображения должен быть jpeg, png или webp",
      (value) =>
        value instanceof File &&
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          value.type
        )
    )
    .test(
      "fileSize",
      "Максимальный размер изображения — 10 МБ",
      (value) => value instanceof File && value.size <= 10 * 1024 * 1024
    ),
});

export type UploadFormData = yup.InferType<typeof uploadSchema>;