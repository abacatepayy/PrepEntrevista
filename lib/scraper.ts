import * as cheerio from "cheerio";
import { VagaData } from "@/types";

export function isLinkedInJobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.includes("linkedin.com") &&
      (parsed.pathname.includes("/jobs/") || parsed.pathname.includes("/view/"))
    );
  } catch {
    return false;
  }
}

export async function scrapeLinkedInJob(url: string): Promise<VagaData> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao acessar a vaga: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Tentar diferentes seletores para o título
  let titulo =
    $('h1.top-card-layout__title').text().trim() ||
    $('h1.topcard__title').text().trim() ||
    $('h1[class*="job-title"]').text().trim() ||
    $("h1").first().text().trim() ||
    "Título não encontrado";

  // Tentar diferentes seletores para a empresa
  let empresa =
    $('a.topcard__org-name-link').text().trim() ||
    $('span.topcard__flavor').first().text().trim() ||
    $('a[class*="company-name"]').text().trim() ||
    $('[class*="company"]').first().text().trim() ||
    "Empresa não encontrada";

  // Tentar diferentes seletores para a descrição
  let descricao =
    $('div.description__text').text().trim() ||
    $('div.show-more-less-html__markup').text().trim() ||
    $('[class*="description"]').text().trim() ||
    $('section[class*="description"]').text().trim() ||
    "";

  // Limpar e truncar a descrição se for muito longa
  descricao = descricao.replace(/\s+/g, " ").trim();
  if (descricao.length > 4000) {
    descricao = descricao.substring(0, 4000) + "...";
  }

  // Tentar extrair requisitos
  let requisitos = "";
  const qualificationsSection = $('[class*="qualifications"]').text().trim();
  if (qualificationsSection) {
    requisitos = qualificationsSection;
  }

  // Se não conseguiu extrair muita informação, tentar pegar todo o conteúdo principal
  if (descricao.length < 100) {
    const mainContent =
      $("main").text().trim() || $('article').text().trim() || $("body").text().trim();
    descricao = mainContent.replace(/\s+/g, " ").trim();
    if (descricao.length > 4000) {
      descricao = descricao.substring(0, 4000) + "...";
    }
  }

  return {
    titulo,
    empresa,
    descricao,
    requisitos,
  };
}
