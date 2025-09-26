import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  TrendingDown,
  TrendingUp,
  Droplets,
  AlertTriangle,
  MapPin,
  Download,
} from "lucide-react-native";
import { LineGraph } from "react-native-graph";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";

// Local stations data
const stationsData = [
  {
    Station_ID: "GW001",
    Station_Name: "Bengaluru Central",
    State: "Karnataka",
    District: "Bengaluru Urban",
    Latitude: 12.9716,
    Longitude: 77.5946,
    Water_Level_m: 8.5,
    Recharge_Estimate: 0.12,
    Daily_Change: -0.05,
    Status: "Caution",
  },
  {
    Station_ID: "GW002",
    Station_Name: "Mumbai Marine Drive",
    State: "Maharashtra",
    District: "Mumbai",
    Latitude: 18.922,
    Longitude: 72.8347,
    Water_Level_m: 3.2,
    Recharge_Estimate: 0.18,
    Daily_Change: 0.02,
    Status: "Normal",
  },
  {
    Station_ID: "GW003",
    Station_Name: "Delhi South",
    State: "Delhi",
    District: "South Delhi",
    Latitude: 28.5355,
    Longitude: 77.291,
    Water_Level_m: 12.8,
    Recharge_Estimate: 0.08,
    Daily_Change: -0.12,
    Status: "Critical",
  },
  {
    Station_ID: "GW004",
    Station_Name: "Chennai Central",
    State: "Tamil Nadu",
    District: "Chennai",
    Latitude: 13.0827,
    Longitude: 80.2707,
    Water_Level_m: 6.5,
    Recharge_Estimate: 0.15,
    Daily_Change: 0.08,
    Status: "Caution",
  },
  {
    Station_ID: "GW005",
    Station_Name: "Kolkata East",
    State: "West Bengal",
    District: "Kolkata",
    Latitude: 22.5726,
    Longitude: 88.3639,
    Water_Level_m: 4.2,
    Recharge_Estimate: 0.22,
    Daily_Change: 0.05,
    Status: "Normal",
  },
  {
    Station_ID: "GW006",
    Station_Name: "Hyderabad Tech City",
    State: "Telangana",
    District: "Hyderabad",
    Latitude: 17.385,
    Longitude: 78.4867,
    Water_Level_m: 15.2,
    Recharge_Estimate: 0.05,
    Daily_Change: -0.18,
    Status: "Critical",
  },
  {
    Station_ID: "GW007",
    Station_Name: "Pune Central",
    State: "Maharashtra",
    District: "Pune",
    Latitude: 18.5204,
    Longitude: 73.8567,
    Water_Level_m: 7.8,
    Recharge_Estimate: 0.14,
    Daily_Change: -0.03,
    Status: "Caution",
  },
  {
    Station_ID: "GW008",
    Station_Name: "Ahmedabad West",
    State: "Gujarat",
    District: "Ahmedabad",
    Latitude: 23.0225,
    Longitude: 72.5714,
    Water_Level_m: 11.5,
    Recharge_Estimate: 0.07,
    Daily_Change: -0.08,
    Status: "Critical",
  },
  {
    Station_ID: "GW009",
    Station_Name: "Jaipur City",
    State: "Rajasthan",
    District: "Jaipur",
    Latitude: 26.9124,
    Longitude: 75.7873,
    Water_Level_m: 18.5,
    Recharge_Estimate: 0.03,
    Daily_Change: -0.15,
    Status: "Critical",
  },
  {
    Station_ID: "GW010",
    Station_Name: "Kochi Marine",
    State: "Kerala",
    District: "Ernakulam",
    Latitude: 9.9312,
    Longitude: 76.2673,
    Water_Level_m: 2.8,
    Recharge_Estimate: 0.25,
    Daily_Change: 0.12,
    Status: "Normal",
  },
  {
    Station_ID: "GW011",
    Station_Name: "Bhopal Central",
    State: "Madhya Pradesh",
    District: "Bhopal",
    Latitude: 23.2599,
    Longitude: 77.4126,
    Water_Level_m: 9.2,
    Recharge_Estimate: 0.1,
    Daily_Change: -0.06,
    Status: "Caution",
  },
  {
    Station_ID: "GW012",
    Station_Name: "Lucknow North",
    State: "Uttar Pradesh",
    District: "Lucknow",
    Latitude: 26.8467,
    Longitude: 80.9462,
    Water_Level_m: 13.8,
    Recharge_Estimate: 0.06,
    Daily_Change: -0.1,
    Status: "Critical",
  },
  {
    Station_ID: "GW013",
    Station_Name: "Patna East",
    State: "Bihar",
    District: "Patna",
    Latitude: 25.5941,
    Longitude: 85.1376,
    Water_Level_m: 5.5,
    Recharge_Estimate: 0.16,
    Daily_Change: 0.04,
    Status: "Caution",
  },
  {
    Station_ID: "GW014",
    Station_Name: "Chandigarh Central",
    State: "Chandigarh",
    District: "Chandigarh",
    Latitude: 30.7333,
    Longitude: 76.7794,
    Water_Level_m: 4.8,
    Recharge_Estimate: 0.19,
    Daily_Change: 0.07,
    Status: "Normal",
  },
  {
    Station_ID: "GW015",
    Station_Name: "Guwahati Central",
    State: "Assam",
    District: "Kamrup",
    Latitude: 26.1445,
    Longitude: 91.7362,
    Water_Level_m: 3.5,
    Recharge_Estimate: 0.24,
    Daily_Change: 0.09,
    Status: "Normal",
  },
  {
    Station_ID: "GW016",
    Station_Name: "Bhubaneswar Tech",
    State: "Odisha",
    District: "Khorda",
    Latitude: 20.2961,
    Longitude: 85.8245,
    Water_Level_m: 6.8,
    Recharge_Estimate: 0.13,
    Daily_Change: 0.03,
    Status: "Caution",
  },
  {
    Station_ID: "GW017",
    Station_Name: "Thiruvananthapuram South",
    State: "Kerala",
    District: "Thiruvananthapuram",
    Latitude: 8.5241,
    Longitude: 76.9366,
    Water_Level_m: 2.5,
    Recharge_Estimate: 0.28,
    Daily_Change: 0.15,
    Status: "Normal",
  },
  {
    Station_ID: "GW018",
    Station_Name: "Indore Central",
    State: "Madhya Pradesh",
    District: "Indore",
    Latitude: 22.7196,
    Longitude: 75.8577,
    Water_Level_m: 10.5,
    Recharge_Estimate: 0.09,
    Daily_Change: -0.07,
    Status: "Critical",
  },
  {
    Station_ID: "GW019",
    Station_Name: "Coimbatore West",
    State: "Tamil Nadu",
    District: "Coimbatore",
    Latitude: 11.0168,
    Longitude: 76.9558,
    Water_Level_m: 8.2,
    Recharge_Estimate: 0.11,
    Daily_Change: -0.04,
    Status: "Caution",
  },
  {
    Station_ID: "GW020",
    Station_Name: "Visakhapatnam Port",
    State: "Andhra Pradesh",
    District: "Visakhapatnam",
    Latitude: 17.6868,
    Longitude: 83.2185,
    Water_Level_m: 4.5,
    Recharge_Estimate: 0.17,
    Daily_Change: 0.06,
    Status: "Normal",
  },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get("window").width;
  const [stations, setStations] = useState(stationsData);
  const [nationalMetrics, setNationalMetrics] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [tickerText, setTickerText] = useState("");
  const scrollRef = useRef(null);

  // Sample ticker messages
  const tickerMessages = [
    "Water level in Bengaluru has dropped by 0.5m in the last 24 hours",
    "Recharge is 15% higher than seasonal average in Kerala",
    "Critical alert: Jaipur stations showing severe depletion",
    "Delhi groundwater levels stable after recent rainfall",
    "Maharashtra stations showing improved recharge rates",
  ];

  useEffect(() => {
    setStations(stationsData);
    calculateNationalMetrics(stationsData);
    generateAlerts(stationsData);
    setupTicker();
  }, []);

  const setupTicker = () => {
    let messageIndex = 0;
    setTickerText(tickerMessages[messageIndex]);

    setInterval(() => {
      messageIndex = (messageIndex + 1) % tickerMessages.length;
      setTickerText(tickerMessages[messageIndex]);
    }, 4000);
  };

  const calculateNationalMetrics = (stationsData) => {
    const totalStations = stationsData.length;
    const avgWaterLevel =
      stationsData.reduce((sum, s) => sum + s.Water_Level_m, 0) / totalStations;
    const avgRecharge =
      stationsData.reduce((sum, s) => sum + s.Recharge_Estimate, 0) /
      totalStations;

    const statusCounts = stationsData.reduce((acc, s) => {
      acc[s.Status] = (acc[s.Status] || 0) + 1;
      return acc;
    }, {});

    setNationalMetrics({
      avgWaterLevel: avgWaterLevel.toFixed(1),
      avgRecharge: avgRecharge.toFixed(3),
      totalStations,
      normal: statusCounts.Normal || 0,
      caution: statusCounts.Caution || 0,
      critical: statusCounts.Critical || 0,
    });
  };

  const generateAlerts = (stationsData) => {
    const alertsList = stationsData
      .filter((s) => s.Status === "Critical" || s.Status === "Caution")
      .map((s) => ({
        id: s.Station_ID,
        station: s.Station_Name,
        location: `${s.District}, ${s.State}`,
        level: s.Status,
        message:
          s.Status === "Critical"
            ? `Critical water level: ${s.Water_Level_m}m BGL`
            : `Caution: Water level ${s.Water_Level_m}m BGL`,
      }));

    setAlerts(alertsList);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Normal":
        return "#10B981";
      case "Caution":
        return "#F59E0B";
      case "Critical":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Normal":
        return "#D1FAE5";
      case "Caution":
        return "#FEF3C7";
      case "Critical":
        return "#FEE2E2";
      default:
        return "#F3F4F6";
    }
  };

  // Sample trend data for charts with date range April - September
  const waterLevelTrend = [
    { date: new Date("2024-04-17"), value: 7.2 },
    { date: new Date("2024-05-17"), value: 7.5 },
    { date: new Date("2024-06-17"), value: 7.8 },
    { date: new Date("2024-07-17"), value: 8.1 },
    { date: new Date("2024-08-17"), value: 7.9 },
    { date: new Date("2024-09-17"), value: 8.5 },
  ];

  const rechargeTrend = [
    { date: new Date("2024-04-17"), value: 0.11 },
    { date: new Date("2024-05-17"), value: 0.13 },
    { date: new Date("2024-06-17"), value: 0.15 },
    { date: new Date("2024-07-17"), value: 0.18 },
    { date: new Date("2024-08-17"), value: 0.16 },
    { date: new Date("2024-09-17"), value: 0.15 },
  ];

  const criticalDistricts = [
    {
      name: "South Delhi",
      state: "Delhi",
      level: 12.8,
      change: -0.12,
      status: "Critical",
    },
    {
      name: "Jaipur",
      state: "Rajasthan",
      level: 18.5,
      change: -0.15,
      status: "Critical",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      level: 15.2,
      change: -0.18,
      status: "Critical",
    },
    {
      name: "Ahmedabad",
      state: "Gujarat",
      level: 11.5,
      change: -0.08,
      status: "Critical",
    },
    {
      name: "Lucknow",
      state: "Uttar Pradesh",
      level: 13.8,
      change: -0.1,
      status: "Critical",
    },
  ];

  const handleStationPress = (stationId) => {
    router.push(`/(tabs)/station/${stationId}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#1E40AF",
                marginBottom: 2,
              }}
            >
              AquaSense
            </Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937" }}
            >
              Dashboard
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280" }}>
              Groundwater Monitoring System
            </Text>
          </View>

          <TouchableOpacity
            style={{ position: "relative" }}
            onPress={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} color="#374151" />
            {alerts.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "#EF4444",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "bold" }}
                >
                  {alerts.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Live Data Ticker */}
        <View
          style={{
            backgroundColor: "#3B82F6",
            paddingVertical: 12,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "500",
              textAlign: "center",
              paddingHorizontal: 20,
            }}
          >
            🔴 LIVE: {tickerText}
          </Text>
        </View>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderBottomWidth: 1,
              borderColor: "#E5E7EB",
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1F2937",
                marginBottom: 12,
              }}
            >
              Alerts & Notifications
            </Text>
            {alerts.length > 0 ? (
              alerts.slice(0, 3).map((alert, index) => (
                <View
                  key={alert.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    borderBottomWidth: index < 2 ? 1 : 0,
                    borderColor: "#F3F4F6",
                  }}
                >
                  <AlertTriangle
                    size={16}
                    color={getStatusColor(alert.level)}
                  />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#1F2937",
                      }}
                    >
                      {alert.station}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#6B7280" }}>
                      {alert.location} - {alert.message}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ fontSize: 14, color: "#6B7280" }}>
                No alerts at this time
              </Text>
            )}
          </View>
        )}

        {/* National Metrics */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            National Overview
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <View
                style={{
                  backgroundColor: "#F0F9FF",
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#BFDBFE",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#3B82F6",
                    marginBottom: 4,
                  }}
                >
                  AVG WATER LEVEL
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#1E40AF" }}
                >
                  {nationalMetrics.avgWaterLevel}m
                </Text>
                <Text style={{ fontSize: 10, color: "#6B7280" }}>
                  Below Ground Level
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 8 }}>
              <View
                style={{
                  backgroundColor: "#F0FDF4",
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#BBF7D0",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "500",
                    color: "#16A34A",
                    marginBottom: 4,
                  }}
                >
                  AVG RECHARGE RATE
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#15803D" }}
                >
                  {nationalMetrics.avgRecharge}
                </Text>
                <Text style={{ fontSize: 10, color: "#6B7280" }}>m³</Text>
              </View>
            </View>
          </View>

          {/* Station Status Count */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F9FAFB",
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#10B981" }}
              >
                {nationalMetrics.normal}
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Normal</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#F59E0B" }}
              >
                {nationalMetrics.caution}
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Caution</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#EF4444" }}
              >
                {nationalMetrics.critical}
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Critical</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#374151" }}
              >
                {nationalMetrics.totalStations}
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>Total</Text>
            </View>
          </View>
        </View>

        {/* Interactive Map */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Station Locations
          </Text>

          <View
            style={{
              height: 250,
              borderRadius: 12,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 15.0,
                longitudeDelta: 15.0,
              }}
            >
              {stations.map((station) => (
                <Marker
                  key={station.Station_ID}
                  coordinate={{
                    latitude: station.Latitude,
                    longitude: station.Longitude,
                  }}
                  onPress={() => handleStationPress(station.Station_ID)}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: getStatusColor(station.Status),
                      borderWidth: 2,
                      borderColor: "#FFFFFF",
                    }}
                  />
                </Marker>
              ))}
            </MapView>
          </View>
        </View>

        {/* Areas to Focus */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Areas Requiring Immediate Attention
          </Text>

          {criticalDistricts.map((district, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: getStatusBgColor(district.status),
                padding: 16,
                borderRadius: 12,
                marginBottom: 8,
                borderWidth: 1,
                borderColor: getStatusColor(district.status),
              }}
            >
              <AlertTriangle
                size={20}
                color={getStatusColor(district.status)}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#1F2937" }}
                >
                  {district.name}, {district.state}
                </Text>
                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                  Water Level: {district.level}m BGL
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TrendingDown
                    size={16}
                    color={getStatusColor(district.status)}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: getStatusColor(district.status),
                      marginLeft: 4,
                    }}
                  >
                    {district.change}m/day
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Trend Charts */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            National Trends (April - September)
          </Text>

          {/* Water Level Trend */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              National Average Water Level
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
              Water Level (meters)
            </Text>
            <View style={{ height: 180 }}>
              <LineGraph
                points={waterLevelTrend}
                color="#3B82F6"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={180}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(59, 130, 246, 0.2)",
                  "rgba(59, 130, 246, 0)",
                ]}
              />
            </View>
          </View>

          {/* Recharge Rate Trend */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#374151",
                marginBottom: 8,
              }}
            >
              National Average Recharge Rate
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
              Recharge Rate (m³)
            </Text>
            <View style={{ height: 180 }}>
              <LineGraph
                points={rechargeTrend}
                color="#10B981"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={180}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(16, 185, 129, 0.2)",
                  "rgba(16, 185, 129, 0)",
                ]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
