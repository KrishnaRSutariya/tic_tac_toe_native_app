import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'

const Circle = require("../assets/Circle.png")
const Cross = require("../assets/Cross.png")

const { height } = Dimensions.get('window');

interface TicTacToeInterface {
  id: number;
  user: 'user-1' | 'user-2' | null;
}

interface WinnerInterface {
  user: 'user-1' | 'user-2';
  class: keyof typeof styles
}

interface WinnerIdsInterface {
  value: Array<number>;
  class: keyof typeof styles
}

const initialValue: TicTacToeInterface[] = [
  { id: 1, user: null },
  { id: 2, user: null },
  { id: 3, user: null },
  { id: 4, user: null },
  { id: 5, user: null },
  { id: 6, user: null },
  { id: 7, user: null },
  { id: 8, user: null },
  { id: 9, user: null },
];

const WinnerIds: WinnerIdsInterface[] = [
  {
    value: [1, 2, 3],
    class: "won_condition_1"
  },
  {
    value: [4, 5, 6],
    class: "won_condition_2"
  },
  {
    value: [7, 8, 9],
    class: "won_condition_3"
  },
  {
    value: [1, 4, 7],
    class: "won_condition_4"
  },
  {
    value: [2, 5, 8],
    class: "won_condition_5"
  },
  {
    value: [3, 6, 9],
    class: "won_condition_6"
  },
  {
    value: [1, 5, 9],
    class: "won_condition_7"
  },
  {
    value: [3, 5, 7],
    class: "won_condition_8"
  },
]

const TicTacToe = () => {

  const [isCircle, setCircle] = React.useState<boolean>(true);
  const [ticTacToe, setTicTacToe] = React.useState<TicTacToeInterface[]>(initialValue);
  const [winner, setWinner] = React.useState<WinnerInterface | null>(null);

  const getImageBasedOnUser = (user: TicTacToeInterface['user']) => {
    return user === 'user-1' ? Circle : user === 'user-2' ? Cross : null;
  }

  const handleReset = () => {
    setCircle(true);
    setWinner(null);
    setTicTacToe(initialValue);
  }

  const handleTTTEvent = (id: number) => {

    if (winner) return;

    const updatedTicTacToe = ticTacToe.map((item): TicTacToeInterface => {
      if (item.id === id && !item.user) {
        setCircle(!isCircle);
        return { ...item, user: isCircle ? 'user-1' : 'user-2' };
      }
      return item;
    });

    const canWinner = WinnerIds.find(item => ['user-1', 'user-2'].find(user => item.value.every(id => updatedTicTacToe[id - 1].user === user)));
    if (canWinner) setWinner({ user: isCircle ? 'user-1' : 'user-2', class: canWinner.class });

    setTicTacToe(updatedTicTacToe);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Tic Tac Toe</Text>
      <View style={styles.mainBox}>
        <Text style={styles.previewScreen} numberOfLines={1}>
          {
            winner ? (`Winner: ${`${winner?.user}`.toUpperCase()}`) : (ticTacToe.find(({ user }) => user) ? ticTacToe.every(({ user }) => user) ? "Draw Game" : `Turn: ${isCircle ? 'Circle' : 'Cross'}` : 'Start New Game')
          }
        </Text>
        <View style={styles.box}>
          {
            ticTacToe.map((item: TicTacToeInterface) => {
              return (
                <View style={styles.subBox} key={item.id}>
                  <TouchableOpacity style={styles.boxTouchEvent} onPress={() => handleTTTEvent(item.id)}>
                    <Image source={getImageBasedOnUser(item.user)} style={styles.image} />
                  </TouchableOpacity>
                </View>
              )
            })
          }
          {winner && (<View style={[styles.strikeLine, styles[winner.class] as ViewStyle]}></View>)}
        </View>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton} numberOfLines={1}>Start new game</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default TicTacToe

const styles = StyleSheet.create({
  container: {
    height: height - 40,
    backgroundColor: '#6c5ce7',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  mainBox: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 5,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  subBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderWidth: 5,
    borderRadius: 10,
  },
  boxTouchEvent: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewScreen: {
    width: '100%',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#00b894',
    padding: 10,
    borderRadius: 5,
  },
  resetButton: {
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#e17055',
    padding: 10,
    borderRadius: 5,
  },
  strikeLine: {
    position: 'absolute',
    width: '100%',
    height: 5,
    backgroundColor: 'red',
    borderRadius: 5
  },
  won_condition_1: {
    top: 47,
    left: 0,
  },
  won_condition_2: {
    top: 157,
    left: 0,
  },
  won_condition_3: {
    top: 267,
    left: 0,
  },
  won_condition_4: {
    top: '49%',
    left: '-35%',
    transform: [{ rotate: '90deg' }]
  },
  won_condition_5: {
    top: '49%',
    left: '0%',
    transform: [{ rotate: '90deg' }]
  },
  won_condition_6: {
    top: '49%',
    left: '35%',
    transform: [{ rotate: '90deg' }]
  },
  won_condition_7: {
    top: '49%',
    left: '0%',
    transform: [{ rotate: '45deg' }]
  },
  won_condition_8: {
    top: '49%',
    left: '0%',
    transform: [{ rotate: '-45deg' }]
  }
})