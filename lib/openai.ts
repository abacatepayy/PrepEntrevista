import OpenAI from "openai";
import { Perguntas, VagaData } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function gerarPerguntas(vaga: VagaData): Promise<Perguntas> {
  const prompt = `Você é um especialista em recrutamento e entrevistas de emprego no Brasil.
Analise esta vaga de emprego e gere perguntas que o recrutador provavelmente fará na entrevista.

VAGA:
Título: ${vaga.titulo}
Empresa: ${vaga.empresa}
Descrição: ${vaga.descricao}
${vaga.requisitos ? `Requisitos: ${vaga.requisitos}` : ""}

Retorne um JSON com exatamente este formato:
{
  "altamente_provavel": [
    {
      "pergunta": "...",
      "motivo": "Por que vão perguntar isso baseado na vaga"
    }
  ],
  "podem_perguntar": [
    {
      "pergunta": "...",
      "motivo": "..."
    }
  ],
  "por_precaucao": [
    {
      "pergunta": "...",
      "motivo": "..."
    }
  ]
}

Regras:
- Gere 5-7 perguntas "altamente_provavel" baseadas ESPECIFICAMENTE nos requisitos da vaga
- Gere 4-5 perguntas "podem_perguntar" comuns para esse tipo de cargo/indústria
- Gere 3-4 perguntas "por_precaucao" genéricas de entrevista
- Todas as perguntas em português do Brasil
- Seja específico para a vaga, não genérico
- Inclua perguntas técnicas E comportamentais

Responda APENAS com o JSON, sem markdown ou texto adicional.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("Resposta vazia da OpenAI");
  }

  return JSON.parse(content) as Perguntas;
}
