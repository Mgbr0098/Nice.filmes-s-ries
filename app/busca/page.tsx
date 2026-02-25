'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { searchMovies } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Page() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await searchMovies(query, 'multi')
        setResults(data.filter((item: any) => item.poster_path))
      } catch (error) {
        console.error('Erro na busca:', error)
      } finally {
        setLoading(false)
      }
    }

    search()
  }, [query])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">🔍 Resultados de Busca</h1>
          <p className="text-white/90">
            {query ? `Mostrando resultados para: "${query}"` : 'Digite algo para buscar'}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <Loading />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((result: any) => (
              <MovieCard
                key={result.id}
                movie={result}
                type={result.media_type === 'tv' ? 'tv' : 'movies'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-400 mb-4">😢 Nenhum resultado encontrado</p>
            <p className="text-gray-500">Tente outro termo de busca</p>
          </div>
        )}
      </div>
    </div>
  )
}
