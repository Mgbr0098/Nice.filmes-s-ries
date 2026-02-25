const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL

if (!API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_TMDB_API_KEY não configurada. Configure em .env.local')
}

export interface Movie {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  overview: string
  release_date?: string
  first_air_date?: string
  genre_ids: number[]
  popularity: number
}

interface ApiResponse {
  results: Movie[]
  total_pages: number
}

// Buscar filmes/séries em alta
export async function fetchTrending(type: 'movies' | 'tv' = 'movies', timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
  try {
    const endpoint = type === 'movies' ? 'movie/popular' : 'tv/popular'
    const response = await fetch(
      `${BASE_URL}/${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`
    )
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Erro ao buscar trending:', error)
    return []
  }
}

// Buscar filme/série por ID
export async function fetchDetails(id: number, type: 'movie' | 'tv' = 'movie'): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits,videos`
    )

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error)
    return null
  }
}

// Buscar filmes/séries por gênero
export async function fetchByGenre(genreId: number, type: 'movie' | 'tv' = 'movie', page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
    )

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Erro ao buscar por gênero:', error)
    return []
  }
}

// Buscar por termo
export async function searchMovies(query: string, type: 'multi' | 'movie' | 'tv' = 'multi', page: number = 1): Promise<Movie[]> {
  if (!query.trim()) return []

  try {
    const response = await fetch(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`
    )

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Erro ao buscar:', error)
    return []
  }
}

// Obter gêneros
export async function fetchGenres(type: 'movie' | 'tv' = 'movie'): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=pt-BR`
    )

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }

    const data = await response.json()
    return data.genres || []
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
    return []
  }
}

// Helper para obter URL da imagem
export function getImageUrl(path: string | null, size: 'w500' | 'w1280' | 'original' = 'w500'): string {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=Sem+imagem'
  }
  return `https://image.tmdb.org/t/p/${size}${path}`
}
