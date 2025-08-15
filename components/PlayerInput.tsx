import { View, Text, TextInput, Alert, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const PlayerInput = () => {
    const [newPlayer, setNewPlayer] = useState("");
    const [newBuy, setNewBuy] = useState("");
    const addPlayer = useMutation(api.players.addPlayer);
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);

    const handleAddPlayer = async() => {
        
        if(newPlayer.trim()){
            const price = parseFloat(newBuy);
            try{
                await addPlayer({name:newPlayer.trim(), buyIn:price})
                setNewPlayer("")
                setNewBuy("")
            }catch(error){
                console.log("Error adding player", error);
                Alert.alert("Error", "Failed");
            }
        }
    }

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
        style={homeStyles.input}
        placeholder="Name"
        value={newPlayer}
        onChangeText={setNewPlayer}
        placeholderTextColor={colors.textMuted}
        
        />
        <TextInput
        style={homeStyles.input}
        placeholder="Buy In"
        value={newBuy}
        onChangeText={setNewBuy}
        placeholderTextColor={colors.textMuted}
        
        />
       <TouchableOpacity onPress={handleAddPlayer} activeOpacity={0.8} disabled={!(newPlayer.trim() && newBuy.trim())}>
        <LinearGradient
        colors={(newPlayer.trim() && newBuy.trim())? colors.gradients.primary : colors.gradients.muted}
        style={[homeStyles.addButton, newPlayer.trim() && homeStyles.addButtonDisabled]}
        >
          <Ionicons name="add" size={24} color="#ffffff"/>
        </LinearGradient>
       </TouchableOpacity>
      </View>
    </View>
  )
}

export default PlayerInput