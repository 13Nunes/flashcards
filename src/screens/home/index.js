// Basic
import React from "react";
import { connect } from 'react-redux';

// UI
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import DeckCard from '../../components/DeckCard';

// Storage / Redux
import { handleGetDecks } from '../../store/actions/decks';

class Home extends React.Component {
  // @headerConfig
  static navigationOptions = {
    header: null,
  }

  // @lifecycle
  componentDidMount() {
    this.props.dispatch(handleGetDecks());
  }
  componentDidUpdate(prevProps) {
    const { decks } = this.props;
    if (decks.loading === false && (decks.list.length !== prevProps.decks.list.length)) {
      this.forceUpdate();
    }
  }

  // @methods
  goToScreen = name => {
    const { navigation } = this.props
    navigation.navigate(name)
  }
  listDecks = () => {
    const { navigation, decks } = this.props;

    if (Object.keys(decks.list).length > 0) {
      return Object.keys(decks.list).map(key => {
        return (
          <DeckCard deck={decks.list[key]} key={key} navigation={navigation} />
        )
      })
    } else {
      return (
        <Text style={styles.text}>No deck was added yet!</Text>
      )
    }
  }

  render() {
    const { decks } = this.props;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>FLASHCARD</Text>
            <Text style={styles.text}>Choose a deck</Text>
          </View>
          <ScrollView style={styles.listing}>
            {decks.loading === true && (
              <Text>Loading...</Text>
            )}
            {decks.loading === false && (
              this.listDecks()
            )}
            {(decks.loading === false && Object.keys(decks.list).length === 0) && (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#4388D6' }}>No decks founded.</Text>
              </View>
            )}
          </ScrollView>
          <ActionButton buttonColor="#000000">
            <ActionButton.Item buttonColor='#000000' title="Add Deck" onPress={() => this.goToScreen('AddDeck')}>
              <Icon name="library-add" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </>
    )
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 80,
    paddingBottom: 20,
    width: width,
    height: 90,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  listing: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: width,
    height: (height * 65) / 100,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

function mapStateToProps({ decks }, props) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(Home);