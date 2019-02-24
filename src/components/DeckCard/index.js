// Basic
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// UI
import Icon from 'react-native-vector-icons/AntDesign';

export default DeckCard = (props) => {
  // @methods
  goToScreen = (name, params) => {
    props.navigation.navigate(name, params)
  }

  return (
    <TouchableHighlight onPress={() => this.goToScreen('ShowCard', { 'deck': props.deck })}>
      <View elevation={5} style={styles.deckItem}>
        <View>
          <Text style={styles.text}>{props.deck.title}{"\n"}</Text>
          <Text>{props.deck.cards.length} cards</Text>
        </View>
        <View>
          <Text>
            <Icon name="rightcircle" style={styles.icon} />
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  deckItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4388D6',
    borderRadius: 5,
    padding: 13,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    marginBottom: 10,
  },
  text: {
    color: '#fff'
  },
  icon: {
    color: '#fff',
    fontSize: 24,
  }
})