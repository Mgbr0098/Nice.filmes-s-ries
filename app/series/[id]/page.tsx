'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchDetails, getImageUrl } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Page() {
  const params = useParams()
  const id = params.id as string
  const [series, setSeries] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true)
        const data = await fetchDetails(parseInt(id), 'tv')
        setSeries(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) loadSeries()
  }, [id])

  if (loading) return <Loading />
  if (!series) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-2xl">Série não encontrada</div>

  const backdropUrl = getImageUrl(series.backdrop_path, 'w1280')
  const posterUrl = getImageUrl(series.poster_path)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Backdrop */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={backdropUrl}
          alt={series.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-40 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Image
              src={posterUrl}
              alt={series.name}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-white mb-2">{series.name}</h1>
            <p className="text-gray-400 mb-4">
              {series.first_air_date && new Date(series.first_air_date).getFullYear()}
              {series.last_air_date && ` - ${new Date(series.last_air_date).getFullYear()}`}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span className="text-3xl font-bold text-yellow-400">
                  {series.vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className="text-gray-400">
                {series.vote_count.toLocaleString()} votos
              </div>
            </div>

            {/* Genres */}
            {series.genres && series.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {series.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Sinopse</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {series.overview}
              </p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Temporadas</p>
                <p className="text-white font-semibold">{series.number_of_seasons}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Episódios</p>
                <p className="text-white font-semibold">{series.number_of_episodes}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-white font-semibold">{series.status}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Rede</p>
                <p className="text-white font-semibold">
                  {series.networks?.[0]?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cast */}
        {series.credits?.cast && series.credits.cast.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Elenco</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {series.credits.cast.slice(0, 8).map((actor: any) => (
                <div key={actor.id} className="bg-dark-800 rounded-lg overflow-hidden p-4">
                  {actor.profile_path && (
                    <Image
                      src={getImageUrl(actor.profile_path, 'w500')}
                      alt={actor.name}
                      width={150}
                      height={200}
                      className="rounded-lg mb-3 w-full"
                    />
                  )}
                  <p className="text-white font-semibold">{actor.name}</p>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
