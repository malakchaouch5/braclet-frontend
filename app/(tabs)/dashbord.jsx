import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Mock data generation function (similar to Python version)
const generateVitalSigns = (previousValues) => {
  const hr = Math.max(55, Math.min(100, previousValues.hr + (Math.random() * 3 - 1.5)));
  const spo2 = Math.max(95, Math.min(100, previousValues.spo2 + (Math.random() * 0.4 - 0.2)));
  const temp = Math.max(36, Math.min(38.5, previousValues.temp + (Math.random() * 0.1 - 0.05)));
  
  return { hr, spo2, temp };
};

// Risk prediction mock function
const predictPatientStatus = (hr, spo2, temp) => {
  // Simple risk calculation logic
  const riskFactors = [
    hr < 60 || hr > 100 ? 0.7 : 0,
    spo2 < 95 ? 0.6 : 0,
    temp < 36.5 || temp > 38 ? 0.5 : 0
  ];
  
  const totalRisk = riskFactors.reduce((a, b) => a + b, 0);
  const status = totalRisk > 1 ? 'critical' : totalRisk > 0.5 ? 'warning' : 'normal';
  
  return { status, risk: Math.min(totalRisk, 1) };
};

const Dashbord = () => {
  const [vitalData, setVitalData] = useState({
    time: [Date.now()],
    hr: [75],
    spo2: [98],
    temp: [37],
    predictions: [0],
    status: 'normal'
  });

  // Update data every second
  useEffect(() => {
    const interval = setInterval(() => {
      setVitalData(prevData => {
        const newTime = Date.now();
        const latestValues = {
          hr: prevData.hr[prevData.hr.length - 1],
          spo2: prevData.spo2[prevData.spo2.length - 1],
          temp: prevData.temp[prevData.temp.length - 1]
        };

        const newVitals = generateVitalSigns(latestValues);
        const { status, risk } = predictPatientStatus(
          newVitals.hr, 
          newVitals.spo2, 
          newVitals.temp
        );

        return {
          time: [...prevData.time, newTime].slice(-120),
          hr: [...prevData.hr, newVitals.hr].slice(-120),
          spo2: [...prevData.spo2, newVitals.spo2].slice(-120),
          temp: [...prevData.temp, newVitals.temp].slice(-120),
          predictions: [...prevData.predictions, risk].slice(-120),
          status
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Status color and text mapping
  const getStatusStyle = (status) => {
    const statusMap = {
      'critical': { 
        color: '#dc3545', 
        text: '❗ CRITICAL - Immediate Intervention Required' 
      },
      'warning': { 
        color: '#fd7e14', 
        text: '⚠️ Warning - Increased Monitoring Needed' 
      },
      'normal': { 
        color: '#28a745', 
        text: '✅ Normal - Stable Parameters' 
      }
    };
    return statusMap[status] || statusMap['normal'];
  };

  const renderVitalCard = (label, value, icon, unit) => {
    const getCardColor = (cardLabel, cardValue) => {
      switch(cardLabel) {
        case 'Heart Rate':
          return (cardValue < 60 || cardValue > 100) ? '#f8d7da' : '#d4edda';
        case 'SpO2':
          return cardValue < 95 ? '#f8d7da' : '#d4edda';
        case 'Temp':
          return (cardValue < 36.5 || cardValue > 38) ? '#f8d7da' : '#d4edda';
        default:
          return '#d4edda';
      }
    };

    return (
      <View 
        style={[
          styles.vitalCard, 
          { backgroundColor: getCardColor(label, value) }
        ]}
      >
        <Text style={styles.vitalCardIcon}>{icon}</Text>
        <Text style={styles.vitalCardLabel}>{label}</Text>
        <Text style={styles.vitalCardValue}>
          {value.toFixed(1)} {unit}
        </Text>
      </View>
    );
  };

  const statusStyle = getStatusStyle(vitalData.status);
  const latestHr = vitalData.hr[vitalData.hr.length - 1];
  const latestSpo2 = vitalData.spo2[vitalData.spo2.length - 1];
  const latestTemp = vitalData.temp[vitalData.temp.length - 1];
  const latestRisk = vitalData.predictions[vitalData.predictions.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={[
          styles.statusBanner, 
          { backgroundColor: statusStyle.color }
        ]}
      >
        <Text style={styles.statusText}>{statusStyle.text}</Text>
      </View>

      <ScrollView>
        {/* Vital Signs Cards */}
        <View style={styles.vitalCardsContainer}>
          {renderVitalCard('Heart Rate', latestHr, '❤️', 'bpm')}
          {renderVitalCard('SpO2', latestSpo2, '🩸', '%')}
          {renderVitalCard('Temp', latestTemp, '🌡️', '°C')}
          {renderVitalCard('Risk', latestRisk, '⚠️', '')}
        </View>

        {/* Graphs */}
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}>Heart Rate Trend</Text>
          <LineChart
            data={{
              labels: vitalData.time
                .slice(-10)
                .map(t => new Date(t).toLocaleTimeString()),
              datasets: [{
                data: vitalData.hr.slice(-10)
              }]
            }}
            width={Dimensions.get("window").width - 20}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 }
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  statusBanner: {
    padding: 15,
    alignItems: 'center'
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  vitalCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10
  },
  vitalCard: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center'
  },
  vitalCardIcon: {
    fontSize: 30,
    marginBottom: 5
  },
  vitalCardLabel: {
    fontSize: 14,
    color: '#666'
  },
  vitalCardValue: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  graphContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default Dashbord;

// Installation instructions:
// 1. Create a new React Native project
// 2. Install dependencies:
// npm install react-native-chart-kit
// npm install svg-charts
// npm install react-native-svg