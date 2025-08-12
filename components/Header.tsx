import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons'

const Header = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    const players = useQuery(api.players.getPlayer);
    const completedCount = players ? players.filter((player) => player.sentMoney).length : 0;
    const totalPot = players ? players.reduce((sum, player) => sum + (player.buyIn || 0), 0) : 0;
    const total = players ? players.length : 0;

    const progPercentage = total > 0 ? (completedCount / total) * 100 : 0;
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
          <Ionicons name="flash-outline" size={28} color="#ffffff">

          </Ionicons>
        </LinearGradient>
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Total: {totalPot.toFixed(2)}$</Text>
          <Text style={homeStyles.subtitle}>
              {completedCount} of {total} sent
          </Text>
        </View>
      </View>
      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
            colors={colors.gradients.success}
            style={[homeStyles.progressFill, {width: `${progPercentage}%`}]}
            />
            <Text style={homeStyles.progressText}>{Math.round(progPercentage)}%</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Header