/**
 * Utilidades de validación para el endpoint de GitHub Summarizer
 */

/**
 * Valida el formato de una URL de GitHub
 * @param {string} repositoryUrl - La URL a validar
 * @returns {boolean} - true si la URL es válida, false en caso contrario
 */
export function validarUrlGitHub(repositoryUrl) {
  const githubUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/;
  return githubUrlPattern.test(repositoryUrl);
}

/**
 * Valida que se proporcione una API key
 * @param {string} key - La API key a validar
 * @returns {boolean} - true si la key está presente, false en caso contrario
 */
export function validarApiKey(key) {
  return key && key.trim().length > 0;
}

/**
 * Valida que se proporcione una URL de repositorio
 * @param {string} repositoryUrl - La URL a validar
 * @returns {boolean} - true si la URL está presente, false en caso contrario
 */
export function validarRepositoryUrl(repositoryUrl) {
  return repositoryUrl && repositoryUrl.trim().length > 0;
} 