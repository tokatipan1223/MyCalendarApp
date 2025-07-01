import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

interface EventsMap {
  [date: string]: string[];
}

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [events, setEvents] = useState<EventsMap>({});

  const onDayPress = (day: DateObject) => {
    setSelectedDate(day.dateString);
  };

  const addEvent = () => {
    if (!selectedDate || !input) {
      return;
    }
    setEvents(prev => {
      const dayEvents = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...dayEvents, input],
      };
    });
    setInput('');
  };

  const marked = selectedDate
    ? {
        [selectedDate]: { selected: true },
      }
    : undefined;

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} markedDates={marked} />
      {selectedDate ? (
        <View style={styles.eventSection}>
          <Text style={styles.dateText}>{selectedDate}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add event"
              value={input}
              onChangeText={setInput}
            />
            <Button title="Add" onPress={addEvent} />
          </View>
          <FlatList
            data={events[selectedDate] || []}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <Text style={styles.eventText}>
                {'•'} {item}
              </Text>
            )}
          />
        </View>
      ) : (
        <Text style={styles.hintText}>Tap a date to add events.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  eventSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  eventText: {
    fontSize: 16,
    paddingVertical: 4,
  },
  hintText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default CalendarScreen;
