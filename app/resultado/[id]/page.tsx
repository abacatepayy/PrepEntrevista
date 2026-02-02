import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultadoPerguntas from "@/components/ResultadoPerguntas";
import { supabase } from "@/lib/supabase";
import { Analise } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getAnalise(id: string): Promise<Analise | null> {
  const { data, error } = await supabase
    .from("analises")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Analise;
}

export default async function ResultadoPage({ params }: PageProps) {
  const { id } = await params;
  const analise = await getAnalise(id);

  if (!analise) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            Suas perguntas de entrevista
          </h1>
          <p className="text-gray-600 mt-2">
            Baseadas na análise da vaga, aqui estão as perguntas prováveis
          </p>
        </div>
        <ResultadoPerguntas
          perguntas={analise.perguntas}
          tituloVaga={analise.titulo_vaga}
          empresa={analise.empresa}
        />
      </main>
      <Footer />
    </>
  );
}
