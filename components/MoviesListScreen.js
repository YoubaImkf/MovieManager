import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const MoviesListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      // retrieve the movies from AsyncStorage
      const savedMovies = await AsyncStorage.getItem('movies');
      // parse the JSON string back into a JavaScript object
      const movies = savedMovies ? JSON.parse(savedMovies) : [];
      // add the movies
      setMovies(movies);
    } catch (error) {
      console.log('Error getting movies: ', error);
    }
  };

  // This code uses the useEffect hook to register a listener that 
  // will trigger the getMovies function when the screen comes into focus.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMovies();
    });
    return unsubscribe;
  }, [navigation]);


  const sortByName = () => {
    setMovies([...movies].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortByDate = () => {
    setMovies([...movies].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };


  const confirmDeleteMovie = (movie) => {
    Alert.alert(
      'Delete Movie',
      `Are you sure you want to delete ${movie.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMovie(movie),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteMovie = async (index) => {
    try {
      const newMovies = [...movies]; // the three dots ('...'), to create a new array containing all the elements of the 'movies' array
      newMovies.splice(index, 1);
      await AsyncStorage.setItem('movies', newMovies);
      setMovies(newMovies);
    } catch (error) {
      console.log('Error deleting movie: ', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`Name: ${item.name}`}</Text>
        <Text style={styles.author}>{`Author: ${item.author}`}</Text>
        <Text style={styles.date}>{`Date: ${item.date}`}</Text>
        <Text style={styles.note}>{`Note: ${item.note}`}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteMovie(index)}>
        <Icon name="remove-circle-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={sortByName} accessibilityLabel="Sort by name">
          <Text style={styles.filterButtonText}>Sort by name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={sortByDate} accessibilityLabel="Sort by date">
          <Text style={styles.filterButtonText}>Sort by date</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No movies found.</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //filter
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f7f7f7',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#7286D3',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    SortButton: {
        padding: 10,
        textDecorationLine: 'underline',
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#dcdcdc',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    author: {
      fontSize: 14,
      marginBottom: 5,
    },
    date: {
      fontSize: 12,
      color: '#808080',
      marginBottom: 5,
    },
    note: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#2ecc71',
    },
    deleteButton: {
      padding: 5,
    },
});


export default MoviesListScreen;