//Se utilizo leaflet para cargar el mapa
import React from 'react';
import {WebView} from 'react-native-webview';
import {View, StyleSheet} from 'react-native';

const Mapa = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mapa CUCEI</title>
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        />
        <style>
            #map {
                height: 100vh;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <script>
            const cuceiLocation = [20.65514217853507, -103.32547116331347];
            const map = L.map("map").setView(cuceiLocation, 16);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 15,
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map);

            L.marker(cuceiLocation)
                .addTo(map)
                .bindPopup("CUCEI: Centro Universitario de Ciencias Exactas e Ingenierías")
                .openPopup();
        </script>
    </body>
    </html>
  `;

  return (
    <View style={Styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        style={Styles.map}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Mapa;
