// Basic
import React from "react";
import { connect } from 'react-redux';

// UI
import { StyleSheet, View } from 'react-native';
import {
  Input,
  Button,
} from 'react-native-elements';
import AntDesign from '@expo/vector-icons/AntDesign';

// Storage / Redux
import { handleAddCard } from '../../store/actions/decks';

class AddCard extends React.Component {
  // @navOptions
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card',
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
    question: '',
    answer: '',
    questionErrorMessage: '',
    answerErrorMessage: '',
  }

  // @methods
  submitCard = () => {
    const { question, answer } = this.state;
    const deck = this.props.navigation.getParam('deck');

    if (question === '') {
      this.setState({
        questionErrorMessage: 'Enter a valid question.',
      });
      return;
    }
    if (answer === '') {
      this.setState({
        answerErrorMessage: 'Enter a valid answer.',
      });
      return;
    }

    // Add Card
    this.props.dispatch(handleAddCard(deck, { question, answer }));

    // Redirect
    this.props.navigation.navigate('ShowCard', { deck });
  }
  handleQuestionChange = (input) => {
    this.setState({
      question: input,
      questionErrorMessage: ''
    });
  }
  handleAnswerChange = (input) => {
    this.setState({
      answer: input,
      answerErrorMessage: ''
    });
  }

  render() {
    const { questionErrorMessage, answerErrorMessage } = this.state;

    return (
      <View style={styles.container}>
        <Input placeholder='Enter question' shake={true} onChangeText={this.handleQuestionChange}
          errorMessage={questionErrorMessage} errorStyle={{ color: 'red' }} />
        <Input placeholder='Enter answer' shake={true} onChangeText={this.handleAnswerChange}
          errorMessage={answerErrorMessage} errorStyle={{ color: 'red' }} />
        <View style={styles.spacing}>
          <Button title="Create card" onPress={() => this.submitCard()}></Button>
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

export default connect()(AddCard);