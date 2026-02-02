import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-linkedin-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            A análise que você procura não existe ou expirou.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-linkedin-primary text-white font-bold rounded-xl hover:bg-linkedin-secondary transition-colors"
          >
            Voltar ao início
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
