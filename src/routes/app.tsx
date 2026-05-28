import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home, Users, CalendarDays, MessageCircle, UserCircle2, LogOut, Loader2, Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "ConectaAPAE" }] }),
  component: AppLayout,
});

type NavItem = { to: string; label: string; icon: typeof Home; exact?: boolean };
const NAV: NavItem[] = [
  { to: "/app", label: "Início", icon: Home, exact: true },
  { to: "/app/assistidos", label: "Assistidos", icon: Users },
  { to: "/app/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/app/mensagens", label: "Mensagens", icon: MessageCircle },
  { to: "/app/perfil", label: "Perfil", icon: UserCircle2 },
];

function AppLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: prof } = await supabase
        .from("profiles")
        .select("nome_completo")
        .eq("id", session.user.id)
        .maybeSingle();
      setName((prof?.nome_completo as string) || session.user.email || "Usuário");
      setLoading(false);
    })();
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta");
    navigate({ to: "/" });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <BrandLogo size={36} />
          <span className="text-lg font-bold">
            Conecta<span className="[color:var(--brand-yellow)]">APAE</span>
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = isActive(item.to, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition",
                  active
                    ? "bg-[color:var(--brand-yellow)] text-[color:var(--brand-navy)]"
                    : "text-sidebar-foreground/85 hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 truncate text-sm text-sidebar-foreground/80">{name}</div>
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-full bg-transparent text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      {/* Topbar (mobile) */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <BrandLogo size={28} />
          <span className="font-bold">ConectaAPAE</span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" onClick={() => setOpen((v) => !v)}>
          <Menu className="h-5 w-5" />
        </Button>
      </header>
      {open && (
        <div className="sticky top-[57px] z-30 border-b border-border bg-sidebar text-sidebar-foreground md:hidden">
          <nav className="grid gap-1 p-3">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, item.exact);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold",
                    active
                      ? "bg-[color:var(--brand-yellow)] text-[color:var(--brand-navy)]"
                      : "hover:bg-sidebar-accent",
                  )}
                >
                  <Icon className="h-5 w-5" /> {item.label}
                </Link>
              );
            })}
            <Button variant="outline" size="sm" className="mt-2 rounded-full bg-transparent text-sidebar-foreground" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          </nav>
        </div>
      )}

      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
