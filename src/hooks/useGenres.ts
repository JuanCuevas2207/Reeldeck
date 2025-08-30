import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Show {
  id: number;
  title: string;
  poster_url: string;
  synopsis: string;
}

interface Genre {
  id: number;
  name: string;
  shows: Show[];
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      // Traer géneros con sus shows usando la tabla intermedia
      const { data, error } = await supabase
        .from('genres')
        .select(`
          id,
          name,
          show_genre (
            show_id,
            shows (id, title, poster_url, synopsis)
          )
        `);

      if (error) console.log('Error al traer géneros:', error);
      else {
        // Mapear los shows dentro de cada género
        const formattedGenres = (data || []).map((genre: any) => ({
          id: genre.id,
          name: genre.name,
          shows: genre.show_genre.map((sg: any) => sg.shows),
        }));
        setGenres(formattedGenres);
      }

      setLoading(false);
    };

    fetchGenres();
  }, []);

  return { genres, loading };
}
