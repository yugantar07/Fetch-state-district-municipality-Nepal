import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const StateScreen = ({navigation}) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    getStates();
  }, []);

  const getStates = () => {
    const URL =
      'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const sameState = new Set();
        const uniqueState = data.data.filter(item => {
          if (sameState.has(item.state)) {
            return false; // Duplicate state, filter out
          } else {
            sameState.add(item.state);
            return true; // Unique state, keep it
          }
        });

        setStates(uniqueState);
        console.log(uniqueState);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  };

  const navigateToDistricts = selectedState => {
    navigation.navigate('District', {state: selectedState});
  };

  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
          States
        </Text>
      </View>
      <FlatList
        data={states}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigateToDistricts(item.state)}>
            <View style={styles.card}>
              <Text style={styles.txt}>{item.state}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default StateScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  txt: {
    fontSize: 18,
  },
});
