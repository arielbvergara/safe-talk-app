'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, HeartPulse, Phone, Users } from "lucide-react"

const links = [
  {
    title: "Línea de Ayuda",
    description: "Habla con un profesional las 24 horas",
    icon: <Phone className="h-6 w-6" />,
    url: "https://www.argentina.gob.ar/salud/mental-y-adicciones/recursos-atencion"
  },
  {
    title: "Recursos Educativos",
    description: "Materiales de estudio y apoyo académico",
    icon: <Book className="h-6 w-6" />,
    url: "https://www.educ.ar/"
  },
  {
    title: "Salud y Bienestar",
    description: "Consejos para mantener una buena salud mental",
    icon: <HeartPulse className="h-6 w-6" />,
    url: "https://www.argentina.gob.ar/salud/mental-y-adicciones"
  },
  {
    title: "Grupos de Apoyo",
    description: "Conecta con otros estudiantes",
    icon: <Users className="h-6 w-6" />,
    url: "https://www.argentina.gob.ar/tema/jovenes"
  }
]

export function HelpfulLinksComponent() {
  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader className="bg-muted">
        <CardTitle className="text-2xl font-bold text-primary">Enlaces Útiles</CardTitle>
        <CardDescription>Recursos para apoyarte en tu camino</CardDescription>
      </CardHeader>
      <ScrollArea className="h-[400px]">
        <CardContent className="p-6">
          <div className="grid gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="mr-4 rounded-full bg-primary p-2 text-primary-foreground">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}