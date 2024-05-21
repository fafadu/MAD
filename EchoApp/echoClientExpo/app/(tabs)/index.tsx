import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';


import { Platform } from 'react-native';

const server =
  Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";
const port = 3000;

export const fetchWelcomePage = async () => {
  try {
    const url = `${server}:${port}`;
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Error fetching welcome page", error);
    return { title: "Error", message: "failed to fetch welcome page." };
  }
};


export default function App() {
  const [content, setContent] = useState({ title: "Unknown", message: "N/A" });

  useEffect(() => {
    const fetchPage = async () => {
      const res = await fetchWelcomePage();
      setContent(res);
    };
    fetchPage();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Title: {content.title}</Text>
      <Text>Message: {content.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
