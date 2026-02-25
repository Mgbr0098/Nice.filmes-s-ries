export default function Page() {
  return (
    <div className="min-h-screen bg-dark-900">
      <section className="bg-gradient-to-r from-yellow-600 to-orange-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">🎯 Gêneros</h1>
          <p className="text-white/90">Selecione um gênero para filtrar conteúdo</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 28, name: 'Ação', emoji: '💥' },
            { id: 35, name: 'Comédia', emoji: '😂' },
            { id: 18, name: 'Drama', emoji: '🎭' },
            { id: 14, name: 'Fantasia', emoji: '✨' },
            { id: 878, name: 'Ficção Científica', emoji: '🚀' },
            { id: 53, name: 'Thriller', emoji: '😱' },
            { id: 10749, name: 'Romance', emoji: '💕' },
            { id: 16, name: 'Animação', emoji: '🎨' },
            { id: 9648, name: 'Mistério', emoji: '🔍' },
          ].map((genre) => (
            <a
              key={genre.id}
              href={`/generos/${genre.id}`}
              className="bg-dark-800 hover:bg-dark-700 rounded-lg p-8 text-center transition transform hover:scale-105 cursor-pointer"
            >
              <span className="text-6xl mb-4 block">{genre.emoji}</span>
              <h3 className="text-2xl font-bold text-white">{genre.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
