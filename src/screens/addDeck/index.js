// Basic
import React from "react";
import { connect } from 'react-redux';

// UI
import { StyleSheet, View } from 'react-native';
import {
  Input,
  Button
} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';

// Storage / Redux
import { handleAddDeck } from '../../store/actions/decks';

class AddDeck extends React.Component {
  // @navOptions
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Deck',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center'
    },
    headerLeft: () => (
      <AntDesign
        name={"close"}
        onPress={() => {
          navigation.goBack()
        }}
        size={32}
        color="#FFFFFF"
        style={{ marginLeft: 16 }}
      />
    ),
    headerRight: <View></View>
  })

  // @states
  state = {
    deckTitle: '',
    errorMessage: '',
  }

  // @methods
  submitDeck = () => {
    const { deckTitle } = this.state;
    if (deckTitle !== '') {
      this.props.dispatch(handleAddDeck(deckTitle))
        .then((deck) => {
          this.props.navigation.navigate('ShowCard', { deck });
        });
    } else {
      this.setState({
        errorMessage: 'Enter a valid deck title.',
      });
    }
  }
  handleDeckTitleChange = (input) => {
    this.setState({
      deckTitle: input,
      errorMessage: ''
    });
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <View style={styles.container}>
        <Input placeholder='Enter deck name' shake={true} onChangeText={this.handleDeckTitleChange}
          errorMessage={errorMessage} errorStyle={{ color: 'red' }} />
        <View style={styles.spacing}>
          <Button title="Create Deck" onPress={() => this.submitDeck()}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacing: {
    marginTop: 30
  }
});

export default connect()(AddDeck);