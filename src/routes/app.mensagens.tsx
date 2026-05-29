import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Bell, CalendarDays, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/use-role";

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

type Tipo = "avisos" | "rotinas" | "eventos";
type Post = { id: string; tipo: Tipo; autor: string; papel: string; tempo: string; titulo: string; texto: string };

const INITIAL: Post[] = [
  { id: "1", tipo: "rotinas", autor: "Dra. Júlia", papel: "Fonoaudióloga", tempo: "há 15 min", titulo: "Lucas — almoço completo", texto: "Lucas almoçou todo o cardápio do dia (arroz, feijão, frango e salada). Boa aceitação." },
  { id: "2", tipo: "rotinas", autor: "Prof. Ana", papel: "Oficinas", tempo: "há 1 h", titulo: "Oficina de artes concluída", texto: "Grupo B finalizou os trabalhos com tinta. Helena se destacou na criatividade." },
  { id: "3", tipo: "avisos", autor: "Coordenação APAE", papel: "Administração", tempo: "há 3 h", titulo: "Reunião de pais — sexta", texto: "Reunião geral às 18h na sede. Confirme presença com a secretaria." },
  { id: "4", tipo: "eventos", autor: "Equipe APAE", papel: "Evento", tempo: "ontem", titulo: "Festa Junina 2026", texto: "Sábado, 06/06, das 14h às 18h. Quadrilha, comidas típicas e oficinas." },
];

function Mensagens() {
  const { isProfissional } = useRole();
  const [posts, setPosts] = useState<Post[]>(INITIAL);
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]["id"]>("todos");
  const [open, setOpen] = useState(false);
  const lista = posts.filter((p) => filtro === "todos" || p.tipo === filtro);

  function addPost(p: Omit<Post, "id" | "tempo">) {
    setPosts((prev) => [{ ...p, id: crypto.randomUUID(), tempo: "agora" }, ...prev]);
    toast.success("Comunicado publicado");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Comunicados</h1>
          <p className="text-muted-foreground">Feed em tempo real entre APAE, profissionais e famílias.</p>
        </div>
        {isProfissional && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Plus className="mr-2 h-4 w-4" /> Novo registro
              </Button>
            </DialogTrigger>
            <NovoRegistroDialog onSubmit={(p) => { addPost(p); setOpen(false); }} />
          </Dialog>
        )}
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
        {lista.map((p) => (
          <li key={p.id} className="rounded-3xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: "var(--brand-yellow-soft)", color: "var(--brand-navy)" }}>
                <Bell className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold">{p.autor}</span>
                  <span className="text-xs text-muted-foreground">{p.papel} • {p.tempo}</span>
                </div>
                <h3 className="mt-1 text-lg font-bold">{p.titulo}</h3>
                <p className="mt-1 text-muted-foreground">{p.texto}</p>
                <span className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase" style={{ background: "var(--brand-yellow)", color: "var(--brand-navy)" }}>
                  {p.tipo}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NovoRegistroDialog({ onSubmit }: { onSubmit: (p: { tipo: Tipo; autor: string; papel: string; titulo: string; texto: string }) => void }) {
  const [tipo, setTipo] = useState<Tipo>("rotinas");
  const [autor, setAutor] = useState("");
  const [papel, setPapel] = useState("");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!autor.trim() || !titulo.trim() || !texto.trim()) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    onSubmit({ tipo, autor: autor.trim(), papel: papel.trim() || "Profissional", titulo: titulo.trim(), texto: texto.trim() });
    setAutor(""); setPapel(""); setTitulo(""); setTexto("");
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo registro</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Tipo</Label>
          <Select value={tipo} onValueChange={(v) => setTipo(v as Tipo)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="avisos">Aviso</SelectItem>
              <SelectItem value="rotinas">Rotina</SelectItem>
              <SelectItem value="eventos">Evento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="autor">Autor</Label>
            <Input id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Seu nome" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="papel">Função</Label>
            <Input id="papel" value={papel} onChange={(e) => setPapel(e.target.value)} placeholder="Ex: Psicóloga" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Resumo curto" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="texto">Mensagem</Label>
          <Textarea id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} rows={4} placeholder="Descreva o registro..." />
        </div>
        <DialogFooter>
          <Button type="submit" className="rounded-full">Publicar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
