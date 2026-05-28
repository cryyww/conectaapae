import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/SignupForm";

export const Route = createFileRoute("/cadastro_/familia")({
  head: () => ({ meta: [{ title: "Criar conta Família — ConectaAPAE" }] }),
  component: () => (
    <SignupForm
      role="assistido"
      title="Criar conta — Família"
      subtitle="Cadastre-se para acompanhar o seu familiar assistido."
      accent="yellow"
      loginPath="/login/familia"
    />
  ),
});
