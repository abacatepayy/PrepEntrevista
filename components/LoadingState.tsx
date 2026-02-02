"use client";

import { useState, useEffect } from "react";

const messages = [
  "Analisando a vaga...",
  "Identificando requisitos...",
  "Gerando perguntas personalizadas...",
  "Quase lá...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-linkedin-light rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-linkedin-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-linkedin-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-text-primary animate-pulse">
          {messages[messageIndex]}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {messages.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === messageIndex ? "bg-linkedin-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
