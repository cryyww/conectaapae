import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ASSISTIDOS } from "@/data/assistidos";

export const Route = createFileRoute("/app/assistidos/")({
  head: () => ({ meta: [{ title: "Assistidos — ConectaAPAE" }] }),
  component: AssistidosList,
});

function AssistidosList() {
  const [q, setQ] = useState("");
  const filtered = ASSISTIDOS.filter((a) =>
    a.nome.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assistidos</h1>
          <p className="text-muted-foreground">Prontuários digitais e perfis individuais.</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" /> Novo assistido
        </Button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome..."
          className="h-12 rounded-2xl pl-11 text-base"
        />
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {filtered.map((a) => (
          <li key={a.id}>
            <Link
              to="/app/assistidos/$id"
              params={{ id: a.id }}
              className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 transition hover:border-[color:var(--brand-navy)]"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-bold"
                style={{ background: "var(--brand-yellow-soft)", color: "var(--brand-navy)" }}
              >
                {a.nome.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{a.nome}</div>
                <div className="text-sm text-muted-foreground">
                  {a.idade} anos • {a.responsavel}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground sm:col-span-2">
            Nenhum assistido encontrado.
          </li>
        )}
      </ul>
    </div>
  );
}
