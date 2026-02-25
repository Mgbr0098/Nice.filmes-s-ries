'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { fetchTrending } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies')

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true)
        const data = await fetchTrending(activeTab)
        setMovies(data)
      } catch (error) {
        console.error('Erro ao carregar filmes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTrending()
  }, [activeTab])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-br from-dark-700 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
            Nice Filmes & Séries
          </h1>
          <p className="text-xl text-gray-400">Descubra os melhores conteúdos de hoje</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-dark-700">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'movies'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎬 Filmes
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'tv'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📺 Séries
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} type={activeTab} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
