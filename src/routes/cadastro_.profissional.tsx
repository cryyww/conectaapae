import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/SignupForm";

export const Route = createFileRoute("/cadastro_/profissional")({
  head: () => ({ meta: [{ title: "Criar conta Profissional — ConectaAPAE" }] }),
  component: () => (
    <SignupForm
      role="profissional"
      title="Criar conta — Profissional"
      subtitle="Cadastre-se com seus dados profissionais da APAE."
      accent="navy"
      loginPath="/login/profissional"
    />
  ),
});
