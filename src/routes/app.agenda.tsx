import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/agenda")({
  head: () => ({ meta: [{ title: "Agenda — ConectaAPAE" }] }),
  component: Agenda,
});

const FILTROS = ["Todos", "Assistidos", "Profissionais"] as const;

const SCHEDULE_BY_DAY: Record<number, { time: string; title: string; assistido: string; prof: string; tipo: "fono" | "to" | "psi" | "fis" }[]> = {
  0: [
    { time: "08:30", title: "Fonoaudiologia", assistido: "Lucas Martins", prof: "Dra. Júlia", tipo: "fono" },
    { time: "09:30", title: "Terapia Ocupacional", assistido: "Helena Ribeiro", prof: "Dr. Pedro", tipo: "to" },
    { time: "10:30", title: "Psicologia", assistido: "Bruno Teixeira", prof: "Dra. Marina", tipo: "psi" },
    { time: "13:30", title: "Atividade Física", assistido: "Grupo A", prof: "Prof. Carlos", tipo: "fis" },
    { time: "15:00", title: "Fisioterapia", assistido: "Sofia Lima", prof: "Dra. Ana", tipo: "fis" },
  ],
  1: [
    { time: "09:00", title: "Psicologia", assistido: "Lucas Martins", prof: "Dra. Marina", tipo: "psi" },
    { time: "11:00", title: "Reforço escolar", assistido: "Helena Ribeiro", prof: "Profa. Beatriz", tipo: "to" },
  ],
  2: [{ time: "10:00", title: "Oficina de artes", assistido: "Grupo B", prof: "Prof. Ana", tipo: "to" }],
  3: [{ time: "14:00", title: "Marcenaria", assistido: "Bruno Teixeira", prof: "Prof. Rafael", tipo: "to" }],
  4: [{ time: "08:00", title: "Fisioterapia", assistido: "Sofia Lima", prof: "Dra. Ana", tipo: "fis" }],
  5: [],
  6: [],
};

const TIPO_COR: Record<string, string> = {
  fono: "var(--brand-navy)",
  to: "var(--brand-yellow)",
  psi: "var(--brand-navy)",
  fis: "var(--brand-yellow)",
};

function Agenda() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");
  const today = new Date();
  const [selected, setSelected] = useState(today.getDay());
  const [monthOffset, setMonthOffset] = useState(0);

  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthName = base.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const daysInMonth = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  const firstWeekday = base.getDay();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) =>
    i < firstWeekday ? null : i - firstWeekday + 1,
  );

  const items = SCHEDULE_BY_DAY[selected] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Agenda multidisciplinar</h1>
          <p className="text-muted-foreground">Atendimentos, terapias e atividades em um só calendário.</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Nova atividade
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              filtro === f
                ? "border-transparent bg-[color:var(--brand-navy)] text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold capitalize">{monthName}</h2>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => setMonthOffset((v) => v - 1)} aria-label="Mês anterior">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setMonthOffset((v) => v + 1)} aria-label="Próximo mês">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <div key={i} className="py-1">{d}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              const isToday = monthOffset === 0 && d === today.getDate();
              const isSelected = d != null && new Date(base.getFullYear(), base.getMonth(), d).getDay() === selected && monthOffset === 0 && d === today.getDate();
              return (
                <button
                  key={i}
                  disabled={d == null}
                  onClick={() => {
                    if (d != null) setSelected(new Date(base.getFullYear(), base.getMonth(), d).getDay());
                  }}
                  className={cn(
                    "aspect-square rounded-xl text-sm font-semibold transition",
                    d == null && "opacity-0",
                    isSelected
                      ? "bg-[color:var(--brand-navy)] text-primary-foreground"
                      : isToday
                        ? "bg-[color:var(--brand-yellow)] text-[color:var(--brand-navy)]"
                        : "hover:bg-muted",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <h2 className="text-lg font-bold">Cronograma do dia</h2>
          <p className="text-sm text-muted-foreground">{items.length} atendimento(s)</p>
          <ul className="mt-4 space-y-3">
            {items.length === 0 && (
              <li className="rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground">
                Nenhum atendimento neste dia.
              </li>
            )}
            {items.map((s) => (
              <li
                key={s.time + s.title}
                className="flex items-center gap-3 rounded-2xl bg-muted/40 px-3 py-3"
              >
                <div
                  className="grid h-12 w-14 place-items-center rounded-2xl text-sm font-bold text-primary-foreground"
                  style={{ background: TIPO_COR[s.tipo] }}
                >
                  {s.time}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{s.title}</div>
                  <div className="truncate text-sm text-muted-foreground">
                    {filtro === "Profissionais" ? s.prof : s.assistido} •{" "}
                    {filtro === "Profissionais" ? s.assistido : s.prof}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
