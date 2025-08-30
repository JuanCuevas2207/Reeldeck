import React from 'react';
import { ScrollView, Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useGenres } from '../src/hooks/useGenres';

export default function Home() {
  const router = useRouter();
  const { genres, loading } = useGenres();

  if (loading) return <Text style={styles.loading}>Cargando...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🎬 ReelDeck</Text>
      </View>

      {/* Géneros con shows */}
      {genres.map((genre) => (
        <View key={genre.id} style={{ marginBottom: 30 }}>
          <Text style={styles.genreTitle}>{genre.name}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {genre.shows.map((show) => (
              <TouchableOpacity
                key={show.id}
                onPress={() => router.push(`/details?id=${show.id}`)}
              >
                <Image
                  source={{ uri: show.poster_url }}
                  style={styles.poster}
                />
                <Text style={styles.showTitle}>{show.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  contentContainer: { paddingBottom: 20 },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#000',
  },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#E50914' },
  genreTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginLeft: 10, marginBottom: 10 },
  poster: { width: 120, height: 180, marginHorizontal: 10, borderRadius: 8 },
  loading: { color: '#fff', marginTop: 50, textAlign: 'center' },
  showTitle: {
  color: '#fff',
  fontSize: 12,
  marginTop: 5,
  width: 120, 
  textAlign: 'center',
},
});
