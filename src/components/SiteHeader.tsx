import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BrandLogo size={36} />
          <span className="text-lg font-bold tracking-tight">
            Conecta<span className="[color:var(--brand-yellow)]">APAE</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
            Funcionalidades
          </a>
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
            Como funciona
          </a>
          <a href="#beneficios" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
            Benefícios
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/login">Começar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
