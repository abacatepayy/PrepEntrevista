"use client";

import { Perguntas } from "@/types";
import PerguntaCard from "./PerguntaCard";

interface ResultadoPerguntasProps {
  perguntas: Perguntas;
  tituloVaga?: string | null;
  empresa?: string | null;
}

export default function ResultadoPerguntas({
  perguntas,
  tituloVaga,
  empresa,
}: ResultadoPerguntasProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {(tituloVaga || empresa) && (
        <div className="text-center mb-8">
          {tituloVaga && (
            <h2 className="text-2xl font-bold text-text-primary">
              {tituloVaga}
            </h2>
          )}
          {empresa && <p className="text-gray-600 mt-1">{empresa}</p>}
        </div>
      )}

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔴</span>
          <h3 className="text-xl font-bold text-text-primary">
            Altamente Provável
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Essas são as perguntas que CERTAMENTE vão fazer baseado na vaga
        </p>
        {perguntas.altamente_provavel.map((p, i) => (
          <PerguntaCard key={i} pergunta={p} tipo="alta" />
        ))}
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🟡</span>
          <h3 className="text-xl font-bold text-text-primary">
            Podem Perguntar
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Perguntas comuns para esse tipo de vaga/empresa
        </p>
        {perguntas.podem_perguntar.map((p, i) => (
          <PerguntaCard key={i} pergunta={p} tipo="media" />
        ))}
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🟢</span>
          <h3 className="text-xl font-bold text-text-primary">
            Só Por Precaução
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Perguntas genéricas mas que é bom estar preparado
        </p>
        {perguntas.por_precaucao.map((p, i) => (
          <PerguntaCard key={i} pergunta={p} tipo="baixa" />
        ))}
      </section>

      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-600 mb-4">
          Quer se preparar para outra vaga?
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-linkedin-primary text-white font-bold rounded-xl hover:bg-linkedin-secondary transition-colors"
        >
          Analisar Nova Vaga →
        </a>
      </div>
    </div>
  );
}
