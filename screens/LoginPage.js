import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as AppAuth from "expo-app-auth"
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";
const headphone = require("/Users/ayushpal/Desktop/JustListen1/JustListen/assets/headphone.png");
const LoginPage = () => {

const  navigation = useNavigation()


useEffect(()=>{
const checktokenvalid  = async ()=>{
const accessToken = await AsyncStorage.getItem("token")
const expiredate = await AsyncStorage.getItem("expirationdate")
console.log("access token : ",accessToken)
console.log("expire : ",expiredate)

if (accessToken &&  expiredate){

    const currentTime = Date.now();
    
    if(currentTime < parseInt(expiredate)){
        navigation.replace ("Main");
    } else{
         AsyncStorage.removeItem("token")
         AsyncStorage.removeItem("expirationDate")
    }
}
}
checktokenvalid();
},[])


async function auth(){
const clintid = "d6ea9acad0dd471b90352bd98c69b2ef"
const config={
    issuer:"https://accounts.spotify.com",
    clientId: clintid,
    scopes:
    [
    "user-read-email",
    "user-library-read",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public" ]
    ,
redirectUrl:"exp://192.168.1.37:19000/--/spotify-auth-callback"
}
const result =  await AppAuth.authAsync(config)
console.log(result)

if(result.accessToken){
    const expirationdate = new Date(result.accessTokenExpirationDate).getTime();
    AsyncStorage.setItem("token",result.accessToken)
    AsyncStorage.setItem("expirationdate",expirationdate.toString())
    navigation.navigate("Main")
}
}

  return (
    <LinearGradient
      colors={["aqua", "skyblue", "white", "lightpink"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View style={{ height: 80 }} />

        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",

          }}
        >
          Just Listen
        </Text>
        <Image
          source={headphone}
          style={{
            marginTop: 20,
            marginLeft: "15%",
            transform: [{ rotate: "25deg" }],
          }}
        />
        <View style={{ height: 70 }} />
        <Pressable
        onPress={auth}
          style={{
            backgroundColor: "#1DB954",
            padding: 18,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 1,
          }}
        >
          <Entypo name="spotify" size={24} color="black" />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              flex: 1,
              textAlign: "center",
            }}
          >
          
            Join with Spotify
          </Text>
        </Pressable>

        <Pressable
          style={{

            padding: 18,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 1,
            marginVertical:10,
            backgroundColor:"white"
          }}
        >
         <Entypo name="mobile" size={24} color="black" />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "20",
              flex: 1,
              textAlign: "center",

            }}
          >
          
            Join with Mobile Number
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginPage;





