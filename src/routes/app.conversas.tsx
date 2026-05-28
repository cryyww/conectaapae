import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Send, MessagesSquare, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/conversas")({
  head: () => ({ meta: [{ title: "Conversas — ConectaAPAE" }] }),
  component: Conversas,
});

type Role = "assistido" | "profissional" | "admin";
type Contact = { id: string; nome_completo: string; especialidade: string | null };
type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
};

function Conversas() {
  const [me, setMe] = useState<{ id: string; role: Role } | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Bootstrap: pega usuário + role + contatos
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id).maybeSingle();
      const role = (roleRow?.role as Role) ?? "assistido";
      setMe({ id: session.user.id, role });

      const target: Role = role === "profissional" || role === "admin" ? "assistido" : "profissional";
      const { data, error } = await supabase.rpc("list_contacts", { _role: target });
      if (error) {
        toast.error("Não foi possível carregar contatos");
      } else {
        setContacts((data as Contact[]) ?? []);
      }
      setLoading(false);
    })();
  }, []);

  // Carregar histórico ao abrir conversa
  useEffect(() => {
    if (!me || !activeId) return;
    (async () => {
      const { data } = await supabase
        .from("direct_messages")
        .select("*")
        .or(
          `and(sender_id.eq.${me.id},recipient_id.eq.${activeId}),and(sender_id.eq.${activeId},recipient_id.eq.${me.id})`,
        )
        .order("created_at", { ascending: true })
        .limit(200);
      setMessages((data as Message[]) ?? []);
      // marca recebidas como lidas
      await supabase
        .from("direct_messages")
        .update({ read_at: new Date().toISOString() })
        .eq("recipient_id", me.id)
        .eq("sender_id", activeId)
        .is("read_at", null);
    })();
  }, [me, activeId]);

  // Realtime
  useEffect(() => {
    if (!me) return;
    const channel = supabase
      .channel("direct_messages_" + me.id)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "direct_messages" },
        (payload) => {
          const m = payload.new as Message;
          const inActive =
            activeId &&
            ((m.sender_id === me.id && m.recipient_id === activeId) ||
              (m.sender_id === activeId && m.recipient_id === me.id));
          if (inActive) {
            setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
          } else if (m.recipient_id === me.id) {
            const from = contacts.find((c) => c.id === m.sender_id);
            toast.message(`Nova mensagem de ${from?.nome_completo ?? "alguém"}`);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [me, activeId, contacts]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeId]);

  const active = useMemo(() => contacts.find((c) => c.id === activeId) ?? null, [contacts, activeId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!me || !active || !draft.trim() || sending) return;
    setSending(true);
    const content = draft.trim();
    setDraft("");
    const { data, error } = await supabase
      .from("direct_messages")
      .insert({ sender_id: me.id, recipient_id: active.id, content })
      .select()
      .single();
    if (error) {
      toast.error("Não foi possível enviar");
      setDraft(content);
    } else if (data) {
      setMessages((prev) => (prev.some((x) => x.id === data.id) ? prev : [...prev, data as Message]));
    }
    setSending(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isProfissional = me?.role === "profissional" || me?.role === "admin";

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold">Conversas</h1>
        <p className="text-muted-foreground">
          {isProfissional
            ? "Converse diretamente com as famílias dos assistidos."
            : "Fale diretamente com os profissionais que acompanham a sua família."}
        </p>
      </header>

      <div
        className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[280px_1fr]"
        style={{ boxShadow: "var(--shadow-card)", minHeight: "70vh" }}
      >
        {/* Lista de contatos */}
        <aside
          className={cn(
            "border-border md:border-r",
            activeId ? "hidden md:block" : "block",
          )}
        >
          <div className="border-b border-border px-4 py-3 text-sm font-semibold text-muted-foreground">
            {isProfissional ? "Famílias" : "Profissionais"} ({contacts.length})
          </div>
          {contacts.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Nenhum contato disponível ainda.
            </div>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto">
              {contacts.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => setActiveId(c.id)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted/60",
                        isActive && "bg-[color:var(--brand-yellow-soft)]",
                      )}
                    >
                      <div
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold"
                        style={{ background: "var(--brand-navy)", color: "white" }}
                      >
                        {c.nome_completo.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{c.nome_completo}</div>
                        {c.especialidade && (
                          <div className="truncate text-xs text-muted-foreground">{c.especialidade}</div>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Painel da conversa */}
        <section className={cn("flex flex-col", !activeId && "hidden md:flex")}>
          {!active ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center text-muted-foreground">
              <MessagesSquare className="h-10 w-10" />
              <p>Selecione um contato para começar a conversar.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setActiveId(null)}
                  aria-label="Voltar"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div
                  className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold"
                  style={{ background: "var(--brand-navy)", color: "white" }}
                >
                  {active.nome_completo.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{active.nome_completo}</div>
                  {active.especialidade && (
                    <div className="truncate text-xs text-muted-foreground">{active.especialidade}</div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto bg-muted/30 p-4">
                {messages.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    Sem mensagens ainda. Diga olá!
                  </div>
                )}
                {messages.map((m) => {
                  const mine = m.sender_id === me?.id;
                  return (
                    <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                          mine
                            ? "bg-[color:var(--brand-navy)] text-primary-foreground"
                            : "bg-card text-foreground border border-border",
                        )}
                      >
                        <div className="whitespace-pre-wrap break-words">{m.content}</div>
                        <div
                          className={cn(
                            "mt-1 text-[10px]",
                            mine ? "text-primary-foreground/70" : "text-muted-foreground",
                          )}
                        >
                          {new Date(m.created_at).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-3">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Escreva uma mensagem..."
                  maxLength={4000}
                  className="h-11 rounded-full"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-11 w-11 rounded-full"
                  disabled={!draft.trim() || sending}
                  aria-label="Enviar"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
