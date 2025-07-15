import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, FlatList } from 'react-native';

export default function App() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [bestScore, setBestScore] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
    setFeedback('Guess a number between 1 and 100');
    setShowCongrats(false);
    setGuessHistory([]);
    if (inputRef.current) inputRef.current.clear();
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    let thisFeedback = '';
    if (isNaN(num)) {
      thisFeedback = '❌ Please enter a valid number';
      setFeedback(thisFeedback);
      setGuessHistory(h => [{ guess, feedback: thisFeedback }, ...h]);
      return;
    }
    setAttempts(a => a + 1);
    if (num === target) {
      thisFeedback = '🎉 Correct! Well done!';
      setFeedback(thisFeedback);
      setShowCongrats(true);
      setGuessHistory(h => [{ guess: num, feedback: thisFeedback }, ...h]);
      if (bestScore === null || attempts + 1 < bestScore) {
        setBestScore(attempts + 1);
      }
      setGuess('');
      if (inputRef.current) inputRef.current.clear();
      Keyboard.dismiss();
    } else if (num < target) {
      thisFeedback = '⬆️ Too low!';
      setFeedback(thisFeedback);
      setGuessHistory(h => [{ guess: num, feedback: thisFeedback }, ...h]);
      setGuess('');
      if (inputRef.current) inputRef.current.clear();
    } else {
      thisFeedback = '⬇️ Too high!';
      setFeedback(thisFeedback);
      setGuessHistory(h => [{ guess: num, feedback: thisFeedback }, ...h]);
      setGuess('');
      if (inputRef.current) inputRef.current.clear();
    }
    Keyboard.dismiss();
  };

  const isGuessDisabled = !guess || showCongrats;

  const renderGuessItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyGuess}>{item.guess}</Text>
      <Text style={[
        styles.historyFeedback,
        item.feedback.includes('Correct') ? styles.historyCorrect :
        item.feedback.includes('low') ? styles.historyLow : styles.historyHigh
      ]}>
        {item.feedback}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number!</Text>
      <View style={styles.card}>
        <Text style={[styles.feedback, showCongrats && styles.feedbackWin]}>{feedback}</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          keyboardType="numeric"
          value={guess}
          onChangeText={setGuess}
          placeholder="Your guess"
          placeholderTextColor="#888"
          editable={!showCongrats}
          returnKeyType="done"
          onSubmitEditing={handleGuess}
        />
        <TouchableOpacity
          style={[styles.button, isGuessDisabled && styles.buttonDisabled]}
          onPress={handleGuess}
          disabled={isGuessDisabled}
        >
          <Text style={styles.buttonText}>{showCongrats ? '🎉' : 'Guess'}</Text>
        </TouchableOpacity>
        <View style={styles.counter}>
          <Text style={styles.attemptsLabel}>Attempts: </Text>
          <Text style={styles.counterText}>{attempts}</Text>
        </View>
        {bestScore !== null && (
          <View style={styles.bestScoreBox}>
            <Text style={styles.bestScoreText}>🏆 Best Score: {bestScore} attempts</Text>
          </View>
        )}
      </View>
      <View style={styles.historyBox}>
        <Text style={styles.historyTitle}>Guess History</Text>
        <FlatList
          data={guessHistory}
          renderItem={renderGuessItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
          style={{ maxHeight: 180 }}
        />
      </View>
      {showCongrats && (
        <>
          <Text style={styles.winText}>🎉 You guessed it in {attempts} attempts!</Text>
          <TouchableOpacity onPress={resetGame} style={styles.resetBtn}>
            <Text style={styles.resetText}>Play Again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#121212', alignItems:'center', justifyContent:'flex-start', padding:20 },
  title: { fontSize:28, fontWeight:'bold', color:'#fff', marginTop: 40, marginBottom:10 },
  card: { width:'100%', padding:20, borderRadius:12, backgroundColor:'#1e1e1e', shadowColor:'#000', shadowOpacity:0.4, shadowRadius:10, marginBottom: 18 },
  feedback: { fontSize:18, color:'#ddd', marginBottom:15, textAlign:'center' },
  feedbackWin: { color:'#03dac5', fontWeight:'bold', fontSize: 20 },
  input: { fontSize:18, color:'#fff', backgroundColor:'#333', padding:10, borderRadius:8, marginBottom:15 },
  button: { backgroundColor:'#6200ee', padding:15, borderRadius:8, alignItems:'center' },
  buttonDisabled: { backgroundColor:'#444' },
  buttonText: { color:'#fff', fontSize:18, fontWeight:'600' },
  counter: { flexDirection:'row', marginTop:15, justifyContent:'center', alignItems:'center' },
  attemptsLabel: { color:'#aaa', marginRight:8 },
  counterText: { color:'#fff', fontSize:18, fontWeight:'bold' },
  bestScoreBox: { marginTop: 10, backgroundColor:'#222', borderRadius:8, padding:8, alignItems:'center' },
  bestScoreText: { color:'#ffd700', fontWeight:'bold', fontSize:16 },
  historyBox: { width:'100%', backgroundColor:'#181818', borderRadius:10, padding:10, marginTop:10, marginBottom:10 },
  historyTitle: { color:'#aaa', fontWeight:'bold', fontSize:16, marginBottom:5 },
  historyItem: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:4, borderBottomColor:'#222', borderBottomWidth:1 },
  historyGuess: { color:'#fff', fontSize:16 },
  historyFeedback: { fontSize:15, marginLeft:10 },
  historyCorrect: { color:'#03dac5', fontWeight:'bold' },
  historyLow: { color:'#ff9800' },
  historyHigh: { color:'#f44336' },
  winText: { color:'#03dac5', fontSize:22, fontWeight:'bold', marginTop: 10, textAlign:'center' },
  resetBtn: { marginTop:20, backgroundColor:'#03dac5', padding:12, borderRadius:8 },
  resetText: { color:'#000', fontSize:16, fontWeight:'600' }
});
