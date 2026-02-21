// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Llamada oficial a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Aquí se usa la llave segura
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // O 'gpt-4o' si prefieres
        messages: [
          { role: 'system', content: 'Eres un asistente útil y amable.' },
          { role: 'user', content: message }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en OpenAI');
    }

    const reply = data.choices[0].message.content;
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Error API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}