import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Show {
  id: number;
  name: string;
  poster: string;
}

interface CarouselProps {
  title: string;
  data: Show[];
  onPressShow: (show: Show) => void;
}

export default function Carousel({ title, data, onPressShow }: CarouselProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressShow(item)} style={styles.card}>
            <Image source={{ uri: item.poster }} style={styles.poster} />
            <Text style={styles.showTitle} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 5,
    color: '#fff',
  },
  card: {
    marginHorizontal: 5,
    width: 120,
  },
  poster: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  showTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
});