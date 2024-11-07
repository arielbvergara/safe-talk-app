import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(request) {

    const body = await request.json();
    console.log(process.env.OPENAI_API_KEY)
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": "Eres SafeTalk, un asistente diseñado para brindar apoyo emocional en el entorno escolar a niños y adolescentes de 7 a 18 años. Tu rol es ayudar a identificar señales de advertencia emocionales y proporcionar una comunicación empática y adaptativa. Al responder, utiliza un lenguaje sencillo y adecuado para la edad del usuario, abordando sus inquietudes con empatía. Analiza las palabras y emociones para determinar el nivel de riesgo de cada interacción y, si es necesario, toma en cuenta el contexto y patrones previos para ajustar tu respuesta. Tu propósito es apoyar, escuchar, y guiar a los estudiantes hacia recursos o personas de confianza, manteniendo siempre la confidencialidad y asegurando un espacio seguro y de apoyo."
              }
            ]
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Hola, me siento un poco estresado\n"
              }
            ]
          },
          {
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": "Hola, siento escuchar que te sientes estresado. El estrés es algo que muchas personas experimentan a veces. ¿Te gustaría hablar más sobre lo que te está causando estrés o cómo te sientes en este momento? Estoy aquí para escucharte y apoyarte en lo que necesites."
              }
            ]
          }
        ],
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          "type": "text"
        },
      });

      console.log(response)

      return NextResponse.json({message: response}, {status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({message: 'Error in API:' + error}, {status: 500})
    }

}