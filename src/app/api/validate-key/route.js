import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function POST(request) {
  const { key } = await request.json();
  if (!key) {
    return NextResponse.json({ valid: false, error: 'No se proporcionó una API Key.' }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('api_keys')
    .select('id')
    .eq('key', key)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ valid: false, error: 'Error al consultar la base de datos.' }, { status: 500 });
  }
  if (data) {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ valid: false, error: 'API Key no encontrada o inválida.' }, { status: 404 });
  }
} 