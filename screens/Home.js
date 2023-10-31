import { View, Text, ScrollView, Image, Pressable,Button } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const Home = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [tabContent, setTabContent] = useState(null);

const Category=[{id:1 , label: "Top Artists" , api:"https://api.spotify.com/v1/me/top/artists"},
{
    id:2,label:"Recently played ",api:"https://api.spotify.com/v1/me/player/recently-played?limit=20"
},
{
    id:3 , label:"Liked songs", api:" https://api.spotify.com/v1/me/tracks"
},
{

id :4 , label:"Pritam" ,api : "https://api.spotify.com/v1/artists/Pritam/albums "
}

]
const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
    const navigation = useNavigation()
    const Logout =  ()=>{

         AsyncStorage.removeItem("token")
        AsyncStorage.removeItem("expirationDate")
        navigation.navigate('Login');
    }
  const [Userprofile, Setuserprofile] = useState();
  const Getprofile = async () => {
    const accessToken = await AsyncStorage.getItem("token");
    try {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      Setuserprofile(data);
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    Getprofile();
  }, []);
  console.log(Userprofile);
  return (
    <LinearGradient colors={["white", "#FAF0FC"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    

            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 40,
                resizeMode: "cover",
                marginTop: 60,
                marginLeft: 15,
                marginBottom:10
              }}
              source={{ uri: Userprofile?.images[0].url }}
            ></Image>
<Pressable onPress={Logout}>
<SimpleLineIcons name="logout" size={24} color="black" style={{marginRight:15,marginTop:30,marginBottom:10}} />
<Text style={{marginRight:10,fontWeight:"500"}}>Logout</Text>
</Pressable>
          </View>
          
          <Text style={{
                fontSize:30, marginLeft: 15
            }}>
                Hello,{Userprofile?.display_name}!
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={true}>

{/* <View> */}
      <View style={{ marginTop:30,flexDirection: 'row', justifyContent: 'space-between' }}>
        {Category.map((tab) => (
          <Button
            key={tab.id}
            title={tab.label}
            onPress={() => handleTabClick(tab.id)}

            color={activeTab === tab.id ? 'black' : 'gray'}
          />

        ))}
      </View>

</ScrollView>
      </ScrollView>




    </LinearGradient>
  );
};

export default Home;
