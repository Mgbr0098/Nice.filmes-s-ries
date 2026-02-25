'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/tmdb'
import { useState } from 'react'

interface MovieCardProps {
  movie: any
  type: 'movies' | 'tv'
}

export default function MovieCard({ movie, type }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const title = movie.title || movie.name
  const detailsLink = type === 'movies' ? `/filmes/${movie.id}` : `/series/${movie.id}`

  return (
    <Link href={detailsLink}>
      <div
        className="relative overflow-hidden rounded-lg group cursor-pointer h-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster Image */}
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
          {/* Title and Rating */}
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white font-semibold">
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>

          {/* Description */}
          {isHovered && (
            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {movie.overview || 'Sem descrição disponível'}
            </p>
          )}

          {/* Year */}
          <p className="text-gray-400 text-xs">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
        </div>

        {/* Badge */}
        <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-white text-xs font-bold">
          {movie.vote_average > 7 ? '🔥 Top' : '⭐ Novo'}
        </div>
      </div>
    </Link>
  )
}
