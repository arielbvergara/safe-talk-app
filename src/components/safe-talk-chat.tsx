'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Send, AlertTriangle } from 'lucide-react'
import { MoreVertical, LogIn, LogOut, HelpCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SafeTalkChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you feeling today?", sender: "ai" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: "user" }])
      setInputMessage("")
      // Here you would typically send the message to your AI backend and get a response
      // For this example, we'll just simulate an AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, text: "Thank you for sharing. Can you tell me more about that?", sender: "ai" }])
      }, 1000)
    }
  }

  const quickEmotions = ["Happy", "Sad", "Angry", "Confused", "Worried"]

  return (
    <Card className="mx-auto flex h-[600px] w-full max-w-md flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <div className="flex items-center space-x-2">
          {/* <div className="relative h-8 w-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-11-07%20at%2013.23.32-Mo9nKHrCxo8zslp4Rn3XJGehAR2pyA.png"
              alt="SafeTalk Logo"
              fill
              className="object-contain"
            />
          </div> */}
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
      <CardContent className="flex-grow overflow-hidden pt-4">
        <ScrollArea className="h-full pr-4">
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
        </ScrollArea>
      </CardContent>
      <div className="border-t p-4 pt-4">
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
      <CardFooter className="space-x-2">
        <Input
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}