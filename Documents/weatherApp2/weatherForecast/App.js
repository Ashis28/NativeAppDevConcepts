import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Platform, Image, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from 'expo-location';

const apikey = '1a2d3403968e6def591f7dad1afcd518';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bgGradient, setBgGradient] = useState(['#f2f2f2', '#b3c6e7']);

  const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const getGradientForWeather = (id) => {
    if (id >= 200 && id < 300) return ['#373B44', '#4286f4']; // Thunderstorm
    if (id >= 300 && id < 600) return ['#4e54c8', '#8f94fb']; // Rain/Drizzle
    if (id >= 600 && id < 700) return ['#83a4d4', '#b6fbff']; // Snow
    if (id >= 700 && id < 800) return ['#bdc3c7', '#2c3e50']; // Atmosphere
    if (id === 800) return ['#f7971e', '#ffd200']; // Clear
    if (id > 800 && id < 900) return ['#757F9A', '#D7DDE8']; // Clouds
    return ['#f2f2f2', '#b3c6e7'];
  };

  const handleSubmit = async (cityName) => {
    const queryCity = cityName || city;
    if (!queryCity.trim()) {
      setError('Please enter a city name.');
      setWeather(null);
      setForecast([]);
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);
    Keyboard.dismiss();
    try {
      // Current weather
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity.trim()}&appid=${apikey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        city: data.name,
        temp: (data.main.temp - 273.15).toFixed(1),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        id: data.weather[0].id,
        icon: data.weather[0].icon,
      });
      setBgGradient(getGradientForWeather(data.weather[0].id));
      // 3-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${queryCity.trim()}&appid=${apikey}`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error('Forecast not found');
      const forecastData = await forecastRes.json();
      // Get one forecast per day (at 12:00:00)
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
      setForecast(daily.map(item => ({
        date: item.dt_txt.split(' ')[0],
        temp: (item.main.temp - 273.15).toFixed(1),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })));
    } catch (e) {
      setError('Could not fetch weather. Check city name or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // Current weather
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Location weather not found');
      const data = await response.json();
      setWeather({
        city: data.name,
        temp: (data.main.temp - 273.15).toFixed(1),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        id: data.weather[0].id,
        icon: data.weather[0].icon,
      });
      setBgGradient(getGradientForWeather(data.weather[0].id));
      // 3-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) throw new Error('Forecast not found');
      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
      setForecast(daily.map(item => ({
        date: item.dt_txt.split(' ')[0],
        temp: (item.main.temp - 273.15).toFixed(1),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })));
    } catch (e) {
      setError('Could not fetch location weather.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, backgroundColor: bgGradient[0] }}>
      <View style={[styles.container, { backgroundColor: bgGradient[0] }]}>  
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter City Name"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => handleSubmit()}
            textAlign="center"
            autoCapitalize="words"
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Get Weather'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#6dd5ed' }]} onPress={handleLocation} disabled={loading}>
              <Text style={styles.buttonText}>Current Location</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <ActivityIndicator size="large" color="#4286f4" style={{ marginTop: 30 }} />}
        {(weather || error) && !loading && (
          <View style={styles.card}>
            {weather ? (
              <>
                <Text style={styles.cityDisplay}>{weather.city}</Text>
                <Image source={{ uri: getWeatherIconUrl(weather.icon) }} style={styles.weatherIcon} />
                <Text style={styles.tempDisplay}>{weather.temp} °C</Text>
                <Text style={styles.humidDisplay}>Humidity: {weather.humidity}%</Text>
                <Text style={styles.descDisplay}>{weather.description}</Text>
                <Text style={styles.sectionTitle}>3-Day Forecast</Text>
                <View style={styles.forecastRow}>
                  {forecast.map((item, idx) => (
                    <View key={idx} style={styles.forecastCard}>
                      <Text style={styles.forecastDate}>{item.date}</Text>
                      <Image source={{ uri: getWeatherIconUrl(item.icon) }} style={styles.forecastIcon} />
                      <Text style={styles.forecastTemp}>{item.temp} °C</Text>
                      <Text style={styles.forecastDesc}>{item.description}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.errorDisplay}>{error}</Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    minHeight: 700,
  },
  form: {
    margin: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'rgba(30,30,30,0.3)',
    borderRadius: 10,
    margin: 10,
    width: 300,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(156, 192, 224)',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
  },
  card: {
    backgroundColor: 'rgba(70,130,180,0.95)',
    padding: 30,
    minWidth: 320,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cityDisplay: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.9)',
    marginBottom: 10,
  },
  tempDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 10,
  },
  humidDisplay: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    color: '#222',
  },
  descDisplay: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  forecastCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    minWidth: 90,
  },
  forecastDate: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  forecastIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  forecastTemp: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  forecastDesc: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  errorDisplay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(32,32,29,0.7)',
    textAlign: 'center',
  },
});
