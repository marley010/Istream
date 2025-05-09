import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="screens/tabs/home"/>
        <Stack.Screen name="screens/MovieDetailsScreen"/>
        <Stack.Screen name="screens/PlayerScreen"/>
    </Stack>
  )
}