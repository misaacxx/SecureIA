import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; //lottie

@Component({
  selector: 'app-chat-secure-ia',
  imports: [FormsModule,CommonModule],
  standalone: true,
  templateUrl: './chat-secure-ia.component.html',
  styleUrl: './chat-secure-ia.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //lottie
})

export class ChatSecureIAComponent implements OnInit {
  entradaUsuario: string = '';
  mensajeInicial = 'Hola, soy SecureIA. Estoy aquí para ayudarte con recomendaciones de seguridad.';
  mensajes: { texto: string; rol: 'user' | 'bot' }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  sugerencias: string[] = [
    '¿Qué tipo de alarma me recomiendas?',
    '¿Cómo evito robos en mi casa?',
    '¿Qué cámara puedo usar para exteriores?',
    '¿Qué hacer si detecto un intruso?',
    '¿Cómo funcionan los sensores de movimiento?'
  ];


  enviarMensaje() {
    const mensajeUsuario = this.entradaUsuario.trim();
    if (!mensajeUsuario) return;

    this.mensajes.push({ texto: mensajeUsuario, rol: 'user' });
    const cuerpo = {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
       content: `1. Tus respuestas deben ser cortas, de máximo 4 líneas de texto.
                2. Explica en un lenguaje claro, breve y cordial, sin rodeos.
                3. Si el usuario pregunta algo que no esté relacionado con seguridad de inmuebles, responde amablemente que solo puedes ayudar en temas de seguridad de inmuebles.
                4. No des información extensa ni respuestas largas. Si la consulta requiere detalle, invita al usuario a concretar su pregunta o a solicitar más información.
                5. Siempre responde en español.
                6. Nunca superes los 4 reglones en tu respuesta, aunque el usuario insista.`
        },
        { role: "user", content: mensajeUsuario }
      ]
    };
    this.http.post<any>('https://openrouter.ai/api/v1/chat/completions', cuerpo, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    }).subscribe({
      next: res => {
        const respuestaIA = res.choices[0].message.content;
        this.mensajes.push({ texto: respuestaIA, rol: 'bot' });
      },
      error: err => {
        console.error('Error al obtener respuesta:', err);
        this.mensajes.push({ texto: 'Ocurrió un error al obtener la respuesta de IA.', rol: 'bot' });
      }
    });

    this.entradaUsuario = '';
  }

  enviarSugerencia(texto: string) {
    this.entradaUsuario = texto;
    this.enviarMensaje();
  }

}
