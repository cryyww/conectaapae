import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Role = "assistido" | "profissional" | "admin";

export function useRole() {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!active) return;
      setRole(((data?.role as Role) ?? "assistido"));
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const isProfissional = role === "profissional" || role === "admin";
  return { role, loading, isProfissional };
}
