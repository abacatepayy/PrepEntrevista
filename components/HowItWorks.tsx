const steps = [
  {
    icon: "🔗",
    title: "Cole o link",
    description: "Copie o link da vaga do LinkedIn",
  },
  {
    icon: "🧠",
    title: "IA analisa a vaga",
    description: "Nossa IA identifica os requisitos",
  },
  {
    icon: "✅",
    title: "Receba as perguntas",
    description: "Perguntas prováveis categorizadas",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-center text-text-primary mb-10">
        Como funciona
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-linkedin-light rounded-full flex items-center justify-center text-3xl mb-4">
              {step.icon}
            </div>
            <h3 className="font-semibold text-text-primary mb-1">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden sm:block absolute transform translate-x-32">
                <span className="text-gray-300 text-2xl">→</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
