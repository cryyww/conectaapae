ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cidade text;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_role public.app_role;
BEGIN
  v_role := COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'assistido');

  INSERT INTO public.profiles (
    id, nome_completo, email, telefone, data_nascimento, cidade,
    nome_assistido, parentesco, registro_profissional, especialidade
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', ''),
    NEW.email,
    NEW.raw_user_meta_data->>'telefone',
    NULLIF(NEW.raw_user_meta_data->>'data_nascimento','')::DATE,
    NEW.raw_user_meta_data->>'cidade',
    NEW.raw_user_meta_data->>'nome_assistido',
    NEW.raw_user_meta_data->>'parentesco',
    NEW.raw_user_meta_data->>'registro_profissional',
    NEW.raw_user_meta_data->>'especialidade'
  );

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, v_role);
  RETURN NEW;
END;
$function$;