import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";

type ParticipantProps = {
  participantName: string;
  handleRemove: () => void;
}

export function Participant({ participantName, handleRemove }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{participantName}</Text>

      <TouchableOpacity onPress={handleRemove} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  )
}