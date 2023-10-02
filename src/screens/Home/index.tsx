import { Text, View, TextInput, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export function Home() {
  const handleAddParticipant = () => {
    console.log("Adicionando participante...");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Dezembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          keyboardAppearance="dark"
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity onPress={handleAddParticipant}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}
