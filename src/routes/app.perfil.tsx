import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({ meta: [{ title: "Perfil — ConectaAPAE" }] }),
  component: Perfil,
});

type Profile = {
  nome_completo: string;
  email: string;
  telefone: string | null;
  data_nascimento: string | null;
  cidade: string | null;
  nome_assistido: string | null;
  parentesco: string | null;
  registro_profissional: string | null;
  especialidade: string | null;
};

function Perfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", session.user.id).maybeSingle(),
      ]);
      setProfile(prof as Profile | null);
      setRole(roles?.role ?? null);
      setLoading(false);
    })();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta");
    navigate({ to: "/" });
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meu perfil</h1>

      <div className="rounded-3xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="text-sm text-muted-foreground">Bem-vindo(a)</p>
        <h2 className="mt-1 text-2xl font-bold">{profile?.nome_completo}</h2>
        <span
          className="mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase"
          style={{ background: "var(--brand-yellow)", color: "var(--brand-navy)" }}
        >
          {role === "profissional" ? "Profissional" : role === "admin" ? "Administrador" : "Família / Assistido"}
        </span>

        <dl className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <Field label="E-mail" value={profile?.email} />
          <Field label="Telefone" value={profile?.telefone} />
          <Field label="Data de nascimento" value={profile?.data_nascimento} />
          {role === "assistido" && (
            <>
              <Field label="Nome do assistido" value={profile?.nome_assistido} />
              <Field label="Parentesco" value={profile?.parentesco} />
            </>
          )}
          {role === "profissional" && (
            <>
              <Field label="Registro profissional" value={profile?.registro_profissional} />
              <Field label="Especialidade" value={profile?.especialidade} />
            </>
          )}
        </dl>

        <div className="mt-8">
          <Button variant="outline" className="rounded-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-xl bg-muted/40 px-4 py-3">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value || "—"}</dd>
    </div>
  );
}
