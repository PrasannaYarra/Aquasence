import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Search, Filter, Download, ChevronDown, X } from "lucide-react-native";
import { router } from "expo-router";

// Local stations data - same as dashboard
const stationsData = [
  {
    Station_ID: "GW001",
    Station_Name: "Bengaluru Central",
    State: "Karnataka",
    District: "Bengaluru Urban",
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
    Water_Level_m: 4.5,
    Recharge_Estimate: 0.17,
    Daily_Change: 0.06,
    Status: "Normal",
  },
];

export default function StationsScreen() {
  const insets = useSafeAreaInsets();
  const [stations, setStations] = useState(stationsData);
  const [filteredStations, setFilteredStations] = useState(stationsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Station_Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Animation for export progress
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStations(stationsData);
    setFilteredStations(stationsData);
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [
    stations,
    searchQuery,
    selectedState,
    selectedDistrict,
    selectedStatus,
    sortBy,
    sortOrder,
  ]);

  const applyFiltersAndSort = () => {
    let filtered = [...stations];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (station) =>
          station.Station_Name.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          station.Station_ID.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          station.State.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.District.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter((station) => station.State === selectedState);
    }

    // Apply district filter
    if (selectedDistrict) {
      filtered = filtered.filter(
        (station) => station.District === selectedDistrict
      );
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(
        (station) => station.Status === selectedStatus
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredStations(filtered);
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

  const getUniqueStates = () => {
    return [...new Set(stations.map((s) => s.State))].sort();
  };

  const getUniqueDistricts = () => {
    const districts = selectedState
      ? stations.filter((s) => s.State === selectedState).map((s) => s.District)
      : stations.map((s) => s.District);
    return [...new Set(districts)].sort();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedStatus("");
    setSortBy("Station_Name");
    setSortOrder("asc");
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Animate progress bar from 0 to 100%
    Animated.timing(progressAnimation, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Update progress text
    const progressInterval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Simulate export completion
    setTimeout(() => {
      setIsExporting(false);
      setExportProgress(0);
      progressAnimation.setValue(0);
      Alert.alert("Success", "File Downloaded Successfully");
    }, 3000);
  };

  const handleStationPress = (stationId) => {
    router.push(`/(tabs)/station/${stationId}`);
  };

  const activeFilters = [
    selectedState && `State: ${selectedState}`,
    selectedDistrict && `District: ${selectedDistrict}`,
    selectedStatus && `Status: ${selectedStatus}`,
  ].filter(Boolean);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" />

      <ScrollView
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
              style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937" }}
            >
              Monitoring Stations
            </Text>
            <Text style={{ fontSize: 14, color: "#6B7280" }}>
              Real-time data from {stations.length} DWLR stations
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#3B82F6",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={handleExport}
            disabled={isExporting}
          >
            <Download size={16} color="#FFFFFF" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "500",
                marginLeft: 4,
              }}
            >
              Export
            </Text>
          </TouchableOpacity>
        </View>

        {/* Export Progress */}
        {isExporting && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: "#F0F9FF",
              borderBottomWidth: 1,
              borderColor: "#BFDBFE",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#1E40AF",
                marginBottom: 8,
              }}
            >
              Exporting Data... {exportProgress}%
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#E5E7EB",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={{
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  width: progressAnimation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        )}

        {/* Search and Filter */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F9FAFB",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 12,
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
          >
            <Search size={20} color="#6B7280" />
            <TextInput
              style={{
                flex: 1,
                height: 48,
                marginLeft: 12,
                fontSize: 16,
                color: "#1F2937",
              }}
              placeholder="Search stations by ID, name, state, or district"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Toggle */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: showFilters ? "#3B82F6" : "#F9FAFB",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: showFilters ? "#3B82F6" : "#E5E7EB",
            }}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} color={showFilters ? "#FFFFFF" : "#6B7280"} />
            <Text
              style={{
                color: showFilters ? "#FFFFFF" : "#6B7280",
                fontSize: 14,
                fontWeight: "500",
                marginLeft: 8,
                flex: 1,
              }}
            >
              Filters & Sort
            </Text>
            <ChevronDown
              size={16}
              color={showFilters ? "#FFFFFF" : "#6B7280"}
              style={{
                transform: [{ rotate: showFilters ? "180deg" : "0deg" }],
              }}
            />
          </TouchableOpacity>

          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 12 }}
            >
              {activeFilters.map((filter, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#DBEAFE",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginRight: 8,
                    marginBottom: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#1E40AF",
                      fontWeight: "500",
                    }}
                  >
                    {filter}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: "#FEE2E2",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={clearFilters}
              >
                <X size={12} color="#DC2626" />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#DC2626",
                    fontWeight: "500",
                    marginLeft: 4,
                  }}
                >
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Filter Options */}
          {showFilters && (
            <View
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 12,
                padding: 16,
                marginTop: 12,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              {/* Sort Options */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 12,
                }}
              >
                Sort By
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                {[
                  { key: "Station_Name", label: "Name" },
                  { key: "Water_Level_m", label: "Water Level" },
                  { key: "Recharge_Estimate", label: "Recharge Rate" },
                  { key: "Status", label: "Status" },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={{
                      backgroundColor:
                        sortBy === option.key ? "#3B82F6" : "#FFFFFF",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      marginRight: 8,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor:
                        sortBy === option.key ? "#3B82F6" : "#D1D5DB",
                    }}
                    onPress={() => {
                      if (sortBy === option.key) {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setSortBy(option.key);
                        setSortOrder("asc");
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: sortBy === option.key ? "#FFFFFF" : "#374151",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      {option.label}{" "}
                      {sortBy === option.key &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* State Filter */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                State
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: !selectedState ? "#3B82F6" : "#FFFFFF",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 6,
                    marginRight: 8,
                    borderWidth: 1,
                    borderColor: !selectedState ? "#3B82F6" : "#D1D5DB",
                  }}
                  onPress={() => setSelectedState("")}
                >
                  <Text
                    style={{
                      color: !selectedState ? "#FFFFFF" : "#374151",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    All States
                  </Text>
                </TouchableOpacity>
                {getUniqueStates().map((state) => (
                  <TouchableOpacity
                    key={state}
                    style={{
                      backgroundColor:
                        selectedState === state ? "#3B82F6" : "#FFFFFF",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      marginRight: 8,
                      borderWidth: 1,
                      borderColor:
                        selectedState === state ? "#3B82F6" : "#D1D5DB",
                    }}
                    onPress={() => setSelectedState(state)}
                  >
                    <Text
                      style={{
                        color: selectedState === state ? "#FFFFFF" : "#374151",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      {state}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Status Filter */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                Status
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {["", "Normal", "Caution", "Critical"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={{
                      backgroundColor:
                        selectedStatus === status ? "#3B82F6" : "#FFFFFF",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      marginRight: 8,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor:
                        selectedStatus === status ? "#3B82F6" : "#D1D5DB",
                    }}
                    onPress={() => setSelectedStatus(status)}
                  >
                    <Text
                      style={{
                        color:
                          selectedStatus === status ? "#FFFFFF" : "#374151",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      {status || "All Status"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Results Count */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: "#6B7280" }}>
            Showing {filteredStations.length} of {stations.length} stations
          </Text>
        </View>

        {/* Stations List */}
        <View style={{ paddingHorizontal: 20 }}>
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <TouchableOpacity
                key={station.Station_ID}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  padding: 16,
                  marginBottom: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }}
                onPress={() => handleStationPress(station.Station_ID)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1F2937",
                        marginBottom: 4,
                      }}
                    >
                      {station.Station_Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        marginBottom: 2,
                      }}
                    >
                      ID: {station.Station_ID}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#374151" }}>
                      {station.District}, {station.State}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: getStatusBgColor(station.Status),
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: getStatusColor(station.Status),
                        marginRight: 6,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: getStatusColor(station.Status),
                      }}
                    >
                      {station.Status}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        marginBottom: 2,
                      }}
                    >
                      Water Level
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1F2937",
                      }}
                    >
                      {station.Water_Level_m}m
                    </Text>
                    <Text style={{ fontSize: 10, color: "#6B7280" }}>
                      Below Ground Level
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        marginBottom: 2,
                      }}
                    >
                      Recharge Rate
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#1F2937",
                      }}
                    >
                      {station.Recharge_Estimate}
                    </Text>
                    <Text style={{ fontSize: 10, color: "#6B7280" }}>m³</Text>
                  </View>

                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        marginBottom: 2,
                      }}
                    >
                      Daily Change
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color:
                          station.Daily_Change >= 0 ? "#10B981" : "#EF4444",
                      }}
                    >
                      {station.Daily_Change >= 0 ? "+" : ""}
                      {station.Daily_Change}m
                    </Text>
                    <Text style={{ fontSize: 10, color: "#6B7280" }}>
                      per day
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                backgroundColor: "#F9FAFB",
                padding: 32,
                borderRadius: 12,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                No Stations Found
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                Try adjusting your search criteria or filters to see more
                results.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#3B82F6",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
                onPress={clearFilters}
              >
                <Text
                  style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "500" }}
                >
                  Clear Filters
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}