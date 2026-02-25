'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { fetchTrending } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Page() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true)
        const data = await fetchTrending('movies')
        setMovies(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [page])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">🎬 Filmes em Alta</h1>
          <p className="text-white/90">Descubra os filmes mais populares e melhor avaliados</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} type="movies" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
