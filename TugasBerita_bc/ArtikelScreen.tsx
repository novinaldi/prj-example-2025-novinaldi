import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-native-elements';
import Icon from '@react-native-vector-icons/ionicons';

export default function ArtikelScreen() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  const fetchTopHeadlines = async () => {
    const apiKey = '91443c2b23a84acdb13a2ae155c70c9a';
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setNewsData(data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : newsData.length > 0 ? (
        newsData.map(row => (
          <Card key={row.url} containerStyle={styles.card}>
            <Card.Title>{row.title}</Card.Title>
            <Card.Divider />
            {row.urlToImage && <Card.Image source={{ uri: row.urlToImage }} />}
            <Text style={styles.description}>{row.description}</Text>
            <Button
              title="Read More"
              buttonStyle={styles.button}
              onPress={() => Linking.openURL(row.url)}
              icon={<Icon name="caret-forward" size={20} color="white" />}
            />
          </Card>
        ))
      ) : (
        <Text>No news available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 5,
  },
  card: {
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2596be',
    borderRadius: 20,
    paddingVertical: 12,
  },
});
