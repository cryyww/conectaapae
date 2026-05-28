import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/LoginForm";

export const Route = createFileRoute("/login_/familia")({
  head: () => ({ meta: [{ title: "Entrar como Família — ConectaAPAE" }] }),
  component: () => (
    <LoginForm
      role="assistido"
      title="Acesso Família / Assistido"
      subtitle="Acompanhe a rotina e o progresso do seu familiar."
      accent="yellow"
      cadastroPath="/cadastro/familia"
    />
  ),
});
