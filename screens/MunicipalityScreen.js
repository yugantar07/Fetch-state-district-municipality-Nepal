import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const MunicipalityScreen = ({route}) => {
  const {district} = route.params;
  console.log(district);
  const [municipality, setMunicipality] = useState([]);

  useEffect(() => {
    getDistrict(district);
  }, [district]);

  const getDistrict = district => {
    const URL =
      'https://lodbodqaapi.wolfmatrix.dev/public/administrative-divisions';
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const sameDistrict = new Set();
        const uniqueDistrict = data.data.filter(item => {
          console.log(item);
          if (
            item.district === district &&
            !sameDistrict.has(item.municipality)
          ) {
            sameDistrict.add(item.municipality);
            return true; // Unique municipality for the selected district
          }
          return false;
        });

        setMunicipality(uniqueDistrict);
        console.log(uniqueDistrict);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  };

  return (
    <View>
      <View>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
          Municipality
        </Text>
      </View>
      <FlatList
        data={municipality}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View style={styles.card}>
              <Text style={{fontSize: 18}}>{item.municipality}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MunicipalityScreen;

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
