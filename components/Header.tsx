import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    const players = useQuery(api.players.getPlayer);
    const completedCount = players ? players.filter((player) => player.sentMoney).length : 0;
    const total = players ? players.length : 0;

    const progPercentage = total > 0 ? (completedCount / total) * 100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#ffffff">

          </Ionicons>
        </LinearGradient>
      </View>
      <Text>Header</Text>
    </View>
  )
}

export default Header