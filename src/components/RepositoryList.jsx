import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../components/RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('CREATED_AT');
  const { repositories } = useRepositories(selectedSort);
  let navigate = useNavigate();

  return <RepositoryListContainer repositories={repositories} navigate={navigate} setSelectedSort={setSelectedSort} selectedSort={selectedSort} />;
};


export const RepositoryListContainer = ({ repositories, navigate, setSelectedSort, selectedSort }) => {
  
  const openSingleRepository = (id) => {
    navigate(`/repository/${id}`)
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        renderItem={( {item} ) => (
          <Pressable onPress={() => { openSingleRepository(item.id) }}>
            <RepositoryItem repository={item} showGitHub={false}/>
          </Pressable>
      )}
        ListHeaderComponent={() => <SortPicker setSelectedSort={setSelectedSort} selectedSort={selectedSort} /> }
      />
    );
};

const SortPicker = ({ setSelectedSort, selectedSort }) => {
  return (
    <Picker
    selectedValue={selectedSort}
    onValueChange={(itemValue) =>
      setSelectedSort(itemValue)
    }>
    <Picker.Item label='Latest repositories' value='CREATED_AT' />
    <Picker.Item label='Highest rated repositories' value='DESC' />
    <Picker.Item label='Lowest rated repositories' value='ASC' />
  </Picker>
  )
}

export default RepositoryList;