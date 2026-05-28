import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, CalendarCheck2, Bell, ClipboardList, TrendingUp, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Início — ConectaAPAE" }] }),
  component: Inicio,
});

const METRICS = [
  { label: "Assistidos", value: 128, icon: Users, hint: "+4 esta semana" },
  { label: "Atividades de hoje", value: 23, icon: CalendarCheck2, hint: "8 concluídas" },
  { label: "Novos comunicados", value: 6, icon: Bell, hint: "2 não lidos" },
  { label: "Próximos atendimentos", value: 12, icon: ClipboardList, hint: "Hoje e amanhã" },
];

const PROGRESS = [
  { label: "Frequência", value: 86, color: "var(--brand-navy)" },
  { label: "Atividades concluídas", value: 72, color: "var(--brand-yellow)" },
  { label: "Engajamento das famílias", value: 64, color: "var(--brand-navy)" },
];

const SCHEDULE = [
  { time: "08:30", title: "Fonoaudiologia", who: "Lucas M.", prof: "Dra. Júlia" },
  { time: "09:30", title: "Terapia Ocupacional", who: "Helena R.", prof: "Dr. Pedro" },
  { time: "10:30", title: "Psicologia", who: "Bruno T.", prof: "Dra. Marina" },
  { time: "13:30", title: "Atividade Física", who: "Grupo A", prof: "Prof. Carlos" },
];

function Inicio() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-border bg-card p-6 md:p-8" style={{ background: "var(--gradient-hero)" }}>
        <p className="text-sm font-medium text-muted-foreground">Bem-vindo(a) de volta</p>
        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Painel da APAE</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Veja em um só lugar atendimentos, comunicados e a evolução de cada assistido.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map(({ label, value, icon: Icon, hint }) => (
          <div key={label} className="rounded-3xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl [background:var(--brand-yellow-soft)] [color:var(--brand-navy)]">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 text-3xl font-bold">{value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 lg:col-span-2" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Resumo do dia</h2>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Atualizado agora
            </span>
          </div>
          <div className="mt-6 space-y-5">
            {PROGRESS.map((p) => (
              <div key={p.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-medium">
                  <span>{p.label}</span>
                  <span className="text-muted-foreground">{p.value}%</span>
                </div>
                <Progress value={p.value} className="h-3" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Próximos atendimentos</h2>
            <Link to="/app/agenda" className="inline-flex items-center text-sm font-semibold [color:var(--brand-navy)]">
              Ver agenda <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {SCHEDULE.map((s) => (
              <li key={s.time} className="flex items-center gap-3 rounded-2xl bg-muted/40 px-3 py-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl [background:var(--brand-navy)] text-sm font-bold text-primary-foreground">
                  {s.time}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{s.title}</div>
                  <div className="truncate text-sm text-muted-foreground">{s.who} • {s.prof}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
