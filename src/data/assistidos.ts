export type Assistido = {
  id: string;
  nome: string;
  idade: number;
  responsavel: string;
  parentesco: string;
  diagnostico: string;
  entrada: string;
  rotina: { hora: string; atividade: string; responsavel: string }[];
  indicadores: { label: string; value: number }[];
  documentos: { pasta: string; arquivos: string[] }[];
  evolucao: { data: string; titulo: string; descricao: string; autor: string }[];
};

export const ASSISTIDOS: Assistido[] = [
  {
    id: "lucas-m",
    nome: "Lucas Martins",
    idade: 9,
    responsavel: "Mariana Martins",
    parentesco: "Mãe",
    diagnostico: "TEA — nível de suporte 1",
    entrada: "12/03/2022",
    rotina: [
      { hora: "08:30", atividade: "Fonoaudiologia", responsavel: "Dra. Júlia" },
      { hora: "10:00", atividade: "Oficina de artes", responsavel: "Prof. Ana" },
      { hora: "13:30", atividade: "Atividade física", responsavel: "Prof. Carlos" },
    ],
    indicadores: [
      { label: "Comunicação", value: 72 },
      { label: "Autonomia", value: 65 },
      { label: "Interação social", value: 80 },
      { label: "Atividades diárias", value: 70 },
    ],
    documentos: [
      { pasta: "Documentos pessoais", arquivos: ["RG.pdf", "CPF.pdf", "Certidão.pdf"] },
      { pasta: "Laudos médicos", arquivos: ["Laudo_neuro_2024.pdf", "Avaliação_fono.pdf"] },
      { pasta: "Anamnese", arquivos: ["Anamnese_inicial.pdf"] },
    ],
    evolucao: [
      { data: "20/05/2026", titulo: "Avanço na fala", descricao: "Frases de 4 palavras com clareza.", autor: "Dra. Júlia" },
      { data: "12/05/2026", titulo: "Oficina concluída", descricao: "Participou de toda a atividade de pintura.", autor: "Prof. Ana" },
    ],
  },
  {
    id: "helena-r",
    nome: "Helena Ribeiro",
    idade: 12,
    responsavel: "Paulo Ribeiro",
    parentesco: "Pai",
    diagnostico: "Síndrome de Down",
    entrada: "05/08/2021",
    rotina: [
      { hora: "09:30", atividade: "Terapia Ocupacional", responsavel: "Dr. Pedro" },
      { hora: "11:00", atividade: "Reforço escolar", responsavel: "Profa. Beatriz" },
    ],
    indicadores: [
      { label: "Comunicação", value: 84 },
      { label: "Autonomia", value: 78 },
      { label: "Interação social", value: 88 },
      { label: "Atividades diárias", value: 75 },
    ],
    documentos: [
      { pasta: "Documentos pessoais", arquivos: ["RG.pdf", "CPF.pdf"] },
      { pasta: "Laudos médicos", arquivos: ["Cardiologia_2025.pdf"] },
      { pasta: "Anamnese", arquivos: ["Anamnese_2021.pdf"] },
    ],
    evolucao: [
      { data: "22/05/2026", titulo: "Leitura", descricao: "Leu pequeno parágrafo com fluência.", autor: "Profa. Beatriz" },
    ],
  },
  {
    id: "bruno-t",
    nome: "Bruno Teixeira",
    idade: 15,
    responsavel: "Sandra Teixeira",
    parentesco: "Mãe",
    diagnostico: "Deficiência intelectual leve",
    entrada: "18/02/2023",
    rotina: [
      { hora: "10:30", atividade: "Psicologia", responsavel: "Dra. Marina" },
      { hora: "14:00", atividade: "Oficina de marcenaria", responsavel: "Prof. Rafael" },
    ],
    indicadores: [
      { label: "Comunicação", value: 70 },
      { label: "Autonomia", value: 82 },
      { label: "Interação social", value: 68 },
      { label: "Atividades diárias", value: 80 },
    ],
    documentos: [
      { pasta: "Documentos pessoais", arquivos: ["RG.pdf"] },
      { pasta: "Laudos médicos", arquivos: ["Laudo_2023.pdf"] },
      { pasta: "Anamnese", arquivos: ["Anamnese_2023.pdf"] },
    ],
    evolucao: [
      { data: "21/05/2026", titulo: "Projeto concluído", descricao: "Entregou porta-retratos da oficina.", autor: "Prof. Rafael" },
    ],
  },
  {
    id: "sofia-l",
    nome: "Sofia Lima",
    idade: 7,
    responsavel: "Júlia Lima",
    parentesco: "Mãe",
    diagnostico: "Paralisia cerebral",
    entrada: "10/01/2024",
    rotina: [
      { hora: "08:00", atividade: "Fisioterapia", responsavel: "Dra. Ana" },
      { hora: "10:00", atividade: "Estimulação sensorial", responsavel: "Profa. Lia" },
    ],
    indicadores: [
      { label: "Comunicação", value: 55 },
      { label: "Autonomia", value: 48 },
      { label: "Interação social", value: 72 },
      { label: "Atividades diárias", value: 60 },
    ],
    documentos: [
      { pasta: "Documentos pessoais", arquivos: ["RG.pdf", "CPF.pdf"] },
      { pasta: "Laudos médicos", arquivos: ["Laudo_neuro.pdf", "Fisio_avaliacao.pdf"] },
      { pasta: "Anamnese", arquivos: ["Anamnese_2024.pdf"] },
    ],
    evolucao: [
      { data: "19/05/2026", titulo: "Sustentação cervical", descricao: "Manteve postura por 2 minutos.", autor: "Dra. Ana" },
    ],
  },
];

export function getAssistido(id: string): Assistido | undefined {
  return ASSISTIDOS.find((a) => a.id === id);
}
