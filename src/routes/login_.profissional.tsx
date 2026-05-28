import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/LoginForm";

export const Route = createFileRoute("/login_/profissional")({
  head: () => ({ meta: [{ title: "Entrar como Profissional — ConectaAPAE" }] }),
  component: () => (
    <LoginForm
      role="profissional"
      title="Acesso Profissional"
      subtitle="Psicóloga, pedagoga, fono, T.O. e equipe APAE."
      accent="navy"
      cadastroPath="/cadastro/profissional"
    />
  ),
});
