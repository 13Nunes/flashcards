// Basic
import React from "react";
import { connect } from 'react-redux';

// UI
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  Divider,
  Avatar,
  Button,
  ListItem
} from 'react-native-elements';

// Services
import { setLocalNotification, clearLocalNotification } from '../../services/notification';

// Storage / Redux
import { handleRemoveDeck, handleRemoveCard } from '../../store/actions/decks';

class ShowCard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center'
    },
    headerLeft: () => (
      <AntDesign
        name={"arrowleft"}
        onPress={() => {
          navigation.navigate('Home');
        }}
        size={32}
        color="#FFFFFF"
        style={{ marginLeft: 16 }}
      />
    ),
    headerRight: <View></View>
  })

  // @methods
  goToScreen = (name, params) => {
    this.props.navigation.navigate(name, params);
  }
  deleteDeck = (deckId) => {
    // Remove deck
    this.props.dispatch(handleRemoveDeck(deckId));

    // Go to home
    this.props.navigation.navigate('Home');
  }
  deleteCard = (cardId) => {
    const deck = this.props.navigation.getParam('deck');
    this.props.dispatch(handleRemoveCard(deck.id, cardId));
  }
  startQuiz = (deckId) => {
    // Clear current notification and schedule next
    clearLocalNotification().then(setLocalNotification);

    // Go to quiz scren
    this.props.navigation.navigate('Quiz', { deckId });
  }
  keyExtractor = (item, index) => item.question;
  renderItem = ({ item }) => (
    <ListItem
      title="Question"
      subtitle={item.question}
      bottomDivider={true}
      rightElement={
        <View>
          <Icon name="closecircle" style={{ color: '#CC2218', fontSize: 18 }} onPress={() => this.deleteCard(item.id)} />
        </View>
      }
    />
  )

  render() {
    const deck = this.props.navigation.getParam('deck');
    const { decks } = this.props;

    if (!decks.list[deck.id]) return (
      <Text>Waiting...</Text>
    );

    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <View style={styles.toolbarTitle}>
            <Avatar rounded size="large" overlayContainerStyle={{ backgroundColor: '#4388D6' }} icon={{ name: 'cards', type: 'material-community' }} />
            <View style={{ marginLeft: 20, }}>
              <Text style={{ fontSize: 25 }}>{deck.title}</Text>
              <Text>{decks.list[deck.id].cards.length} cards</Text>
            </View>
          </View>
          <Divider style={{ backgroundColor: 'blue' }} />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button title="Delete deck" buttonStyle={{ backgroundColor: '#CC2218' }} onPress={() => this.deleteDeck(deck.id)}></Button>
            {decks.list[deck.id].cards.length > 0 && (
              <Button title="Quiz" buttonStyle={{ backgroundColor: '#1D9C73' }} onPress={() => this.startQuiz(deck.id)}></Button>
            )}
            <Button title="Add card" onPress={() => this.goToScreen('AddCard', { deck })}></Button>
          </View>
        </View>
        <View style={styles.cardlist}>
          {(decks.loading === false && decks.list[deck.id].cards.length === 0) && (
            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#4388D6' }}>No cards founded.</Text>
            </View>
          )}
          {(decks.loading === false) && (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={decks.list[deck.id].cards}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    )
  }
}

const { deviceWidth, deviceHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0F1',
    width: deviceWidth,
    height: deviceHeight,
  },
  toolbar: {
    flex: 0.35,
    backgroundColor: '#FFFFFF',
    padding: 5,
    height: 50,
  },
  toolbarTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 30
  },
  buttonDelete: {
    backgroundColor: '#FF0000'
  },
  cardlist: {
    flex: 0.65,
    backgroundColor: '#FFFFFF',
    padding: 5,
    margin: 10,
    justifyContent: 'flex-start'
  }
});

function mapStateToProps({ decks }, props) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(ShowCard);