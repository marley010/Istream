import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabsLayout() {
  return (
    <Tabs>
<Tabs.Screen 
  name="home"  // Let op de kleine letter "h"
  options={{ 
    title: "",
    tabBarIcon: ({ color, size }) => (
      <Entypo name="home" size={size} color={color} />
    ),
  }} 
/>
<Tabs.Screen 
  name="movies"
  options={{ 
    title: "",
    tabBarIcon: ({ color, size }) => (
        <Feather name="play-circle" size={24} color={color} />
    ),
  }} 
/>
<Tabs.Screen 
  name="search"
  options={{ 
    title: "",
    tabBarIcon: ({ color, size }) => (
      <AntDesign name="search1" size={24} color={color} />
    ),
  }} 
/>
<Tabs.Screen 
  name="about_us"  // Let op de kleine letter "p"
  options={{ 
    title: "",
    tabBarIcon: ({ color, size }) => (
      <FontAwesome name="user-circle" size={size} color={color} />
    ),
  }} 
/>


    </Tabs>
  );
}
