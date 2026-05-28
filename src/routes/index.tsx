import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ScanLine,
  UserCircle2,
  CalendarDays,
  LineChart,
  MessageCircle,
  Bell,
  Utensils,
  Map,
  Building2,
  Stethoscope,
  Users,
  Heart,
  Handshake,
  Accessibility,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ConectaAPAE — Conectando cuidado, família e inclusão" },
      {
        name: "description",
        content:
          "Plataforma que integra APAE, profissionais e famílias: prontuários digitais, agenda multidisciplinar, comunicação segura e relatórios de progresso.",
      },
      { property: "og:title", content: "ConectaAPAE" },
      { property: "og:description", content: "Cuidado, família e inclusão conectados em um só lugar." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: ScanLine, title: "Digitalização", desc: "Centralize e digitalize prontuários físicos." },
  { icon: UserCircle2, title: "Cadastro unificado", desc: "Gerencie perfis de assistidos e famílias." },
  { icon: CalendarDays, title: "Agenda multidisciplinar", desc: "Terapias e consultas em um só calendário." },
  { icon: LineChart, title: "Relatórios de progresso", desc: "Acompanhe a evolução em tempo real." },
  { icon: MessageCircle, title: "Comunicação direta", desc: "Chat seguro entre pais e profissionais." },
  { icon: Bell, title: "Notificações", desc: "Avisos importantes nunca passam batido." },
  { icon: Utensils, title: "Alimentação", desc: "Registro de refeições e rotina diária." },
  { icon: Map, title: "Mapa de profissionais", desc: "Encontre a equipe certa rapidamente." },
];

const flow = [
  { icon: Building2, label: "APAE", desc: "Cadastra e organiza informações." },
  { icon: Stethoscope, label: "Profissionais", desc: "Registram atendimentos e observações." },
  { icon: Users, label: "Família", desc: "Acompanha rotina e progresso." },
  { icon: Heart, label: "Assistido", desc: "Mais cuidado e autonomia." },
];

const benefits = [
  { icon: Handshake, title: "Centraliza informações" },
  { icon: MessageCircle, title: "Melhora a comunicação" },
  { icon: Accessibility, title: "Acessível e fácil de usar" },
  { icon: Sparkles, title: "Promove inclusão e autonomia" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 [color:var(--brand-yellow)]" />
              Nossa solução para APAE
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Conectando <span className="[color:var(--brand-navy)]">cuidado</span>,{" "}
              <span className="[color:var(--brand-yellow)]">família</span> e inclusão.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Uma plataforma integrada que facilita a comunicação entre APAE, profissionais e famílias,
              centralizando informações sobre a rotina e o progresso dos assistidos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/login">
                  Entrar na plataforma <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#funcionalidades">Ver funcionalidades</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full [background:var(--brand-navy)]" /> Alto contraste</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full [background:var(--brand-yellow)]" /> Fonte grande</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> Navegação fácil</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_60%_40%,color-mix(in_oklab,var(--brand-yellow)_30%,transparent),transparent_60%)]" />
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="funcionalidades" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Principais funcionalidades</h2>
          <p className="mt-3 text-muted-foreground">
            Tudo o que a APAE, profissionais e famílias precisam — em um só lugar.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl [background:var(--brand-yellow-soft)]">
                <f.icon className="h-6 w-6 [color:var(--brand-navy)]" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="[background:var(--brand-blue-soft)] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Como funciona?</h2>
            <p className="mt-3 text-muted-foreground">
              Um fluxo simples que conecta todos os envolvidos no cuidado.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {flow.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="flex h-full flex-col items-center rounded-2xl bg-card p-6 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full [background:var(--gradient-brand)] text-primary-foreground">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-semibold">{s.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                {i < flow.length - 1 && (
                  <ArrowRight className="absolute right-[-14px] top-1/2 hidden h-6 w-6 -translate-y-1/2 [color:var(--brand-navy)] md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Por que o ConectaAPAE faz diferença?
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full [background:var(--brand-yellow)]">
                <b.icon className="h-7 w-7 [color:var(--brand-navy)]" />
              </div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div
          className="overflow-hidden rounded-3xl px-8 py-14 text-center text-primary-foreground md:px-16"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Pronto para começar?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Acesse como família/assistido ou como profissional e experimente o ConectaAPAE.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/login">Criar conta</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <BrandLogo size={32} />
            <span>© {new Date().getFullYear()}</span>
          </div>
          <span>Feito com cuidado para promover inclusão.</span>
        </div>
      </footer>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative w-[300px] rounded-[2.5rem] border-[10px] border-foreground/90 bg-card p-4"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-3 flex items-center">
        <BrandLogo size={28} />
      </div>
      <div className="text-lg font-semibold">Olá, Ana! 👋</div>
      <div className="text-xs text-muted-foreground">Bem-vinda de volta!</div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl [background:var(--brand-navy)] p-3 text-primary-foreground">
          <div className="text-[10px] opacity-80">Meus assistidos</div>
          <div className="text-xl font-bold">12</div>
        </div>
        <div className="rounded-xl [background:var(--brand-yellow)] p-3 [color:var(--brand-navy)]">
          <div className="text-[10px] opacity-80">Atividades hoje</div>
          <div className="text-xl font-bold">5</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="text-[10px] text-muted-foreground">Comunicados</div>
          <div className="text-xl font-bold">3</div>
        </div>
        <div className="rounded-xl border border-border p-3">
          <div className="text-[10px] text-muted-foreground">Próximos</div>
          <div className="text-xl font-bold">4</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border p-3">
        <div className="text-xs font-semibold">Resumo do dia</div>
        <div className="mt-2 flex justify-between text-xs">
          <span className="text-muted-foreground">Frequência</span>
          <span className="font-semibold">92%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[92%] [background:var(--brand-navy)]" />
        </div>
        <div className="mt-3 flex justify-between text-xs">
          <span className="text-muted-foreground">Atividades</span>
          <span className="font-semibold">4/5</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[80%] [background:var(--brand-yellow)]" />
        </div>
      </div>
    </div>
  );
}
