const { Client, Message } = require('azure-iot-device');

const connectionString = 'HostName=iam-dev-IoT-nonprod.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=fSeVEYKN+B8DZ2/5fc56pcfAKJfq/rBTel3MaXelGhk=';

const client = Client.fromConnectionString(connectionString, require('azure-iot-device-mqtt').Mqtt);

const sendMessage = () => {
  const data = {
    temperature: Math.random() * 30 + 20, // Simulate temperature data
    humidity: Math.random() * 50 + 30, // Simulate humidity data
  };

  const message = new Message(JSON.stringify(data));
  console.log('Sending message: ' + message.getData());

  client.sendEvent(message, (err) => {
    if (err) {
      console.error('Error sending message: ' + err.toString());
    } else {
      console.log('Message sent successfully');
    }
  });
};

client.open((err) => {
  if (err) {
    console.error('Error opening the connection: ' + err.toString());
    process.exit(-1);
  } else {
    console.log('IoT Hub connection opened');
    setInterval(sendMessage, 5000); // Send telemetry data every 5 seconds
  }
});
