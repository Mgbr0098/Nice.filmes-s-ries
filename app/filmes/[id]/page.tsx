'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchDetails, getImageUrl } from '@/lib/tmdb'
import Loading from '@/components/Loading'

export default function Page() {
  const params = useParams()
  const id = params.id as string
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true)
        const data = await fetchDetails(parseInt(id), 'movie')
        setMovie(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) loadMovie()
  }, [id])

  if (loading) return <Loading />
  if (!movie) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-2xl">Filme não encontrado</div>

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280')
  const posterUrl = getImageUrl(movie.poster_path)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Backdrop */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={backdropUrl}
          alt={movie.title}
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
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-gray-400 mb-4">{movie.release_date}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                <span className="text-3xl font-bold text-yellow-400">
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className="text-gray-400">
                {movie.vote_count.toLocaleString()} votos
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold"
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
                {movie.overview}
              </p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Orçamento</p>
                <p className="text-white font-semibold">
                  {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Receita</p>
                <p className="text-white font-semibold">
                  {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Duração</p>
                <p className="text-white font-semibold">{movie.runtime} min</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Produtoras</p>
                <p className="text-white font-semibold">
                  {movie.production_companies?.[0]?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cast */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Elenco</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.credits.cast.slice(0, 8).map((actor: any) => (
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
