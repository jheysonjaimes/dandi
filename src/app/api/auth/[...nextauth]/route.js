import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/utils/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Buscar usuario por email
      const { data: existingUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      const now = new Date().toISOString();

      if (!existingUser) {
        // Si no existe, lo crea
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              name: user.name,
              email: user.email,
              image: user.image,
              lastLogin: now,
              createdAt: now,
            },
          ]);
        if (insertError) {
          console.error('Error insertando usuario en Supabase:', insertError);
          return false;
        }
      } else {
        // Si existe, actualiza la fecha de última conexión
        const { error: updateError } = await supabase
          .from('users')
          .update({ lastLogin: now })
          .eq('email', user.email);
        if (updateError) {
          console.error('Error actualizando lastLogin en Supabase:', updateError);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST }; 