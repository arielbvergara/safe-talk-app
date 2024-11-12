'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CardHeader } from "@/components/ui/card"
import { AlertTriangle } from 'lucide-react'
import { MoreVertical, LogOut, HelpCircle, MessageCircleMore } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from 'next/link'

export default function SafeTalkHeader() {
  
  return (
    
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <h2 className="text-2xl font-bold text-gray-700">SafeTalk</h2>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Más opciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link href={"/"} className='flex'>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/chat"} className='flex'>
                  <MessageCircleMore className="mr-2 h-4 w-4" />
                  <span>Chat with us</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/ayuda"} className='flex'>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Enlaces útiles</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold text-red-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Alarma de pánico</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
  )
}