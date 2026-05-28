import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Folder, FileText, User, Activity, LineChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getAssistido } from "@/data/assistidos";

export const Route = createFileRoute("/app/assistidos/$id")({
  head: () => ({ meta: [{ title: "Perfil do assistido — ConectaAPAE" }] }),
  component: AssistidoDetail,
});

function AssistidoDetail() {
  const { id } = useParams({ from: "/app/assistidos/$id" });
  const a = getAssistido(id);

  if (!a) {
    return (
      <div className="space-y-4">
        <Link to="/app/assistidos" className="inline-flex items-center text-sm text-muted-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Voltar
        </Link>
        <div className="rounded-3xl border border-border bg-card p-8 text-center">Assistido não encontrado.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/app/assistidos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 h-4 w-4" /> Voltar para assistidos
      </Link>

      <header className="flex flex-wrap items-center gap-4 rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div
          className="grid h-20 w-20 place-items-center rounded-3xl text-2xl font-bold"
          style={{ background: "var(--brand-yellow-soft)", color: "var(--brand-navy)" }}
        >
          {a.nome.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold md:text-3xl">{a.nome}</h1>
          <p className="text-muted-foreground">
            {a.idade} anos • {a.diagnostico}
          </p>
          <p className="text-sm text-muted-foreground">Responsável: {a.responsavel} ({a.parentesco}) • Entrada {a.entrada}</p>
        </div>
        <Button variant="outline" className="rounded-full">Novo registro</Button>
      </header>

      <Tabs defaultValue="cadastro">
        <TabsList className="h-auto rounded-2xl bg-muted/60 p-1">
          <TabsTrigger value="cadastro" className="gap-2 rounded-xl px-4 py-2"><User className="h-4 w-4" />Dados</TabsTrigger>
          <TabsTrigger value="rotina" className="gap-2 rounded-xl px-4 py-2"><Activity className="h-4 w-4" />Rotina</TabsTrigger>
          <TabsTrigger value="evolucao" className="gap-2 rounded-xl px-4 py-2"><LineChart className="h-4 w-4" />Evolução</TabsTrigger>
          <TabsTrigger value="documentos" className="gap-2 rounded-xl px-4 py-2"><Folder className="h-4 w-4" />Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="cadastro" className="mt-4">
          <div className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2" style={{ boxShadow: "var(--shadow-card)" }}>
            <Field label="Nome completo" value={a.nome} />
            <Field label="Idade" value={`${a.idade} anos`} />
            <Field label="Diagnóstico" value={a.diagnostico} />
            <Field label="Responsável" value={`${a.responsavel} (${a.parentesco})`} />
            <Field label="Data de entrada" value={a.entrada} />
          </div>
        </TabsContent>

        <TabsContent value="rotina" className="mt-4">
          <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="mb-4 text-lg font-bold">Rotina semanal</h2>
            <ul className="space-y-3">
              {a.rotina.map((r) => (
                <li key={r.hora + r.atividade} className="flex items-center gap-3 rounded-2xl bg-muted/40 px-3 py-3">
                  <div className="grid h-12 w-14 place-items-center rounded-2xl [background:var(--brand-navy)] text-sm font-bold text-primary-foreground">
                    {r.hora}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">{r.atividade}</div>
                    <div className="text-sm text-muted-foreground">{r.responsavel}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="evolucao" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {a.indicadores.map((i) => (
              <div key={i.label} className="rounded-3xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{i.label}</span>
                  <span className="text-sm text-muted-foreground">{i.value}%</span>
                </div>
                <Progress value={i.value} className="h-3" />
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="mb-4 text-lg font-bold">Registros de evolução</h2>
            <ol className="space-y-4">
              {a.evolucao.map((e) => (
                <li key={e.data + e.titulo} className="border-l-4 pl-4" style={{ borderColor: "var(--brand-yellow)" }}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{e.data} • {e.autor}</div>
                  <div className="font-semibold">{e.titulo}</div>
                  <p className="text-sm text-muted-foreground">{e.descricao}</p>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="documentos" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {a.documentos.map((d) => (
              <div key={d.pasta} className="rounded-3xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="mb-3 flex items-center gap-2">
                  <Folder className="h-5 w-5 [color:var(--brand-navy)]" />
                  <h3 className="font-bold">{d.pasta}</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {d.arquivos.map((f) => (
                    <li key={f} className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
                      <FileText className="h-4 w-4 text-muted-foreground" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/40 px-4 py-3">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
