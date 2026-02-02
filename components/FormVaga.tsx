"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "./LoadingState";

export default function FormVaga() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Por favor, cole um link de vaga do LinkedIn.");
      return;
    }

    if (!url.includes("linkedin.com")) {
      setError("Por favor, cole um link válido do LinkedIn");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analisar-vaga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao analisar vaga");
      }

      router.push(`/resultado/${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ops, algo deu errado. Tente novamente em alguns segundos."
      );
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Cole aqui o link da vaga do LinkedIn"
          className="flex-1 px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-linkedin-primary transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-linkedin-primary text-white font-bold text-lg rounded-xl hover:bg-linkedin-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Analisar Vaga →
        </button>
      </div>
      {error && (
        <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
      )}
      <p className="mt-4 text-sm text-gray-500 text-center">
        Funciona com vagas do LinkedIn. Gratuito por tempo limitado.
      </p>
    </form>
  );
}
