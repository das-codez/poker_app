import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from '@/components/Header'
import {useMutation, useQuery} from "convex/react"
import { api } from "@/convex/_generated/api";
import PlayerInput from "@/components/PlayerInput";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient"
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type Player = Doc<"players">
export default function Index() {
 const players = useQuery(api.players.getPlayer);
 const {colors} = useTheme();
 const homeStyles = createHomeStyles(colors);

 const togglePlayer = useMutation(api.players.togglePlayer)
 const handleTogglePlayer = async(id:Id<"players">) => {
  try{
    await togglePlayer({id})
  }catch(error){
    console.log("Error toggling player", error);
    Alert.alert("Error", "Failed to toggle player");
  }
 }

 const renderPlayer = ({item}:{item:Player}) => {
  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
      colors={colors.gradients.surface}
      style={homeStyles.todoItem}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      >
        <TouchableOpacity 
        style={homeStyles.checkbox}
        activeOpacity={0.7}
        onPress={() => handleTogglePlayer(item._id)}
        >
          <LinearGradient
          colors={item.sentMoney ? colors.gradients.success : colors.gradients.muted}
          style = {[
            homeStyles.checkboxInner,
            {borderColor: item.sentMoney ? "transparent" : colors.border}
          ]}
          >
            {item.sentMoney && <Ionicons name="checkmark" size={18} color="#fff"/>}
          </LinearGradient>
        </TouchableOpacity>
        <View style={homeStyles.todoTextContainer}>
          <Text
          style={[
            homeStyles.todoText,
            !item.sentMoney && {
              color: colors.textMuted,
              opacity: 0.6,
            }
            
          ]}
          >
            {item.name} {item.buyIn.toFixed(2)}$
          </Text>
        </View>
      </LinearGradient>
    </View>
  )
 }
 
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>

    <SafeAreaView style={homeStyles.safeArea}>
      <Header/>
      <PlayerInput/>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item._id}
        style={homeStyles.todoList}
        contentContainerStyle={homeStyles.todoListContent}
      />

    </SafeAreaView>
    </LinearGradient>

  );
}


const styles = StyleSheet.create({
  container: {}
})