// Basic
import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {
  Button,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import QuizCard from '../../components/QuizCard';

class Quiz extends Component {
  // @states
  state = {
    cardIndex: 0,
    score: 0,
    toggleCardQuestionSide: true,
    isLastQuestion: false,
  }

  // @methods
  handleToggleCardSide = () => {
    this.setState((preState) => ({
      toggleCardQuestionSide: !preState.toggleCardQuestionSide
    }))
  }
  handleChooseAnswer = (isCorrect) => {
    const { cardIndex } = this.state;
    const { deck } = this.props;
    if (cardIndex + 1 === deck.cards.length) {
      this.setState((preState) => ({
        isLastQuestion: true,
        score: isCorrect ? preState.score + 1 : preState.score,
      }))
    } else {
      this.setState((preState) => ({
        toggleCardQuestionSide: true,
        cardIndex: preState.cardIndex + 1,
        score: isCorrect ? preState.score + 1 : preState.score,
      }))
    }
  }
  handleRestartQuiz = () => {
    this.setState({
      toggleCardQuestionSide: true,
      isLastQuestion: false,
      cardIndex: 0,
      score: 0,
    })
  }

  render() {
    const { toggleCardQuestionSide, isLastQuestion, cardIndex, score } = this.state;
    const { deck, navigation } = this.props;
    const { cards } = deck;
    const scoreTotal = (score / cards.length * 100).toFixed(0);

    return (
      <View>
        {!isLastQuestion
          ? (
            <View>
              <View style={{ marginTop: 10, marginLeft: 10, }}>
                <Text>{`${cardIndex + 1} / ${cards.length}`}</Text>
              </View>
              {toggleCardQuestionSide ?
                <QuizCard label={cards[cardIndex].question} cardSide={'Answer'} handleToggleCardSide={this.handleToggleCardSide} />
                :
                <QuizCard label={cards[cardIndex].answer} cardSide={'Question'} handleToggleCardSide={this.handleToggleCardSide} />
              }
              <View style={styles.buttonsBar}>
                <Button title=" Incorrect" icon={
                  <Icon
                    name="times-circle"
                    size={15}
                    color="white"
                  />
                } buttonStyle={{ backgroundColor: '#CC2218', width: 120 }} onPress={() => this.handleChooseAnswer(false)}></Button>
                <Button title=" Correct" icon={
                  <Icon
                    name="check-circle"
                    size={15}
                    color="white"
                  />
                } buttonStyle={{ backgroundColor: '#1D9C73', width: 120 }} onPress={() => this.handleChooseAnswer(true)}></Button>
              </View>
            </View>
          )
          : (
            <View style={styles.container}>
              <Text style={styles.scoreValue}>{scoreTotal}%</Text>
              {scoreTotal < 33 && (
                <Text style={styles.scoreMessage}>Oh! Man!</Text>
              )}
              {(scoreTotal >= 33 && scoreTotal < 70) && (
                <Text style={styles.scoreMessage}>Almost there!</Text>
              )}
              {(scoreTotal >= 70) && (
                <Text style={styles.scoreMessage}>Yes! You are awesome!</Text>
              )}
              <Button title=" Restart Quiz" icon={
                <Icon
                  name="exchange"
                  size={20}
                  color="white"
                />
              } buttonStyle={{ width: 120 }} onPress={this.handleRestartQuiz}></Button>
              <TouchableOpacity style={{ backgroundColor: '#FFFFFF', marginTop: 40 }} onPress={() => navigation.navigate('ShowCard', { deck })}>
                <Text style={styles.btnBackText}>Back to deck</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    )
  }
}

const { deviceWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: deviceWidth - 20,
    marginLeft: 10,
    marginRight: 10,
  },
  btnBack: {
    backgroundColor: '#FFFFFF',
  },
  btnBackText: {
    color: '#2289DC',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  scoreValue: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 70,
    color: '#000000'
  },
  scoreMessage: {
    marginBottom: 40,
    fontSize: 25,
    color: '#2289DC',
  }
})

function mapStateToProps({ decks }, props) {
  const deckId = props.navigation.getParam('deckId');
  return {
    deck: decks.list[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)