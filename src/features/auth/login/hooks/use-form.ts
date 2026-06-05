import { revalidateLogic, useForm } from "@tanstack/react-form-nextjs";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
export function useLoginForm() {
  return useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: z.object({
        email: z.email(),
        password: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email({
        email: value.email,
        password: value.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Vous êtes connecté avec succès");
            redirect("/");
          },
          onError: ({ error }) => {
            toast.error(error.message);
          },
        },
      });
    },
  });
}
