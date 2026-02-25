'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { fetchTrending } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Page() {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true)
        const data = await fetchTrending('tv')
        setSeries(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSeries()
  }, [])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">📺 Séries em Alta</h1>
          <p className="text-white/90">Veja as séries mais populares e aclamadas</p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {series.map((show: any) => (
              <MovieCard key={show.id} movie={show} type="tv" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
