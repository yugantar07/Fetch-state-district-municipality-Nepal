import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DistrictScreen = ({navigation, route}) => {
  const {state} = route.params;
  console.log(state);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getDistrict(state);
  }, [state]);

  const getDistrict = state => {
    const URL =
      'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const sameDistrict = new Set();
        const uniqueDistrict = data.data.filter(item => {
          console.log(item);
          if (item.state === state && !sameDistrict.has(item.district)) {
            sameDistrict.add(item.district);
            return true; // Unique district for the selected state
          }
          return false;
        });

        setDistricts(uniqueDistrict);
        console.log(uniqueDistrict);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  };

  const navigateToMunicipality = selectedDistrict => {
    navigation.navigate('Municipality', {district: selectedDistrict});
  };

  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
          Districts
        </Text>
      </View>
      <FlatList
        data={districts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigateToMunicipality(item.district)}>
            <View style={styles.card}>
              <Text style={{fontSize: 18}}>{item.district}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DistrictScreen;

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
});
