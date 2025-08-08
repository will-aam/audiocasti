"use client"

import { useState } from 'react'
import { Play, Heart, Share2, Clock, Star, MessageCircle, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const mockEpisode = {
  id: '1',
  title: 'O Futuro da Inteligência Artificial',
  description: 'Uma análise profunda sobre como a IA está transformando nossa sociedade, desde aplicações práticas até implicações éticas. Exploramos os avanços mais recentes em machine learning, deep learning e suas aplicações em diversos setores.',
  thumbnail: '/placeholder.svg?height=400&width=600',
  duration: 2340,
  category: 'Tecnologia',
  author: 'Dr. João Silva',
  publishedAt: '2024-01-15',
  plays: 15420,
  rating: 4.8,
  tags: ['IA', 'Machine Learning', 'Tecnologia', 'Futuro'],
  audioUrl: '/placeholder-audio.mp3'
}

const mockComments = [
  {
    id: '1',
    user: 'Maria Santos',
    avatar: '/placeholder.svg?height=40&width=40',
    comment: 'Excelente episódio! Muito esclarecedor sobre os impactos da IA.',
    rating: 5,
    createdAt: '2024-01-16'
  },
  {
    id: '2',
    user: 'Carlos Oliveira',
    avatar: '/placeholder.svg?height=40&width=40',
    comment: 'Adorei a abordagem equilibrada entre benefícios e riscos.',
    rating: 5,
    createdAt: '2024-01-17'
  }
]

export default function EpisodePage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [userRating, setUserRating] = useState(0)

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement comment submission
    console.log('New comment:', newComment, 'Rating:', userRating)
    setNewComment('')
    setUserRating(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={mockEpisode.thumbnail || "/placeholder.svg"}
                  alt={mockEpisode.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                  <Button size="lg" className="rounded-full h-16 w-16">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge className="mb-2">{mockEpisode.category}</Badge>
                    <h1 className="text-3xl font-bold mb-2">{mockEpisode.title}</h1>
                    <p className="text-muted-foreground mb-4">Por {mockEpisode.author}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {formatDuration(mockEpisode.duration)}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {mockEpisode.rating}
                  </div>
                  <div>{mockEpisode.plays.toLocaleString()} plays</div>
                  <div>Publicado em {new Date(mockEpisode.publishedAt).toLocaleDateString('pt-BR')}</div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {mockEpisode.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mockEpisode.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Comentários ({mockComments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Sua avaliação</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="text-2xl"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= userRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="Deixe seu comentário sobre este episódio..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                />
                <Button type="submit" disabled={!newComment.trim()}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comentar
                </Button>
              </form>

              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <div className="flex">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm">{comment.comment}</p>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Episódios Relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-3">
                    <img
                      src={`/placeholder.svg?height=60&width=80&query=related episode ${i}`}
                      alt={`Episódio relacionado ${i}`}
                      className="w-20 h-15 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">
                        Episódio relacionado sobre tecnologia {i}
                      </h4>
                      <p className="text-xs text-muted-foreground">Dr. João Silva</p>
                      <p className="text-xs text-muted-foreground">25:30</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sobre o Autor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt={mockEpisode.author} />
                  <AvatarFallback>{mockEpisode.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{mockEpisode.author}</h3>
                  <p className="text-sm text-muted-foreground">Especialista em IA</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Doutor em Ciência da Computação com mais de 15 anos de experiência em inteligência artificial e machine learning.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
