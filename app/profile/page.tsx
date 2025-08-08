"use client"

import { useState } from 'react'
import { User, Heart, Clock, List, Star, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { EpisodeCard } from '@/components/episode-card'

const mockUser = {
  name: 'João Silva',
  email: 'joao@example.com',
  avatar: '/placeholder.svg?height=100&width=100',
  joinedAt: '2023-06-15',
  totalListeningTime: 12450, // em minutos
  favoriteEpisodes: 45,
  completedEpisodes: 123
}

const mockFavorites = [
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
  }
]

const mockHistory = [
  {
    id: '2',
    title: 'Neurociência e Aprendizado',
    description: 'Como nosso cérebro processa informações e forma memórias',
    thumbnail: '/placeholder.svg?height=200&width=300',
    duration: 1890,
    category: 'Ciência',
    author: 'Dra. Maria Santos',
    publishedAt: '2024-01-12',
    plays: 12350,
    rating: 4.9,
    listenedAt: '2024-01-20',
    progress: 85
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const formatListeningTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
                <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{formatListeningTime(mockUser.totalListeningTime)}</p>
                    <p className="text-sm text-muted-foreground">Tempo ouvido</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUser.favoriteEpisodes}</p>
                    <p className="text-sm text-muted-foreground">Favoritos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUser.completedEpisodes}</p>
                    <p className="text-sm text-muted-foreground">Concluídos</p>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  Episódios Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{mockUser.favoriteEpisodes}</p>
                <p className="text-muted-foreground">episódios salvos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Tempo Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{formatListeningTime(mockUser.totalListeningTime)}</p>
                <p className="text-muted-foreground">de conteúdo ouvido</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Avaliações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.6</p>
                <p className="text-muted-foreground">avaliação média dada</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Episódios Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFavorites.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Reprodução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHistory.map((episode) => (
                  <div key={episode.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={episode.thumbnail || "/placeholder.svg"}
                      alt={episode.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{episode.title}</h3>
                      <p className="text-sm text-muted-foreground">{episode.author}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary">{episode.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Ouvido em {new Date(episode.listenedAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{episode.progress}% concluído</p>
                      <div className="w-24 bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${episode.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playlists">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Minhas Playlists
                <Button>
                  <List className="mr-2 h-4 w-4" />
                  Nova Playlist
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <List className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Você ainda não criou nenhuma playlist.
                </p>
                <Button className="mt-4">Criar Primeira Playlist</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
