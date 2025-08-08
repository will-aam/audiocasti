"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EpisodeCard } from '@/components/episode-card'

const mockSearchResults = [
  {
    id: '1',
    title: 'O Futuro da Inteligência Artificial',
    description: 'Uma análise profunda sobre como a IA está transformando nossa sociedade',
    thumbnail: '/placeholder.svg?height=200&width=300',
    duration: 2340,
    category: 'Tecnologia',
    author: 'Dr. João Silva',
    publishedAt: '2024-01-15',
    plays: 15420,
    rating: 4.8
  },
  {
    id: '4',
    title: 'Blockchain e Criptomoedas Explicadas',
    description: 'Entenda a tecnologia por trás das moedas digitais',
    thumbnail: '/placeholder.svg?height=200&width=300',
    duration: 2580,
    category: 'Tecnologia',
    author: 'Prof. Ana Costa',
    publishedAt: '2024-01-18',
    plays: 8750,
    rating: 4.6
  }
]

export function SearchContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [results, setResults] = useState(mockSearchResults)

  useEffect(() => {
    // Mock search logic
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
      // Filter results based on query
      const filtered = mockSearchResults.filter(episode =>
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', query, 'Category:', category, 'Sort:', sortBy)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Buscar Episódios</h1>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar por título, descrição, autor..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>

              <div className="flex space-x-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="negocios">Negócios</SelectItem>
                    <SelectItem value="ciencia">Ciência</SelectItem>
                    <SelectItem value="arte-cultura">Arte & Cultura</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigos</SelectItem>
                    <SelectItem value="popular">Mais populares</SelectItem>
                    <SelectItem value="rating">Melhor avaliados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
        </Card>

        {query && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {results.length} resultados encontrados para "{query}"
            </p>
            {category && (
              <Badge variant="secondary" className="mt-2">
                Categoria: {category}
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {results.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum resultado encontrado para sua busca.
          </p>
          <p className="text-muted-foreground">
            Tente usar palavras-chave diferentes ou explore nossas categorias.
          </p>
        </div>
      )}
    </div>
  )
}
