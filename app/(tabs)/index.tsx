import { Image, StyleSheet, View, Text, FlatList, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState} from "react"
import axios from "axios"

interface ICharacter{
  id:number;
  name: string;
  status: string;
  image: string;
}

export default function HomeScreen() {
  const [characters, setCharaters] = useState<ICharacter[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<string>("1")

  const getCharacters = async(pageNumber: string) => {
    try{
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
      setCharaters(response.data.results);
    }catch(error){
      console.log("Erro: " + error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() =>{
    getCharacters(page)
  }, [])

  const renderCharacter = ({item}: {item: ICharacter}) => (
    <View style={styles.card}>
      <Image source={{uri:item.image}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  )

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large"color="#00ff00" />
      </View>
    )
  }

  return (
   <>
    <View style={{flex: 1}}>
      <View style={styles.inputContainer}>
        <Text>1/42 - </Text>
        <TextInput style={styles.input} value={page} onChangeText={(text) => setPage(text)} keyboardType='numeric' placeholder='Digite o numero da página'/>
        <TouchableOpacity style={styles.button} onPress={() => getCharacters(page)}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={characters} keyExtractor={(item) => item.id.toString()} renderItem={renderCharacter} contentContainerStyle={styles.list}/>
    </View>
   </>
  );
}

const justifyAlign = {
  fontSize: 20,
  fontWeight: 400,
  textAlign: "center"
};

const styles = StyleSheet.create({
  card:{
    flexDirection: "row",
    backgroundColor: "#C68282FF",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2, //android
    shadowColor: "#000000", //ios
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8
  },
  loader: {
    ...justifyAlign,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  status: {
    fontSize: 20,
    color: "#c6c6c6"
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f0f0f0"
  }, 
  input: {
    flex: 1,
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8
  },
  list:{
    padding: 16
  },
  button: {
   ...justifyAlign,
    backgroundColor: "#b0b0ff",
    padding:10,
    borderRadius: 5
  }
});
