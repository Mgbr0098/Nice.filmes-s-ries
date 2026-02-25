import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nice Filmes & Séries',
  description: 'Descubra e explore filmes e séries com a maior plataforma de streaming de informações',
  keywords: 'filmes, séries, tv, movies, streaming, TMDB',
  authors: [{ name: 'Nice Filmes' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nice-filmes.com',
    siteName: 'Nice Filmes & Séries',
    description: 'A melhor plataforma para descobrir filmes e séries',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-dark-900 text-gray-100">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
