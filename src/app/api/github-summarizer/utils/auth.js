import { supabase } from '@/utils/supabaseClient';

/**
 * Utilidades de autenticación para el endpoint de GitHub Summarizer
 */

/**
 * Valida una API key contra la base de datos
 * @param {string} key - La API key a validar
 * @returns {Promise<{valid: boolean, error?: string}>} - Resultado de la validación
 */
export async function validarApiKeyEnBaseDeDatos(key) {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', key)
      .maybeSingle();

    if (error) {
      return {
        valid: false,
        error: 'Error al consultar la base de datos.'
      };
    }

    if (!data) {
      return {
        valid: false,
        error: 'API Key no encontrada o inválida.'
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Error interno del servidor durante la validación.'
    };
  }
} 