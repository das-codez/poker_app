import { Text, View, StyleSheet } from "react-native";
import Header from '@/components/Header'
import {useQuery} from "convex/react"
import { api } from "@/convex/_generated/api";
export default function Index() {
  const players = useQuery(api.players.getPlayer);
  console.log(players)
  return (
   <Header/>
  );
}


const styles = StyleSheet.create({
  container: {}
})