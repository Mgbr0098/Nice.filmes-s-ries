'use client'

import Link from 'next/link'
import { useState } from 'react'
import SearchBar from './SearchBar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-dark-900 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🎬</span>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Nice
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/filmes" className="hover:text-red-500 transition">
              Filmes
            </Link>
            <Link href="/series" className="hover:text-red-500 transition">
              Séries
            </Link>
            <Link href="/generos" className="hover:text-red-500 transition">
              Gêneros
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <Link href="/" className="hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/filmes" className="hover:text-red-500 transition">
              Filmes
            </Link>
            <Link href="/series" className="hover:text-red-500 transition">
              Séries
            </Link>
            <Link href="/generos" className="hover:text-red-500 transition">
              Gêneros
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
