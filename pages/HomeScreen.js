import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [all, setAll] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [errorTrending, setErrorTrending] = useState(null);
  const [errorAll, setErrorAll] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await fetch('https://api.jikan.moe/v4/top/anime');
        if (trendingResponse.ok) {
          const trendingData = await trendingResponse.json();
          setTrending(trendingData.data);
          setLoadingTrending(false);
        } else {
          setErrorTrending('Failed to fetch data');
          setLoadingTrending(false);
        }

        const allResponse = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
        if (allResponse.ok) {
          const allData = await allResponse.json();
          setAll(allData.data);
          setLoadingAll(false);
        } else {
          setErrorAll('Failed to fetch data');
          setLoadingAll(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 10,
          marginTop: 40,
          marginBottom: 10,
        }}>
          Daftar Anime Kelompok 23:
        </Text>
      <View>
        <Text style={{
          fontSize: 35,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 10,
          marginTop: 40,
          marginBottom: 10,
        }}>
          Trending
        </Text>
      </View>
      {loadingTrending ? (
        <ActivityIndicator />
      ) : errorTrending ? (
        <Text>Something went wrong :(</Text>
      ) : (
        <ScrollView horizontal={true}>
          {trending.map((trend) => (
            <View style={{ width: 120, margin: 10 }} key={trend.malId}>
              <Image source={{ uri: trend.images.jpg.image_url }} style={{ height: 150 }} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 5,
                  marginBottom: 75,
                  textAlign: 'center',
                }}
                numberOfLines={2}
              >
                {trend.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View>
        <Text style={{
          fontSize: 35,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 10
        }}>
          All Anime
        </Text>
      </View>

      {loadingAll ? (
        <ActivityIndicator />
      ) : errorAll ? (
        <Text>Something went wrong :(</Text>
      ) : (
        <FlatList
          data={all}
          keyExtractor={(item) => (item.malId ? `${item.malId}_${item.title}` : '')}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'top', margin: 10 }} key={item.malId}>
              <Image source={{ uri: item.images.jpg.image_url }} style={{ height: 150, width: 100 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <Text>Score: {item.score}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default HomeScreen;
