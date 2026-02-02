import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepEntrevista - Prepare-se para entrevistas com IA",
  description:
    "Cole o link da vaga do LinkedIn e descubra as perguntas que o recrutador provavelmente vai fazer. Preparação inteligente em 30 segundos.",
  keywords: [
    "entrevista",
    "emprego",
    "LinkedIn",
    "perguntas entrevista",
    "preparação entrevista",
    "vaga emprego",
  ],
  authors: [{ name: "PrepEntrevista" }],
  openGraph: {
    title: "PrepEntrevista - Pare de ser pego de surpresa em entrevistas",
    description:
      "Cole o link da vaga e descubra as perguntas que o recrutador provavelmente vai fazer.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepEntrevista - Prepare-se para entrevistas com IA",
    description:
      "Cole o link da vaga e descubra as perguntas que o recrutador provavelmente vai fazer.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-text-primary min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
