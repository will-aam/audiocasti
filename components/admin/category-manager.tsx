"use client"

import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

const mockCategories = [
  { id: '1', name: 'Tecnologia', description: 'IA, programação, inovação', episodeCount: 245 },
  { id: '2', name: 'Educação', description: 'Aprendizado, métodos, ensino', episodeCount: 189 },
  { id: '3', name: 'Saúde', description: 'Bem-estar, medicina, fitness', episodeCount: 156 },
  { id: '4', name: 'Negócios', description: 'Empreendedorismo, gestão', episodeCount: 134 },
  { id: '5', name: 'Ciência', description: 'Física, química, biologia', episodeCount: 98 },
  { id: '6', name: 'Arte & Cultura', description: 'História, filosofia, arte', episodeCount: 87 }
]

export function CategoryManager() {
  const [categories, setCategories] = useState(mockCategories)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name, description }
          : cat
      ))
      toast({
        title: "Categoria atualizada!",
        description: "A categoria foi atualizada com sucesso.",
      })
    } else {
      // Add new category
      const newCategory = {
        id: Date.now().toString(),
        name,
        description,
        episodeCount: 0
      }
      setCategories([...categories, newCategory])
      toast({
        title: "Categoria criada!",
        description: "A nova categoria foi adicionada.",
      })
    }

    setName('')
    setDescription('')
    setEditingCategory(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setName(category.name)
    setDescription(category.description)
    setIsDialogOpen(true)
  }

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
    toast({
      title: "Categoria removida!",
      description: "A categoria foi removida com sucesso.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gerenciar Categorias</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCategory(null)
                setName('')
                setDescription('')
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingCategory ? 'Atualizar' : 'Criar'} Categoria
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{category.name}</h3>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
                <p className="text-xs font-medium">
                  {category.episodeCount} episódios
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
