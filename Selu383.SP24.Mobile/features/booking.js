function BookingScreen({ route }) {
    const { hotel } = route.params;
    const [selectedDates, setSelectedDates] = useState(null); // State to store selected booking dates
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
  
    const handleBookRoom = () => {
      // Implement booking logic here, e.g., send booking request to backend
      console.log('Booking Details:', {
        hotel: hotel,
        dates: selectedDates,
        customer: { name: customerName, email: customerEmail }
      });
      // Reset form fields after booking
      setSelectedDates(null);
      setCustomerName('');
      setCustomerEmail('');
    };
  
    return (
      <View style={style.container}>
        <Text>{hotel.name}</Text>
        <Text>{hotel.description}</Text>
        <DatePicker selectedDates={selectedDates} onSelectDates={setSelectedDates} />
        <TextInput label="Name" value={customerName} onChangeText={setCustomerName} />
        <TextInput label="Email" value={customerEmail} onChangeText={setCustomerEmail} />
        <Button mode="contained" onPress={handleBookRoom}>Confirm Booking</Button>
      </View>
    );
  }
  