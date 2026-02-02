import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("analises")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Análise não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar análise:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
