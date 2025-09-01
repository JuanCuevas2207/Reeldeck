import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams  } from 'expo-router';
import { useShow } from "../src/hooks/useShow";


export default function Detail() {
  const router = useRouter();
  const { id } = useLocalSearchParams <{ id: string }>();
  const { show, loading } = useShow(id ? parseInt(id) : null);

  // Ejemplo de capítulos
  const chapters = [
    { id: 1, title: 'Capítulo 1: El principio' },
    { id: 2, title: 'Capítulo 2: La tormenta' },
    { id: 3, title: 'Capítulo 3: El fin' },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.push(`/`)} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      {/* Top Row: Poster + Info */}
      <View style={styles.topRow}>
        <Image source={{ uri: show?.poster_url }} style={styles.poster} />
        <View style={styles.info}>
          <Text style={styles.title}>{show?.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.badge}>HD</Text>
            <Text style={styles.metaText}>20XX</Text>
            <Text style={styles.metaText}>TV-MA</Text>
            <Text style={styles.metaText}>X Seasons</Text>
          </View>
          <Text style={styles.synopsis}>{show?.synopsis}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playText}>▶ Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Episodes */}
      <Text style={styles.episodesHeader}>Episodios</Text>
      {chapters.length === 0 ? (
        <Text style={styles.noEpisodes}>No episodes available</Text>
      ) : (
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.chapter}>{item.title}</Text>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 15 },
  backButton: { marginBottom: 15 },
  backText: { color: '#fff', fontSize: 16 },

  topRow: { flexDirection: 'row', marginBottom: 20 },
  poster: { width: 150, height: 225, borderRadius: 10, marginRight: 15 },
  info: { flex: 1 },

  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  badge: {
    backgroundColor: '#E50914',
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: 8,
    fontSize: 12,
  },
  metaText: { color: '#fff', marginRight: 8, fontSize: 12 },
  synopsis: { color: '#fff', fontSize: 14, marginBottom: 15 },

  buttons: { flexDirection: 'row', marginBottom: 10 },
  playButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  playText: { color: '#000', fontWeight: 'bold' },
  myListButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  myListText: { color: '#fff', fontWeight: 'bold' },

  episodesHeader: { color: '#fff', fontSize: 20, fontWeight: '600', marginBottom: 10 },
  noEpisodes: { color: '#fff', fontSize: 14, marginBottom: 10 },
  chapter: { color: '#fff', fontSize: 14, marginBottom: 5 },
});
