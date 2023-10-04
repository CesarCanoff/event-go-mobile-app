import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Modal } from "react-native";

import { styles } from "./styles";

import { Participant } from "../../components/Participant";

export function Home() {
  const [inputParticipantName, setInputParticipantName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [initModal, setInitModal] = useState(true);

  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");

  const handleAddParticipant = (name: string) => {
    if (participants.includes(name)) {
      return Alert.alert("Participant already added",
        "This participant has already been added to the list of participants");
    }

    setParticipants([...participants, name]);
    setInputParticipantName("");
  }

  const handleRemoveParticipant = (name: string) => {
    Alert.alert("Remove participant", `Are you sure you want to remove participant ${name}?`,
      [{
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Yes, remove",
        style: "destructive",
        onPress: () => setParticipants(participants.filter(participant => participant !== name))
      }]);
  }

  const verifyIfEventNameIsEmpty = (name: string): boolean => {
    return name === "";
  }
  
  const verifyIfEventVenueIsEmpty = (venue: string): boolean => {
    return venue === "";
  }

  const verifyIfCanCreateEvent = () => {
    if (verifyIfEventNameIsEmpty(eventName)) {
      return Alert.alert("Event name cannot be empty", "Please enter a name for the event");
    }
    
    if (verifyIfEventVenueIsEmpty(eventVenue)) {
      return Alert.alert("Event venue cannot be empty", "Please enter a venue for the event");
    }

    setInitModal(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        statusBarTranslucent
        visible={initModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.appLogo}><Text style={styles.appLogoBolder}>Go</Text>Event</Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Event name"
            value={eventName}
            defaultValue={eventName}
            onChangeText={setEventName}
            maxLength={255}
            placeholderTextColor="#6b6b6b"
          />

          <Text style={styles.inputLabel}>Venue</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Event venue"
            value={eventVenue}
            defaultValue={eventVenue}
            onChangeText={setEventVenue}
            maxLength={255}
            placeholderTextColor="#6b6b6b"
          />
          

          <TouchableOpacity onPress={verifyIfCanCreateEvent} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.eventName}>{eventName}</Text>
      <Text style={styles.eventVenue}>{eventVenue}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={inputParticipantName}
          defaultValue={inputParticipantName}
          onChangeText={setInputParticipantName}
          placeholder="Participant's name"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={() => handleAddParticipant(inputParticipantName)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No participants added</Text>
        )}
        renderItem={({ item }) => ((
          <Participant
            participantName={item}
            handleRemove={() => handleRemoveParticipant(item)}
          />
        ))}
      />
    </View>
  );
}
