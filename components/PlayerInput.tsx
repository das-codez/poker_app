import { View, Text, TextInput, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';


const PlayerInput = () => {
    const [newPlayer, setNewPlayer] = useState("");
    const [newBuy, setNewBuy] = useState("");
    const addPlayer = useMutation(api.players.addPlayer);

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
    <View>
      <View>
        <TextInput
        placeholder="Name"
        value={newPlayer}
        onChangeText={setNewPlayer}
        
        />
        <TextInput
        placeholder="Buy In"
        value={newBuy}
        onChangeText={setNewBuy}
        
        />
        <Button onPress={handleAddPlayer} title="Submit" />
      </View>
    </View>
  )
}

export default PlayerInput