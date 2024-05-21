import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [echoMessage, setEchoMessage] = useState('');

  const handleEcho = async () => {
    try {
      const url = `http://10.0.2.2:3000/echo?msg=${encodeURIComponent(message)}`;
      const res = await fetch(url);
      const data = await res.json();
      setStatus(`Status: ${data.status}`);
      setEchoMessage(data.message);
    } catch (error) {
      setStatus('Error: Could not connect to server');
      setEchoMessage('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Echo Client</Text>
      <Text style={styles.description}>
        Enter a message below to Echo Server.
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Please enter message..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Echo!" onPress={handleEcho} />
      {status ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{status}</Text>
          <Text style={styles.responseText}>{echoMessage}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  responseContainer: {
    marginTop: 20,
  },
  responseText: {
    fontSize: 18,
    textAlign: 'left',
  },
});
