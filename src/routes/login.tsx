import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Stethoscope, ArrowRight, ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — ConectaAPAE" },
      { name: "description", content: "Escolha seu perfil: família/assistido ou profissional." },
    ],
  }),
  component: LoginChoose,
});

function LoginChoose() {
  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="mt-6 flex flex-col items-center text-center">
          <BrandLogo size={56} />
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Como você quer entrar?
          </h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Escolha o perfil que melhor descreve você para acessar o ConectaAPAE.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <RoleCard
            to="/login/familia"
            icon={Users}
            title="Família / Assistido"
            description="Acompanhe a rotina, atendimentos e progresso do assistido em tempo real."
            tone="yellow"
          />
          <RoleCard
            to="/login/profissional"
            icon={Stethoscope}
            title="Profissional"
            description="Psicóloga, pedagoga, fonoaudióloga, T.O. e equipe APAE."
            tone="navy"
          />
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  to,
  icon: Icon,
  title,
  description,
  tone,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tone: "navy" | "yellow";
}) {
  const isNavy = tone === "navy";
  return (
    <Link
      to={to}
      className="group block rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: isNavy ? "var(--gradient-brand)" : "var(--brand-yellow)",
          color: isNavy ? "var(--primary-foreground)" : "var(--brand-navy)",
        }}
      >
        <Icon className="h-8 w-8" />
      </div>
      <h2 className="mt-6 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold [color:var(--brand-navy)]">
        Continuar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
