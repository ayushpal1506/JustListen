import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Profile from "./screens/Profile";
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "./screens/LoginPage";
import { useState } from "react";
import { Text } from "react-native";



const Tab = createBottomTabNavigator();
function Bottomtabs() {

const [label,setpressed] = useState("jgvut")

  return (
    <Tab.Navigator >

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="home" size={24} color="black" />
            
            ) : (
              <AntDesign name="home" size={24} color="grey" />

            ),

        }}
      />

             

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="black" />

            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}


const Stack =  createNativeStackNavigator();
function Navigation(){
    return(
        <NavigationContainer   >
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{headerShown:false}}/>
                <Stack.Screen name ="Main" component={Bottomtabs} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation