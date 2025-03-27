import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#565252", // Donkergrijze navbar
          borderTopWidth: 5, // Dikkere bovenrand
          borderTopColor: "#8A2BE2", // Paarse rand bovenaan
          height: 60, // Verhoogde navbar voor betere uitlijning
          alignItems: "center", // Centreer alles in de navbar
        },
        tabBarItemStyle: {
          height: "100%", // Zorgt ervoor dat de items de volledige hoogte benutten
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarActiveTintColor: "#d1b3ff",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false, 
      }}
    >
      <Tabs.Screen 
        name="home"  
        options={{ 
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="movies"
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="play-circle" size={28} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="search"
        options={{ 
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="about_us"
        options={{ 
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle" size={28} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
