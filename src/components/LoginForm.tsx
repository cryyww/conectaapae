import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  role: "assistido" | "profissional";
  title: string;
  subtitle: string;
  accent: "navy" | "yellow";
  cadastroPath: string;
};

export function LoginForm({ title, subtitle, accent, cadastroPath }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível entrar", { description: error.message });
      return;
    }
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/app" });
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Trocar perfil
        </Link>

        <div className="mt-6 rounded-3xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex flex-col items-center text-center">
            <BrandLogo size={48} />
            <h1 className="mt-4 text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full"
              style={accent === "yellow" ? { background: "var(--brand-yellow)", color: "var(--brand-navy)" } : undefined}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link to={cadastroPath} className="font-semibold [color:var(--brand-navy)] hover:underline">
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
