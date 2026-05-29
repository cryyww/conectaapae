import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";

type Role = "assistido" | "profissional";

type Props = {
  role: Role;
  title: string;
  subtitle: string;
  accent: "navy" | "yellow";
  loginPath: string;
};

const baseSchema = z.object({
  nome_completo: z.string().trim().min(2, "Informe seu nome completo").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(20).optional().or(z.literal("")),
  data_nascimento: z.string().optional().or(z.literal("")),
  cidade: z.string().trim().min(2, "Informe sua cidade").max(80),
  senha: z.string().min(8, "Mínimo de 8 caracteres").max(72),
});

const assistidoExtra = z.object({
  nome_assistido: z.string().trim().min(2, "Informe o nome do assistido").max(120),
  parentesco: z.string().trim().min(2, "Informe o parentesco").max(60),
});

const profissionalExtra = z.object({
  registro_profissional: z.string().trim().min(3, "Informe o registro (ex: CRP 00/00000)").max(60),
  especialidade: z.string().trim().min(2, "Informe a especialidade").max(80),
});

export function SignupForm({ role, title, subtitle, accent, loginPath }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    telefone: "",
    data_nascimento: "",
    senha: "",
    nome_assistido: "",
    parentesco: "",
    registro_profissional: "",
    especialidade: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const schema = role === "assistido" ? baseSchema.merge(assistidoExtra) : baseSchema.merge(profissionalExtra);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Verifique os campos", { description: parsed.error.issues[0].message });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: {
          role,
          nome_completo: form.nome_completo,
          telefone: form.telefone,
          data_nascimento: form.data_nascimento,
          nome_assistido: role === "assistido" ? form.nome_assistido : null,
          parentesco: role === "assistido" ? form.parentesco : null,
          registro_profissional: role === "profissional" ? form.registro_profissional : null,
          especialidade: role === "profissional" ? form.especialidade : null,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error("Não foi possível criar a conta", { description: error.message });
      return;
    }
    toast.success("Conta criada com sucesso!");
    navigate({ to: "/app" });
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto max-w-lg">
        <Link to={loginPath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar ao login
        </Link>

        <div className="mt-6 rounded-3xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-col items-center text-center">
            <BrandLogo size={48} />
            <h1 className="mt-4 text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="nome_completo">Nome completo *</Label>
              <Input id="nome_completo" required value={form.nome_completo} onChange={set("nome_completo")} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" value={form.telefone} onChange={set("telefone")} placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_nascimento">Data de nascimento</Label>
                <Input id="data_nascimento" type="date" value={form.data_nascimento} onChange={set("data_nascimento")} />
              </div>
            </div>

            {role === "assistido" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome_assistido">Nome do assistido *</Label>
                  <Input id="nome_assistido" required value={form.nome_assistido} onChange={set("nome_assistido")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentesco">Parentesco *</Label>
                  <Input id="parentesco" required value={form.parentesco} onChange={set("parentesco")} placeholder="Mãe, pai, responsável…" />
                </div>
              </div>
            )}

            {role === "profissional" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registro_profissional">Registro profissional *</Label>
                  <Input id="registro_profissional" required value={form.registro_profissional} onChange={set("registro_profissional")} placeholder="CRP 00/00000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade *</Label>
                  <Input id="especialidade" required value={form.especialidade} onChange={set("especialidade")} placeholder="Psicologia, fono, T.O…" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" required value={form.email} onChange={set("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha *</Label>
              <Input id="senha" type="password" required minLength={8} value={form.senha} onChange={set("senha")} placeholder="Mínimo 8 caracteres" />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full"
              style={accent === "yellow" ? { background: "var(--brand-yellow)", color: "var(--brand-navy)" } : undefined}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to={loginPath} className="font-semibold [color:var(--brand-navy)] hover:underline">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
