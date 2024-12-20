'use client'

import React, { Key, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Send } from 'lucide-react'
import SafeTalkHeader from './header'

type MessageStructure = {
  id: Number,
  role: String,
  content: {
    type: String,
    text: String
  }
} 

const CreateMessageStructure = (id: Number, message: String, isUser: Boolean): MessageStructure => {
  return {
    id: id,
    role: isUser ? "user" : "system",
    content: {
      type: "text",
      text: message
    }
  }
}

export default function SafeTalkChat() {
  
  const [messages, setMessages] = useState([
    CreateMessageStructure(1, "Hola! Cómo te sientes hoy?", false)
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickEmotionsMessages, setShowQuickEmotionsMessages] = useState(true)

  const handleSend = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = inputMessage.trim()
      const newMessage =  CreateMessageStructure(messages.length + 1, userMessage, true)
      setMessages(prev => [...prev, newMessage])
      setInputMessage("")
      setIsLoading(true)
      
      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: [...messages, newMessage]}),
        });

        if (!response.ok) {
          throw new Error('Perdon. Hubo un error al procesar tu mensaje! Puedes volver a intentar?¡Ups! Hubo un problema al procesar tu mensaje. ¿Te gustaría intentarlo de nuevo?')
        }

        const data = await response.json()
        
        setMessages(prev => [...prev, CreateMessageStructure(prev.length + 1, data.message.choices[0].message.content, false)])
      } catch (error) {
        console.log(error)
        setMessages(prev => [...prev, CreateMessageStructure(prev.length + 1, "¡Ups! Hubo un problema al procesar tu mensaje. ¿Te gustaría intentarlo de nuevo?", false)])
      } finally {
        setIsLoading(false)
        setShowQuickEmotionsMessages(false)
      }
    }
  }

  const quickEmotions = ["Feliz", "Triste", "Enojado", "Confundido", "Preocupado"]

  return (
    <Card className="flex h-screen w-screen flex-col">
      <SafeTalkHeader />
      <CardContent className="message-section flex-grow overflow-hidden border-b p-4">
        <div className="min-h-0 flex-grow">
          <ScrollArea className="h-full">
            {messages.map((message) => (
              <div
                key={message.id as Key}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${
                    message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-gray-200 p-2 text-gray-800">
                  <ThinkingDots />
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
      {
        showQuickEmotionsMessages &&
          <div className="p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickEmotions.map((emotion) => (
                <Button
                  key={emotion}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage(`Me siento ${emotion.toLowerCase()}`)
                  }}
                >
                  {emotion}
                </Button>
              ))}
            </div>
          </div>
      }
      
      <CardFooter className="space-x-2 p-4">
        <Input
          placeholder="Escribe tu mensaje aquí..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function ThinkingDots() {
  return (
    <div className="flex space-x-1">
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: '0s' }}></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: '0.2s' }}></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: '0.4s' }}></div>
    </div>
  )
}