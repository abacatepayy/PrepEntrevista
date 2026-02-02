"use client";

import { useState } from "react";
import { Pergunta } from "@/types";

interface PerguntaCardProps {
  pergunta: Pergunta;
  tipo: "alta" | "media" | "baixa";
}

const estilos = {
  alta: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    icon: "🔴",
  },
  media: {
    border: "border-l-yellow-500",
    bg: "bg-yellow-50",
    icon: "🟡",
  },
  baixa: {
    border: "border-l-green-500",
    bg: "bg-green-50",
    icon: "🟢",
  },
};

export default function PerguntaCard({ pergunta, tipo }: PerguntaCardProps) {
  const [copiado, setCopiado] = useState(false);
  const estilo = estilos[tipo];

  const copiar = async () => {
    await navigator.clipboard.writeText(pergunta.pergunta);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div
      className={`${estilo.bg} ${estilo.border} border-l-4 rounded-lg p-4 mb-3 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="font-medium text-text-primary mb-2">
            {estilo.icon} {pergunta.pergunta}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Por que podem perguntar:</span>{" "}
            {pergunta.motivo}
          </p>
        </div>
        <button
          onClick={copiar}
          className="flex-shrink-0 px-3 py-1 text-xs font-medium text-linkedin-primary hover:bg-linkedin-primary hover:text-white border border-linkedin-primary rounded transition-colors"
        >
          {copiado ? "Copiado!" : "Copiar"}
        </button>
      </div>
    </div>
  );
}
