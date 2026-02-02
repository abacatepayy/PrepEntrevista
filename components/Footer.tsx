export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-gray-500">
          Feito para quem não quer ser pego desprevenido
        </p>
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} PrepEntrevista
        </p>
      </div>
    </footer>
  );
}
