import { Text, View, StyleSheet } from "react-native";
import Header from '@/components/Header'
import {useQuery} from "convex/react"
import { api } from "@/convex/_generated/api";
import PlayerInput from "@/components/PlayerInput";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
 const players = useQuery(api.players.getPlayer);
 
  return (
    <SafeAreaView>
      <Header/>
      <PlayerInput/>

    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {}
})