import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalSelector from 'react-native-modal-selector';
import MoviesListScreen from './MoviesListScreen';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const generateNotes = () => {
    const notes = [];
    for (let i = 0; i <= 20; i++) {
      notes.push(i);
    }
    return notes;
  };
  
  const addMovie = async () => {
    const movie = { name, author, date, note };
    try {
      const savedMovies = await AsyncStorage.getItem('movies');
      const movies = savedMovies ? JSON.parse(savedMovies) : [];
      movies.push(movie);
      await AsyncStorage.setItem('movies', movies);
      navigation.navigate('MoviesList'); // Navigate to MoviesListScreen

      ToastAndroid.show('Movie '+ movie.name +' added successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error adding movie: ', error);
    }
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>Add your movie !</Text>
      <TextInput 
        style={styles.TextInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <ModalSelector
        data={generateNotes().map(note => ({ key: note, label: note }))}
        initValue="Select a note"
        onChange={(option) => setNote(option.label)}
      >
        <TextInput
          style={styles.TextInput}
          editable={false}
          placeholder="Click to select a note "
          value={note.toString()}
        />
        
      </ModalSelector>
      <TouchableOpacity
        onPress={addMovie}
        style={styles.Button}
      >
        <Text style={{ color: 'white' }}>Add movie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
         justifyContent: 'center' 
    },
    TextInput: {
        width: 250 ,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#afafaf',
        padding: 10,
        marginBottom: 10,
        color: '#7286D3'
    },
    Button:{
        backgroundColor: '#8EA7E9',
        padding: 10,
        borderRadius: 5 
    },
    Title:{
        color: '#676FA3',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform:'uppercase'
    },
    
});

export default RegistrationScreen;
