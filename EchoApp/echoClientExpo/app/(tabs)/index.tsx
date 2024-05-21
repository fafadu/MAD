import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleEcho = async () => {
    try {
      const url = `http://10.0.2.2:3000/echo?msg=${message}`;
      const res = await fetch(url);
      const data = await res.json();
      setResponse(`Status: ${data.status}, Message: ${data.message}`);
    } catch (error) {
      setResponse('Error: Could not connect to server');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Echo Client</Text>
      <Text style={styles.description}>
        Enter a message below and press "Echo" to send it to the Echo Server.
      </Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your message here"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Echo" onPress={handleEcho} />
      {response ? <Text style={styles.response}>{response}</Text> : null}
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
  response: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
