import { Text, View, StyleSheet } from "react-native";
import Header from '@/components/Header'
import {useQuery} from "convex/react"
import { api } from "@/convex/_generated/api";
import PlayerInput from "@/components/PlayerInput";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient"

export default function Index() {
 const players = useQuery(api.players.getPlayer);
 const {colors} = useTheme();
 const homeStyles = createHomeStyles(colors);
 
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>

    <SafeAreaView style={homeStyles.safeArea}>
      <Header/>
      <PlayerInput/>

    </SafeAreaView>
    </LinearGradient>

  );
}


const styles = StyleSheet.create({
  container: {}
})