import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const QuizCard = ({ label, cardSide, handleToggleCardSide }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleToggleCardSide}>
        <Text style={styles.cardSide}>Show {cardSide}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350
  },
  label: {
    fontSize: 50,
    marginTop: 30,
    marginBottom: 30,
    color: '#2289DC',
  },
  cardSide: {
    fontSize: 20,
    color: '#9A9A9A',
    fontWeight: '500',
    textDecorationLine: 'underline',
  }
})

export default QuizCard