import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Bell, CalendarDays, Utensils, Sparkles, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/mensagens")({
  head: () => ({ meta: [{ title: "Comunicados — ConectaAPAE" }] }),
  component: Mensagens,
});

const FILTROS = [
  { id: "todos", label: "Todos", icon: MessageCircle },
  { id: "avisos", label: "Avisos", icon: Bell },
  { id: "rotinas", label: "Rotinas", icon: CalendarDays },
  { id: "eventos", label: "Eventos", icon: Sparkles },
] as const;

type Post = {
  id: string;
  tipo: "avisos" | "rotinas" | "eventos";
  autor: string;
  papel: string;
  tempo: string;
  titulo: string;
  texto: string;
  icone: typeof Bell;
};

const POSTS: Post[] = [
  {
    id: "1",
    tipo: "rotinas",
    autor: "Dra. Júlia",
    papel: "Fonoaudióloga",
    tempo: "há 15 min",
    titulo: "Lucas — almoço completo",
    texto: "Lucas almoçou todo o cardápio do dia (arroz, feijão, frango e salada). Boa aceitação.",
    icone: Utensils,
  },
  {
    id: "2",
    tipo: "rotinas",
    autor: "Prof. Ana",
    papel: "Oficinas",
    tempo: "há 1 h",
    titulo: "Oficina de artes concluída",
    texto: "Grupo B finalizou os trabalhos com tinta. Helena se destacou na criatividade.",
    icone: Sparkles,
  },
  {
    id: "3",
    tipo: "avisos",
    autor: "Coordenação APAE",
    papel: "Administração",
    tempo: "há 3 h",
    titulo: "Reunião de pais — sexta",
    texto: "Reunião geral às 18h na sede. Confirme presença com a secretaria.",
    icone: Bell,
  },
  {
    id: "4",
    tipo: "eventos",
    autor: "Equipe APAE",
    papel: "Evento",
    tempo: "ontem",
    titulo: "Festa Junina 2026",
    texto: "Sábado, 06/06, das 14h às 18h. Quadrilha, comidas típicas e oficinas para as famílias.",
    icone: Sparkles,
  },
  {
    id: "5",
    tipo: "rotinas",
    autor: "Dra. Marina",
    papel: "Psicologia",
    tempo: "ontem",
    titulo: "Bruno — evolução semanal",
    texto: "Demonstrou maior tolerância à frustração nas atividades em grupo.",
    icone: Heart,
  },
];

function Mensagens() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]["id"]>("todos");
  const lista = POSTS.filter((p) => filtro === "todos" || p.tipo === filtro);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Comunicados</h1>
          <p className="text-muted-foreground">Feed em tempo real entre APAE, profissionais e famílias.</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Novo registro
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTROS.map((f) => {
          const Icon = f.icon;
          const active = filtro === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "border-transparent bg-[color:var(--brand-navy)] text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" /> {f.label}
            </button>
          );
        })}
      </div>

      <ul className="space-y-4">
        {lista.map((p) => {
          const Icon = p.icone;
          return (
            <li
              key={p.id}
              className="rounded-3xl border border-border bg-card p-5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                  style={{ background: "var(--brand-yellow-soft)", color: "var(--brand-navy)" }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold">{p.autor}</span>
                    <span className="text-xs text-muted-foreground">{p.papel} • {p.tempo}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold">{p.titulo}</h3>
                  <p className="mt-1 text-muted-foreground">{p.texto}</p>
                  <span
                    className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase"
                    style={{ background: "var(--brand-yellow)", color: "var(--brand-navy)" }}
                  >
                    {p.tipo}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
