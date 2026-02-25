export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-dark-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎬</span> Nice Filmes
            </h3>
            <p className="text-gray-400 text-sm">
              A melhor plataforma para descobrir e explorar filmes e séries de todo mundo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="/filmes" className="hover:text-red-500 transition">Filmes</a></li>
              <li><a href="/series" className="hover:text-red-500 transition">Séries</a></li>
              <li><a href="/generos" className="hover:text-red-500 transition">Gêneros</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Informações</h4>
            <p className="text-gray-400 text-sm mb-2">
              Dados fornecidos por <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">TMDB</a>
            </p>
            <p className="text-gray-400 text-sm">
              Uma iniciativa de fans para fans 🎥
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Nice Filmes. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
