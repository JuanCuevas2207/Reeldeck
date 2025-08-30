import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Show {
  id: number;
  title: string;
  poster_url: string;
  synopsis: string;
}

export function useShow(id: number | null) {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    if (!id) return;

    const fetchShowById = async () => {
      // Traer show por id
      const { data, error } = await supabase
        .from('shows')
        .select("id, title, poster_url, synopsis")
        .eq("id", id)
        .single();

      if (error) console.log('Error al traer géneros:', error);
      else {
        setShow(data);
      }

      setLoading(false);
    };

    fetchShowById();
  }, []);

  return { show, loading };
}
