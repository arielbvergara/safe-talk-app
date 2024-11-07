'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Send, AlertTriangle } from 'lucide-react'
import { MoreVertical, LogIn, LogOut, HelpCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function SafeTalkChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you feeling today?", sender: "ai" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = inputMessage.trim()
      setMessages(prev => [...prev, { id: prev.length + 1, text: userMessage, sender: "user" }])
      setInputMessage("")
      setIsLoading(true)

      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: userMessage }),
        });

        console.log("RES", response)

        if (!response.ok) {
          throw new Error('Failed to get AI response')
        }

        const data = await response.json()
        console.log("data", data)
        console.log("data", data.message.choices[0].message.content)
        setMessages(prev => [...prev, { id: prev.length + 1, text: data.message.choices[0].message.content, sender: "ai" }])
      } catch (error) {
        console.error('Error:', error)
        setMessages(prev => [...prev, { id: prev.length + 1, text: "Sorry, I couldn't process your request. Please try again.", sender: "ai" }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const quickEmotions = ["Happy", "Sad", "Angry", "Confused", "Worried"]

  return (
    <Card className="flex h-screen w-screen flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-700">SafeTalk</h2>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log in</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Helpful Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold text-red-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Panic Alarm</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="message-section flex-grow overflow-hidden p-4">
        <div className="min-h-0 flex-grow">
          <ScrollArea className="h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
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
      <div className="border-t p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {quickEmotions.map((emotion) => (
            <Button
              key={emotion}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(`I'm feeling ${emotion.toLowerCase()}`)}
            >
              {emotion}
            </Button>
          ))}
        </div>
      </div>
      <CardFooter className="space-x-2 p-4">
        <Input
          placeholder="Type your message here..."
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