import { NextResponse } from 'next/server';
import { validarApiKey, validarRepositoryUrl, validarUrlGitHub } from './utils/validators.js';
import { validarApiKeyEnBaseDeDatos } from './utils/auth.js';
import { obtenerReadmeDeGithub } from './utils/github-readme.js';
import { resumirRepositorioConLangChain } from './utils/langchain-summarizer.js';

export async function POST(request) {
  try {
    const repositoryUrl = (await request.json()).repositoryUrl;
    const key = request.headers.get('x-api-key');
    
    // Validar que se proporcione la API key
    if (!validarApiKey(key)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'No se proporcionó una API Key.' 
      }, { status: 400 });
    }

    // Validar que se proporcione la URL del repositorio
    if (!validarRepositoryUrl(repositoryUrl)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'No se proporcionó la URL del repositorio de GitHub.' 
      }, { status: 400 });
    }

    // Validar formato de URL de GitHub
    if (!validarUrlGitHub(repositoryUrl)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'URL del repositorio de GitHub inválida. Debe ser una URL válida de GitHub.' 
      }, { status: 400 });
    }

    // Validar la API key en la base de datos
    const authResult = await validarApiKeyEnBaseDeDatos(key);
    if (!authResult.valid) {
      return NextResponse.json({ 
        valid: false, 
        error: authResult.error 
      }, { status: authResult.error.includes('no encontrada') ? 404 : 500 });
    }

    // Obtener el contenido del README
    const readContent = await obtenerReadmeDeGithub(repositoryUrl);
    console.log(readContent);

    // Verificar si se puede procesar con LangChain
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        valid: true, 
        message: 'API Key válida. README obtenido exitosamente.',
        repositoryUrl: repositoryUrl,
        readmeContent: readContent,
        error: 'OPENAI_API_KEY no está configurada. No se puede generar el resumen automático.',
        setupRequired: true
      });
    }

    // Generar el resumen usando LangChain
    const resumen = await resumirRepositorioConLangChain(repositoryUrl);

    return NextResponse.json({ 
      valid: true, 
      message: 'API Key válida. Repositorio procesado exitosamente.',
      repositoryUrl: repositoryUrl,
      resumen: resumen.resumen,
      hechos_interesantes: resumen.hechos
    });

  } catch (error) {
    console.error('Error en el endpoint github-summarizer:', error);
    
    // Manejar errores específicos de OpenAI
    if (error.message.includes('OPENAI_API_KEY')) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Configuración de OpenAI requerida. Por favor, configura OPENAI_API_KEY en tu archivo .env.local',
        setupRequired: true
      }, { status: 500 });
    }
    // Manejar errores de cuota/rate limit de OpenAI
    if (error.message.includes('429') || error.message.toLowerCase().includes('quota')) {
      return NextResponse.json({
        valid: false,
        error: 'Has superado el límite de uso de OpenAI o no tienes saldo suficiente. Por favor, revisa tu cuenta en https://platform.openai.com/account/billing/overview',
        openaiError: true
      }, { status: 429 });
    }
    
    return NextResponse.json({ 
      valid: false, 
      error: 'Error interno del servidor.' 
    }, { status: 500 });
  }
}