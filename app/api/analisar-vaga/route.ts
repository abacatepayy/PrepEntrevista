import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { gerarPerguntas } from "@/lib/openai";
import { isLinkedInJobUrl, scrapeLinkedInJob } from "@/lib/scraper";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL é obrigatória" },
        { status: 400 }
      );
    }

    if (!isLinkedInJobUrl(url)) {
      return NextResponse.json(
        { error: "Por favor, cole um link válido do LinkedIn" },
        { status: 400 }
      );
    }

    // Scraping da vaga
    let vagaData;
    try {
      vagaData = await scrapeLinkedInJob(url);
    } catch (error) {
      console.error("Erro no scraping:", error);
      return NextResponse.json(
        {
          error:
            "Não conseguimos acessar essa vaga. Tente novamente ou cole o texto da vaga diretamente.",
        },
        { status: 422 }
      );
    }

    // Verificar se conseguimos extrair dados suficientes
    if (!vagaData.descricao || vagaData.descricao.length < 50) {
      return NextResponse.json(
        {
          error:
            "Não conseguimos extrair informações suficientes da vaga. A vaga pode estar expirada ou inacessível.",
        },
        { status: 422 }
      );
    }

    // Gerar perguntas com OpenAI
    let perguntas;
    try {
      perguntas = await gerarPerguntas(vagaData);
    } catch (error) {
      console.error("Erro na OpenAI:", error);
      return NextResponse.json(
        { error: "Ops, algo deu errado. Tente novamente em alguns segundos." },
        { status: 500 }
      );
    }

    // Salvar no Supabase
    const { data, error } = await supabase
      .from("analises")
      .insert({
        url,
        titulo_vaga: vagaData.titulo,
        empresa: vagaData.empresa,
        perguntas,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao salvar no Supabase:", error);
      // Mesmo com erro no banco, retornamos as perguntas
      // usando um ID temporário
      return NextResponse.json({
        id: crypto.randomUUID(),
        perguntas,
      });
    }

    return NextResponse.json({
      id: data.id,
      perguntas,
    });
  } catch (error) {
    console.error("Erro geral:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
