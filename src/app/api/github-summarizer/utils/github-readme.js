/**
 * Utilidades para obtener contenido de repositorios de GitHub
 */

/**
 * Obtiene el contenido del README.md de un repositorio de GitHub público.
 * @param {string} repositoryUrl - La URL del repositorio de GitHub (por ejemplo, https://github.com/usuario/repositorio)
 * @returns {Promise<string|null>} - El contenido del README.md o null si no se encuentra.
 */
export async function obtenerReadmeDeGithub(repositoryUrl) {
  try {
    // Extraer usuario y repositorio de la URL
    const match = repositoryUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/);
    if (!match) {
      return null;
    }
    const usuario = match[1];
    const repositorio = match[2];

    // Construir la URL cruda del README.md (por defecto en la rama main)
    const urlReadme = `https://raw.githubusercontent.com/${usuario}/${repositorio}/main/README.md`;

    // Intentar obtener el README.md de la rama main
    let respuesta = await fetch(urlReadme);
    if (respuesta.status === 404) {
      // Si no existe en main, intentar en master
      const urlReadmeMaster = `https://raw.githubusercontent.com/${usuario}/${repositorio}/master/README.md`;
      respuesta = await fetch(urlReadmeMaster);
      if (respuesta.status === 404) {
        return null;
      }
    }

    const contenido = await respuesta.text();
    return contenido;
  } catch (e) {
    return null;
  }
} 