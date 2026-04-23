import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import RankingTable from "./RankingTable";
import RankingTableCard from "./RankingTableCard";
import RankingTableModal from "./RankingTableModal";
import type { RankingColumn } from "./RankingTable.types";

type MedicalUnitRow = {
  id: number;
  institucion: string;
  unidad: string;
  tipo: string;
  medicos: number;
  nivelAtencion: string;
};

const mockData: MedicalUnitRow[] = [
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

const compactColumns: RankingColumn<MedicalUnitRow>[] = [
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

const expandedColumns: RankingColumn<MedicalUnitRow>[] = [
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

const customColumns: RankingColumn<MedicalUnitRow>[] = [
  { header: "Institución", key: "institucion" },
  {
    header: "Unidad",
    key: "unidad",
    truncate: true,
    maxWidth: "max-w-[220px]",
  },
  { header: "Tipo", key: "tipo" },
  {
    header: "Médicos",
    key: "medicos",
    align: "center",
    render: (row) => (
      <span className="font-semibold text-[#16A34A]">{row.medicos}</span>
    ),
  },
  { header: "Nivel atención", key: "nivelAtencion", align: "center" },
];

const TypedRankingTable = RankingTable<MedicalUnitRow>;

const meta = {
  title: "Components/Tables/RankingTable",
  component: TypedRankingTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    columns: expandedColumns,
    data: mockData,
  },
} satisfies Meta<typeof TypedRankingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseTable: Story = {
  args: {},
  render: () => (
    <div className="w-[1100px] p-8 rounded-[24px]">
      <RankingTable columns={expandedColumns} data={mockData} />
    </div>
  ),
};

export const CompactTable: Story = {
  args: {},
  render: () => (
    <div className="w-[700px] p-6 rounded-[20px]">
      <RankingTable
        columns={compactColumns}
        data={mockData.slice(0, 4)}
        compact
        rowHeight="sm"
      />
    </div>
  ),
};

export const SummaryCard: Story = {
  args: {},
  render: () => (
    <div className="w-[520px]">
      <RankingTableCard
        title="Unidades médicas en Cuernavaca"
        columns={compactColumns}
        data={mockData}
        footerText="Ver ranking completo"
        onFooterClick={() => {}}
      />
    </div>
  ),
};

export const FullModalOpen: Story = {
  args: {},
  render: () => (
    <div className="w-screen h-screen bg-slate-200">
      <RankingTableModal
        isOpen={true}
        title="Unidades médicas en Cuernavaca"
        columns={expandedColumns}
        data={mockData}
        onClose={() => {}}
      />
    </div>
  ),
};

export const CardWithModalFlow: Story = {
  args: {},
  render: () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="w-[520px]">
          <RankingTableCard
            title="Unidades médicas en Cuernavaca"
            columns={compactColumns}
            data={mockData}
            footerText="Ver ranking completo"
            onFooterClick={() => setIsOpen(true)}
          />

          <RankingTableModal
            isOpen={isOpen}
            title="Unidades médicas en Cuernavaca"
            columns={expandedColumns}
            data={mockData}
            onClose={() => setIsOpen(false)}
          />
        </div>
      );
    };

    return <Demo />;
  },
};

export const EmptyState: Story = {
  args: {},
  render: () => (
    <div className="w-[700px] p-6 rounded-[20px]">
      <RankingTable
        columns={expandedColumns}
        data={[]}
        emptyMessage="No se encontraron unidades médicas."
      />
    </div>
  ),
};

export const CustomCellRender: Story = {
  args: {},
  render: () => (
    <div className="w-[1100px] p-8 rounded-[24px]">
      <RankingTable columns={customColumns} data={mockData} />
    </div>
  ),
};