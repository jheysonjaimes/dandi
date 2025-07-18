import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { obtenerReadmeDeGithub } from './github-readme.js';

/**
 * Crea una cadena LangChain que resume el contenido de un README.md de un repositorio de GitHub.
 * @param {string} repositoryUrl - La URL del repositorio de GitHub.
 * @returns {Promise<{ resumen: string, hechos: string[] }>} - Un objeto con el resumen y una lista de hechos.
 */
export async function resumirRepositorioConLangChain(repositoryUrl) {
  // Verificar si la API key de OpenAI está configurada
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no está configurada. Por favor, agrega tu API key de OpenAI en el archivo .env.local");
  }

  // Obtener el contenido del README.md usando la función existente
  const readmeContent = await obtenerReadmeDeGithub(repositoryUrl);

  if (!readmeContent) {
    throw new Error("No se pudo obtener el README.md del repositorio.");
  }

  try {
    // Definir el prompt para el LLM
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "Eres un asistente experto en analizar repositorios de GitHub. " +
        "A continuación recibirás el contenido de un archivo README.md. " +
        "Tu tarea es generar un resumen conciso del repositorio y extraer una lista de hechos clave sobre el mismo. " +
        "Devuelve la respuesta en formato JSON con dos campos: 'resumen' (string) y 'hechos_interesantes' (lista de strings)."
      ],
      [
        "human",
        "Por favor, resume este repositorio de GitHub a partir del siguiente contenido de README.md:\n\n{readme_content}"
      ]
    ]);

    // Instanciar el modelo LLM (puedes ajustar el modelo y la temperatura según tus necesidades)
    const llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      apiKey: process.env.OPENAI_API_KEY
    });

    // Crear la cadena LangChain
    const chain = RunnableSequence.from([
      prompt,
      llm,
      new StringOutputParser()
    ]);

    // Ejecutar la cadena con el contenido del README.md
    const respuesta = await chain.invoke({
      readme_content: readmeContent
    });

    // Intentar parsear la respuesta como JSON estructurado
    let resultado;
    try {
      resultado = JSON.parse(respuesta);
    } catch (e) {
      // Si la respuesta no es JSON válido, devolver un objeto por defecto
      resultado = {
        resumen: "No se pudo obtener un resumen estructurado.",
        hechos: []
      };
    }

    // Validar que los campos existan y sean del tipo esperado
    if (
      typeof resultado.resumen !== "string" ||
      !Array.isArray(resultado.hechos)
    ) {
      resultado = {
        resumen: "No se pudo obtener un resumen estructurado.",
        hechos: []
      };
    }

    return resultado;
  } catch (error) {
    console.error('Error en LangChain:', error);
    throw new Error(`Error al procesar con LangChain: ${error.message}`);
  }
} 