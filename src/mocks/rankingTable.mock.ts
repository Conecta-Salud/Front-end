import type { RankingColumn } from "../components/RankingTable/RankingTable.types";

export type MedicalUnitRow = {
  id: number;
  institucion: string;
  unidad: string;
  tipo: string;
  medicos: number;
  nivelAtencion: string;
};

export const rankingData: MedicalUnitRow[] = [
  {
    id: 1,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Hospitalización",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 2,
    institucion: "IMS",
    unidad: "UNIDAD MOVIL DE ATENCIÓN",
    tipo: "Apoyo",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 3,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Asistencia Local",
    medicos: 510,
    nivelAtencion: "No Aplica",
  },
  {
    id: 4,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 5,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 6,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 1,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Hospitalización",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 2,
    institucion: "IMS",
    unidad: "UNIDAD MOVIL DE ATENCIÓN",
    tipo: "Apoyo",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 3,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Asistencia Local",
    medicos: 510,
    nivelAtencion: "No Aplica",
  },
  {
    id: 4,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 5,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 6,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 1,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Hospitalización",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 2,
    institucion: "IMS",
    unidad: "UNIDAD MOVIL DE ATENCIÓN",
    tipo: "Apoyo",
    medicos: 510,
    nivelAtencion: "Segundo Nivel",
  },
  {
    id: 3,
    institucion: "IMS",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Asistencia Local",
    medicos: 510,
    nivelAtencion: "No Aplica",
  },
  {
    id: 4,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 5,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
  {
    id: 6,
    institucion: "CRO",
    unidad: "HGRMF 1 CUERNAVACA",
    tipo: "Consulta Externa",
    medicos: 510,
    nivelAtencion: "Primer Nivel",
  },
];

export const compactColumns: RankingColumn<MedicalUnitRow>[] = [
  { header: "Institución", key: "institucion" },
  {
    header: "Unidad",
    key: "unidad",
    truncate: true,
    maxWidth: "max-w-[180px]",
  },
  { header: "Tipo", key: "tipo" },
  { header: "Nivel atención", key: "nivelAtencion" },
];

export const fullColumns: RankingColumn<MedicalUnitRow>[] = [
  { header: "Institución", key: "institucion" },
  {
    header: "Unidad",
    key: "unidad",
    truncate: true,
    maxWidth: "max-w-[220px]",
  },
  { header: "Tipo", key: "tipo" },
  { header: "Médicos", key: "medicos", align: "center" },
  { header: "Nivel atención", key: "nivelAtencion", align: "center" },
];