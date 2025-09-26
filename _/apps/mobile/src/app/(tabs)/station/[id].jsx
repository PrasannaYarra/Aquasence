import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Download,
  Calendar,
  Droplets,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import { LineGraph } from "react-native-graph";
import { router, useLocalSearchParams } from "expo-router";

// Local stations data - same as used in other screens
const stationsData = [
  {
    "Station_ID": "GW001",
    "Station_Name": "Bengaluru Central",
    "State": "Karnataka",
    "District": "Bengaluru Urban",
    "Water_Level_m": 8.5,
    "Recharge_Estimate": 0.12,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.05,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 8.3, "Rainfall": 15.5, "Recharge": 0.11 },
      { "Date": "2024-05-17", "Water_Level": 8.4, "Rainfall": 45.2, "Recharge": 0.12 },
      { "Date": "2024-06-17", "Water_Level": 8.6, "Rainfall": 95.8, "Recharge": 0.13 },
      { "Date": "2024-07-17", "Water_Level": 8.7, "Rainfall": 110.6, "Recharge": 0.13 },
      { "Date": "2024-08-17", "Water_Level": 8.6, "Rainfall": 90.2, "Recharge": 0.12 },
      { "Date": "2024-09-17", "Water_Level": 8.5, "Rainfall": 55.8, "Recharge": 0.12 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 8.6 },
      { "Time": "06:00", "Water_Level": 8.5 },
      { "Time": "12:00", "Water_Level": 8.4 },
      { "Time": "18:00", "Water_Level": 8.5 }
    ]
  },
  {
    "Station_ID": "GW002",
    "Station_Name": "Mumbai Marine Drive",
    "State": "Maharashtra",
    "District": "Mumbai",
    "Water_Level_m": 3.2,
    "Recharge_Estimate": 0.18,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.02,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 3.0, "Rainfall": 10.8, "Recharge": 0.17 },
      { "Date": "2024-05-17", "Water_Level": 3.1, "Rainfall": 58.4, "Recharge": 0.18 },
      { "Date": "2024-06-17", "Water_Level": 3.3, "Rainfall": 250.6, "Recharge": 0.19 },
      { "Date": "2024-07-17", "Water_Level": 3.4, "Rainfall": 385.2, "Recharge": 0.19 },
      { "Date": "2024-08-17", "Water_Level": 3.3, "Rainfall": 365.4, "Recharge": 0.18 },
      { "Date": "2024-09-17", "Water_Level": 3.2, "Rainfall": 145.2, "Recharge": 0.18 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 3.1 },
      { "Time": "06:00", "Water_Level": 3.2 },
      { "Time": "12:00", "Water_Level": 3.3 },
      { "Time": "18:00", "Water_Level": 3.2 }
    ]
  },
  {
    "Station_ID": "GW003",
    "Station_Name": "Delhi South",
    "State": "Delhi",
    "District": "South Delhi",
    "Water_Level_m": 12.8,
    "Recharge_Estimate": 0.08,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.12,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 12.5, "Rainfall": 5.2, "Recharge": 0.07 },
      { "Date": "2024-05-17", "Water_Level": 12.6, "Rainfall": 15.8, "Recharge": 0.07 },
      { "Date": "2024-06-17", "Water_Level": 12.7, "Rainfall": 52.4, "Recharge": 0.08 },
      { "Date": "2024-07-17", "Water_Level": 12.9, "Rainfall": 95.6, "Recharge": 0.09 },
      { "Date": "2024-08-17", "Water_Level": 12.9, "Rainfall": 85.8, "Recharge": 0.08 },
      { "Date": "2024-09-17", "Water_Level": 12.8, "Rainfall": 45.4, "Recharge": 0.08 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 12.9 },
      { "Time": "06:00", "Water_Level": 12.8 },
      { "Time": "12:00", "Water_Level": 12.7 },
      { "Time": "18:00", "Water_Level": 12.8 }
    ]
  },
  {
    "Station_ID": "GW004",
    "Station_Name": "Chennai Central",
    "State": "Tamil Nadu",
    "District": "Chennai",
    "Water_Level_m": 6.5,
    "Recharge_Estimate": 0.15,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.08,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 6.3, "Rainfall": 8.5, "Recharge": 0.14 },
      { "Date": "2024-05-17", "Water_Level": 6.2, "Rainfall": 28.2, "Recharge": 0.14 },
      { "Date": "2024-06-17", "Water_Level": 6.3, "Rainfall": 55.8, "Recharge": 0.15 },
      { "Date": "2024-07-17", "Water_Level": 6.5, "Rainfall": 105.6, "Recharge": 0.16 },
      { "Date": "2024-08-17", "Water_Level": 6.6, "Rainfall": 125.2, "Recharge": 0.16 },
      { "Date": "2024-09-17", "Water_Level": 6.5, "Rainfall": 65.8, "Recharge": 0.15 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 6.4 },
      { "Time": "06:00", "Water_Level": 6.5 },
      { "Time": "12:00", "Water_Level": 6.6 },
      { "Time": "18:00", "Water_Level": 6.5 }
    ]
  },
  {
    "Station_ID": "GW005",
    "Station_Name": "Kolkata East",
    "State": "West Bengal",
    "District": "Kolkata",
    "Water_Level_m": 4.2,
    "Recharge_Estimate": 0.22,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.05,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 4.0, "Rainfall": 18.5, "Recharge": 0.21 },
      { "Date": "2024-05-17", "Water_Level": 4.1, "Rainfall": 65.2, "Recharge": 0.22 },
      { "Date": "2024-06-17", "Water_Level": 4.3, "Rainfall": 285.8, "Recharge": 0.23 },
      { "Date": "2024-07-17", "Water_Level": 4.4, "Rainfall": 350.6, "Recharge": 0.23 },
      { "Date": "2024-08-17", "Water_Level": 4.3, "Rainfall": 320.2, "Recharge": 0.22 },
      { "Date": "2024-09-17", "Water_Level": 4.2, "Rainfall": 185.8, "Recharge": 0.22 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 4.1 },
      { "Time": "06:00", "Water_Level": 4.2 },
      { "Time": "12:00", "Water_Level": 4.3 },
      { "Time": "18:00", "Water_Level": 4.2 }
    ]
  },
  {
    "Station_ID": "GW006",
    "Station_Name": "Hyderabad Tech City",
    "State": "Telangana",
    "District": "Hyderabad",
    "Water_Level_m": 15.2,
    "Recharge_Estimate": 0.05,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.18,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 14.8, "Rainfall": 12.5, "Recharge": 0.04 },
      { "Date": "2024-05-17", "Water_Level": 14.9, "Rainfall": 35.2, "Recharge": 0.05 },
      { "Date": "2024-06-17", "Water_Level": 15.1, "Rainfall": 115.8, "Recharge": 0.06 },
      { "Date": "2024-07-17", "Water_Level": 15.3, "Rainfall": 150.6, "Recharge": 0.06 },
      { "Date": "2024-08-17", "Water_Level": 15.3, "Rainfall": 130.2, "Recharge": 0.05 },
      { "Date": "2024-09-17", "Water_Level": 15.2, "Rainfall": 75.8, "Recharge": 0.05 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 15.3 },
      { "Time": "06:00", "Water_Level": 15.2 },
      { "Time": "12:00", "Water_Level": 15.1 },
      { "Time": "18:00", "Water_Level": 15.2 }
    ]
  },
  {
    "Station_ID": "GW007",
    "Station_Name": "Pune Central",
    "State": "Maharashtra",
    "District": "Pune",
    "Water_Level_m": 7.8,
    "Recharge_Estimate": 0.14,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.03,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 7.6, "Rainfall": 5.5, "Recharge": 0.13 },
      { "Date": "2024-05-17", "Water_Level": 7.7, "Rainfall": 25.2, "Recharge": 0.14 },
      { "Date": "2024-06-17", "Water_Level": 7.9, "Rainfall": 150.8, "Recharge": 0.15 },
      { "Date": "2024-07-17", "Water_Level": 8.0, "Rainfall": 210.6, "Recharge": 0.15 },
      { "Date": "2024-08-17", "Water_Level": 7.9, "Rainfall": 180.2, "Recharge": 0.14 },
      { "Date": "2024-09-17", "Water_Level": 7.8, "Rainfall": 95.8, "Recharge": 0.14 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 7.9 },
      { "Time": "06:00", "Water_Level": 7.8 },
      { "Time": "12:00", "Water_Level": 7.7 },
      { "Time": "18:00", "Water_Level": 7.8 }
    ]
  },
  {
    "Station_ID": "GW008",
    "Station_Name": "Ahmedabad West",
    "State": "Gujarat",
    "District": "Ahmedabad",
    "Water_Level_m": 11.5,
    "Recharge_Estimate": 0.07,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.08,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 11.2, "Rainfall": 2.5, "Recharge": 0.06 },
      { "Date": "2024-05-17", "Water_Level": 11.3, "Rainfall": 10.2, "Recharge": 0.06 },
      { "Date": "2024-06-17", "Water_Level": 11.5, "Rainfall": 120.8, "Recharge": 0.07 },
      { "Date": "2024-07-17", "Water_Level": 11.7, "Rainfall": 250.6, "Recharge": 0.08 },
      { "Date": "2024-08-17", "Water_Level": 11.6, "Rainfall": 210.2, "Recharge": 0.07 },
      { "Date": "2024-09-17", "Water_Level": 11.5, "Rainfall": 100.8, "Recharge": 0.07 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 11.6 },
      { "Time": "06:00", "Water_Level": 11.5 },
      { "Time": "12:00", "Water_Level": 11.4 },
      { "Time": "18:00", "Water_Level": 11.5 }
    ]
  },
  {
    "Station_ID": "GW009",
    "Station_Name": "Jaipur City",
    "State": "Rajasthan",
    "District": "Jaipur",
    "Water_Level_m": 18.5,
    "Recharge_Estimate": 0.03,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.15,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 18.2, "Rainfall": 3.5, "Recharge": 0.02 },
      { "Date": "2024-05-17", "Water_Level": 18.3, "Rainfall": 8.2, "Recharge": 0.02 },
      { "Date": "2024-06-17", "Water_Level": 18.4, "Rainfall": 60.8, "Recharge": 0.03 },
      { "Date": "2024-07-17", "Water_Level": 18.6, "Rainfall": 150.6, "Recharge": 0.04 },
      { "Date": "2024-08-17", "Water_Level": 18.6, "Rainfall": 140.2, "Recharge": 0.03 },
      { "Date": "2024-09-17", "Water_Level": 18.5, "Rainfall": 70.8, "Recharge": 0.03 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 18.6 },
      { "Time": "06:00", "Water_Level": 18.5 },
      { "Time": "12:00", "Water_Level": 18.4 },
      { "Time": "18:00", "Water_Level": 18.5 }
    ]
  },
  {
    "Station_ID": "GW010",
    "Station_Name": "Kochi Marine",
    "State": "Kerala",
    "District": "Ernakulam",
    "Water_Level_m": 2.8,
    "Recharge_Estimate": 0.25,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.12,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 2.6, "Rainfall": 25.5, "Recharge": 0.24 },
      { "Date": "2024-05-17", "Water_Level": 2.7, "Rainfall": 150.2, "Recharge": 0.25 },
      { "Date": "2024-06-17", "Water_Level": 2.9, "Rainfall": 450.8, "Recharge": 0.26 },
      { "Date": "2024-07-17", "Water_Level": 3.0, "Rainfall": 550.6, "Recharge": 0.26 },
      { "Date": "2024-08-17", "Water_Level": 2.9, "Rainfall": 510.2, "Recharge": 0.25 },
      { "Date": "2024-09-17", "Water_Level": 2.8, "Rainfall": 250.8, "Recharge": 0.25 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 2.7 },
      { "Time": "06:00", "Water_Level": 2.8 },
      { "Time": "12:00", "Water_Level": 2.9 },
      { "Time": "18:00", "Water_Level": 2.8 }
    ]
  },
  {
    "Station_ID": "GW011",
    "Station_Name": "Bhopal Central",
    "State": "Madhya Pradesh",
    "District": "Bhopal",
    "Water_Level_m": 9.2,
    "Recharge_Estimate": 0.1,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.06,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 9.0, "Rainfall": 8.5, "Recharge": 0.09 },
      { "Date": "2024-05-17", "Water_Level": 9.1, "Rainfall": 20.2, "Recharge": 0.1 },
      { "Date": "2024-06-17", "Water_Level": 9.3, "Rainfall": 180.8, "Recharge": 0.11 },
      { "Date": "2024-07-17", "Water_Level": 9.4, "Rainfall": 280.6, "Recharge": 0.11 },
      { "Date": "2024-08-17", "Water_Level": 9.3, "Rainfall": 250.2, "Recharge": 0.1 },
      { "Date": "2024-09-17", "Water_Level": 9.2, "Rainfall": 120.8, "Recharge": 0.1 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 9.3 },
      { "Time": "06:00", "Water_Level": 9.2 },
      { "Time": "12:00", "Water_Level": 9.1 },
      { "Time": "18:00", "Water_Level": 9.2 }
    ]
  },
  {
    "Station_ID": "GW012",
    "Station_Name": "Lucknow North",
    "State": "Uttar Pradesh",
    "District": "Lucknow",
    "Water_Level_m": 13.8,
    "Recharge_Estimate": 0.06,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.1,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 13.5, "Rainfall": 4.5, "Recharge": 0.05 },
      { "Date": "2024-05-17", "Water_Level": 13.6, "Rainfall": 12.2, "Recharge": 0.05 },
      { "Date": "2024-06-17", "Water_Level": 13.8, "Rainfall": 110.8, "Recharge": 0.06 },
      { "Date": "2024-07-17", "Water_Level": 14.0, "Rainfall": 220.6, "Recharge": 0.07 },
      { "Date": "2024-08-17", "Water_Level": 13.9, "Rainfall": 200.2, "Recharge": 0.06 },
      { "Date": "2024-09-17", "Water_Level": 13.8, "Rainfall": 90.8, "Recharge": 0.06 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 13.9 },
      { "Time": "06:00", "Water_Level": 13.8 },
      { "Time": "12:00", "Water_Level": 13.7 },
      { "Time": "18:00", "Water_Level": 13.8 }
    ]
  },
  {
    "Station_ID": "GW013",
    "Station_Name": "Patna East",
    "State": "Bihar",
    "District": "Patna",
    "Water_Level_m": 5.5,
    "Recharge_Estimate": 0.16,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.04,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 5.3, "Rainfall": 10.5, "Recharge": 0.15 },
      { "Date": "2024-05-17", "Water_Level": 5.4, "Rainfall": 30.2, "Recharge": 0.16 },
      { "Date": "2024-06-17", "Water_Level": 5.6, "Rainfall": 190.8, "Recharge": 0.17 },
      { "Date": "2024-07-17", "Water_Level": 5.7, "Rainfall": 310.6, "Recharge": 0.17 },
      { "Date": "2024-08-17", "Water_Level": 5.6, "Rainfall": 280.2, "Recharge": 0.16 },
      { "Date": "2024-09-17", "Water_Level": 5.5, "Rainfall": 150.8, "Recharge": 0.16 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 5.4 },
      { "Time": "06:00", "Water_Level": 5.5 },
      { "Time": "12:00", "Water_Level": 5.6 },
      { "Time": "18:00", "Water_Level": 5.5 }
    ]
  },
  {
    "Station_ID": "GW014",
    "Station_Name": "Chandigarh Central",
    "State": "Chandigarh",
    "District": "Chandigarh",
    "Water_Level_m": 4.8,
    "Recharge_Estimate": 0.19,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.07,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 4.6, "Rainfall": 12.5, "Recharge": 0.18 },
      { "Date": "2024-05-17", "Water_Level": 4.7, "Rainfall": 40.2, "Recharge": 0.19 },
      { "Date": "2024-06-17", "Water_Level": 4.9, "Rainfall": 220.8, "Recharge": 0.2 },
      { "Date": "2024-07-17", "Water_Level": 5.0, "Rainfall": 350.6, "Recharge": 0.2 },
      { "Date": "2024-08-17", "Water_Level": 4.9, "Rainfall": 310.2, "Recharge": 0.19 },
      { "Date": "2024-09-17", "Water_Level": 4.8, "Rainfall": 180.8, "Recharge": 0.19 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 4.7 },
      { "Time": "06:00", "Water_Level": 4.8 },
      { "Time": "12:00", "Water_Level": 4.9 },
      { "Time": "18:00", "Water_Level": 4.8 }
    ]
  },
  {
    "Station_ID": "GW015",
    "Station_Name": "Guwahati Central",
    "State": "Assam",
    "District": "Kamrup",
    "Water_Level_m": 3.5,
    "Recharge_Estimate": 0.24,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.09,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 3.3, "Rainfall": 45.5, "Recharge": 0.23 },
      { "Date": "2024-05-17", "Water_Level": 3.4, "Rainfall": 180.2, "Recharge": 0.24 },
      { "Date": "2024-06-17", "Water_Level": 3.6, "Rainfall": 400.8, "Recharge": 0.25 },
      { "Date": "2024-07-17", "Water_Level": 3.7, "Rainfall": 510.6, "Recharge": 0.25 },
      { "Date": "2024-08-17", "Water_Level": 3.6, "Rainfall": 480.2, "Recharge": 0.24 },
      { "Date": "2024-09-17", "Water_Level": 3.5, "Rainfall": 280.8, "Recharge": 0.24 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 3.4 },
      { "Time": "06:00", "Water_Level": 3.5 },
      { "Time": "12:00", "Water_Level": 3.6 },
      { "Time": "18:00", "Water_Level": 3.5 }
    ]
  },
  {
    "Station_ID": "GW016",
    "Station_Name": "Bhubaneswar Tech",
    "State": "Odisha",
    "District": "Khorda",
    "Water_Level_m": 6.8,
    "Recharge_Estimate": 0.13,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.03,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 6.6, "Rainfall": 15.5, "Recharge": 0.12 },
      { "Date": "2024-05-17", "Water_Level": 6.7, "Rainfall": 50.2, "Recharge": 0.13 },
      { "Date": "2024-06-17", "Water_Level": 6.9, "Rainfall": 250.8, "Recharge": 0.14 },
      { "Date": "2024-07-17", "Water_Level": 7.0, "Rainfall": 380.6, "Recharge": 0.14 },
      { "Date": "2024-08-17", "Water_Level": 6.9, "Rainfall": 350.2, "Recharge": 0.13 },
      { "Date": "2024-09-17", "Water_Level": 6.8, "Rainfall": 200.8, "Recharge": 0.13 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 6.7 },
      { "Time": "06:00", "Water_Level": 6.8 },
      { "Time": "12:00", "Water_Level": 6.9 },
      { "Time": "18:00", "Water_Level": 6.8 }
    ]
  },
  {
    "Station_ID": "GW017",
    "Station_Name": "Thiruvananthapuram South",
    "State": "Kerala",
    "District": "Thiruvananthapuram",
    "Water_Level_m": 2.5,
    "Recharge_Estimate": 0.28,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.15,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 2.3, "Rainfall": 35.5, "Recharge": 0.27 },
      { "Date": "2024-05-17", "Water_Level": 2.4, "Rainfall": 180.2, "Recharge": 0.28 },
      { "Date": "2024-06-17", "Water_Level": 2.6, "Rainfall": 480.8, "Recharge": 0.29 },
      { "Date": "2024-07-17", "Water_Level": 2.7, "Rainfall": 580.6, "Recharge": 0.29 },
      { "Date": "2024-08-17", "Water_Level": 2.6, "Rainfall": 550.2, "Recharge": 0.28 },
      { "Date": "2024-09-17", "Water_Level": 2.5, "Rainfall": 280.8, "Recharge": 0.28 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 2.4 },
      { "Time": "06:00", "Water_Level": 2.5 },
      { "Time": "12:00", "Water_Level": 2.6 },
      { "Time": "18:00", "Water_Level": 2.5 }
    ]
  },
  {
    "Station_ID": "GW018",
    "Station_Name": "Indore Central",
    "State": "Madhya Pradesh",
    "District": "Indore",
    "Water_Level_m": 10.5,
    "Recharge_Estimate": 0.09,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.07,
    "Status": "Critical",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 10.2, "Rainfall": 6.5, "Recharge": 0.08 },
      { "Date": "2024-05-17", "Water_Level": 10.3, "Rainfall": 18.2, "Recharge": 0.08 },
      { "Date": "2024-06-17", "Water_Level": 10.5, "Rainfall": 150.8, "Recharge": 0.09 },
      { "Date": "2024-07-17", "Water_Level": 10.7, "Rainfall": 250.6, "Recharge": 0.1 },
      { "Date": "2024-08-17", "Water_Level": 10.6, "Rainfall": 230.2, "Recharge": 0.09 },
      { "Date": "2024-09-17", "Water_Level": 10.5, "Rainfall": 110.8, "Recharge": 0.09 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 10.6 },
      { "Time": "06:00", "Water_Level": 10.5 },
      { "Time": "12:00", "Water_Level": 10.4 },
      { "Time": "18:00", "Water_Level": 10.5 }
    ]
  },
  {
    "Station_ID": "GW019",
    "Station_Name": "Coimbatore West",
    "State": "Tamil Nadu",
    "District": "Coimbatore",
    "Water_Level_m": 8.2,
    "Recharge_Estimate": 0.11,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": -0.04,
    "Status": "Caution",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 8.0, "Rainfall": 12.5, "Recharge": 0.1 },
      { "Date": "2024-05-17", "Water_Level": 8.1, "Rainfall": 40.2, "Recharge": 0.11 },
      { "Date": "2024-06-17", "Water_Level": 8.3, "Rainfall": 90.8, "Recharge": 0.12 },
      { "Date": "2024-07-17", "Water_Level": 8.4, "Rainfall": 120.6, "Recharge": 0.12 },
      { "Date": "2024-08-17", "Water_Level": 8.3, "Rainfall": 110.2, "Recharge": 0.11 },
      { "Date": "2024-09-17", "Water_Level": 8.2, "Rainfall": 60.8, "Recharge": 0.11 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 8.3 },
      { "Time": "06:00", "Water_Level": 8.2 },
      { "Time": "12:00", "Water_Level": 8.1 },
      { "Time": "18:00", "Water_Level": 8.2 }
    ]
  },
  {
    "Station_ID": "GW020",
    "Station_Name": "Visakhapatnam Port",
    "State": "Andhra Pradesh",
    "District": "Visakhapatnam",
    "Water_Level_m": 4.5,
    "Recharge_Estimate": 0.17,
    "Last_Updated": "2024-09-17T14:00:00Z",
    "Daily_Change": 0.06,
    "Status": "Normal",
    "Historical_Data": [
      { "Date": "2024-04-17", "Water_Level": 4.3, "Rainfall": 10.5, "Recharge": 0.16 },
      { "Date": "2024-05-17", "Water_Level": 4.4, "Rainfall": 35.2, "Recharge": 0.17 },
      { "Date": "2024-06-17", "Water_Level": 4.6, "Rainfall": 150.8, "Recharge": 0.18 },
      { "Date": "2024-07-17", "Water_Level": 4.7, "Rainfall": 250.6, "Recharge": 0.18 },
      { "Date": "2024-08-17", "Water_Level": 4.6, "Rainfall": 220.2, "Recharge": 0.17 },
      { "Date": "2024-09-17", "Water_Level": 4.5, "Rainfall": 130.8, "Recharge": 0.17 }
    ],
    "Daily_Readings": [
      { "Time": "00:00", "Water_Level": 4.4 },
      { "Time": "06:00", "Water_Level": 4.5 },
      { "Time": "12:00", "Water_Level": 4.6 },
      { "Time": "18:00", "Water_Level": 4.5 }
    ]
  }
];

export default function StationDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const windowWidth = Dimensions.get("window").width;
  const [station, setStation] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: "2024-04-17",
    to: "2024-09-17",
  });

  // Animation for export progress
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchStationDetails();

    // Simulate 6-hour auto-refresh
    const refreshInterval = setInterval(() => {
      fetchStationDetails();
    }, 21600000); // 6 hours in milliseconds

    return () => clearInterval(refreshInterval);
  }, [id]);

  const fetchStationDetails = () => {
    // Find station from local data based on ID
    const foundStation = stationsData.find((s) => s.Station_ID === id);
    if (foundStation) {
      setStation(foundStation);
    }
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!station) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark" />
        <Text style={{ fontSize: 16, color: "#6B7280" }}>
          Loading station details...
        </Text>
      </View>
    );
  }

  // Prepare chart data
  const dailyReadingsData = station.Daily_Readings.map((reading) => ({
    date: new Date(`2024-09-17T${reading.Time}:00`),
    value: reading.Water_Level,
  }));

  const historicalWaterData = station.Historical_Data.map((data) => ({
    date: new Date(data.Date),
    value: data.Water_Level,
  }));

  const monthlyRechargeData = station.Historical_Data.map((data) => ({
    date: new Date(data.Date),
    value: data.Recharge,
  }));

  const correlationData = station.Historical_Data.map((data) => ({
    date: new Date(data.Date),
    value: data.Rainfall,
  }));

  const filteredHistoricalData = station.Historical_Data.filter((data) => {
    const date = new Date(data.Date);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    return date >= fromDate && date <= toDate;
  });

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
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#1F2937" }}
              >
                {station.Station_Name}
              </Text>
              <Text style={{ fontSize: 14, color: "#6B7280" }}>
                {station.District}, {station.State}
              </Text>
            </View>
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

        {/* Status Banner */}
        <View
          style={{
            backgroundColor: getStatusBgColor(station.Status),
            marginHorizontal: 20,
            marginVertical: 16,
            padding: 16,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: getStatusColor(station.Status),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: getStatusColor(station.Status),
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: getStatusColor(station.Status),
              }}
            >
              {station.Status} Status
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: "#374151" }}>
            Last updated: {formatDateTime(station.Last_Updated)}
          </Text>
        </View>

        {/* Key Metrics */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 16,
            }}
          >
            Current Metrics
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ flex: 1, marginRight: 6 }}>
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
                  CURRENT LEVEL
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "#1E40AF" }}
                >
                  {station.Water_Level_m}m
                </Text>
                <Text style={{ fontSize: 10, color: "#6B7280" }}>
                  Below Ground Level
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 6 }}>
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
                  RECHARGE STATUS
                </Text>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "#15803D" }}
                >
                  {station.Recharge_Estimate}
                </Text>
                <Text style={{ fontSize: 10, color: "#6B7280" }}>m³</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor:
                station.Daily_Change >= 0 ? "#F0FDF4" : "#FEF2F2",
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: station.Daily_Change >= 0 ? "#BBF7D0" : "#FECACA",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {station.Daily_Change >= 0 ? (
              <TrendingUp size={20} color="#15803D" />
            ) : (
              <TrendingDown size={20} color="#DC2626" />
            )}
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: station.Daily_Change >= 0 ? "#16A34A" : "#DC2626",
                  marginBottom: 4,
                }}
              >
                AVG DAILY CHANGE
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: station.Daily_Change >= 0 ? "#15803D" : "#B91C1C",
                }}
              >
                {station.Daily_Change >= 0 ? "+" : ""}
                {station.Daily_Change}m
              </Text>
              <Text style={{ fontSize: 10, color: "#6B7280" }}>
                per day (24-hour period)
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Groundwater Level Chart */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 8,
            }}
          >
            Today's Water Level Trend
          </Text>
          <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
            6-hour interval readings (updates every 6 hours)
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: "#374151" }}
              >
                Water Level (meters)
              </Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>
                Time of Day
              </Text>
            </View>
            <View style={{ height: 200 }}>
              <LineGraph
                points={dailyReadingsData}
                color="#3B82F6"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={200}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(59, 130, 246, 0.2)",
                  "rgba(59, 130, 246, 0)",
                ]}
              />
            </View>
          </View>
        </View>

        {/* Historical Water Level Chart */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 8,
            }}
          >
            Historical Water Level (Last 12 Months)
          </Text>
          <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
            Monthly water level trends
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
            }}
          >
            <View style={{ height: 200 }}>
              <LineGraph
                points={historicalWaterData}
                color="#8B5CF6"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={200}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(139, 92, 246, 0.2)",
                  "rgba(139, 92, 246, 0)",
                ]}
              />
            </View>
          </View>
        </View>

        {/* Monthly Recharge Estimate Chart */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 8,
            }}
          >
            Monthly Recharge Estimate
          </Text>
          <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
            Groundwater recharge rates (m³)
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
            }}
          >
            <View style={{ height: 200 }}>
              <LineGraph
                points={monthlyRechargeData}
                color="#10B981"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={200}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(16, 185, 129, 0.2)",
                  "rgba(16, 185, 129, 0)",
                ]}
              />
            </View>
          </View>
        </View>

        {/* Correlation Chart (Rainfall vs Water Level) */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#1F2937",
              marginBottom: 8,
            }}
          >
            Rainfall vs Water Level Correlation
          </Text>
          <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
            Shows relationship between rainfall and groundwater recharge
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              padding: 16,
            }}
          >
            <View style={{ height: 200 }}>
              <LineGraph
                points={correlationData}
                color="#F59E0B"
                animated={true}
                enablePanGesture={true}
                style={{ width: "100%", height: "100%" }}
                height={200}
                width={windowWidth - 72}
                gradientFillColors={[
                  "rgba(245, 158, 11, 0.2)",
                  "rgba(245, 158, 11, 0)",
                ]}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <Text
                style={{ fontSize: 12, color: "#F59E0B", fontWeight: "500" }}
              >
                ● Rainfall (mm)
              </Text>
              <Text
                style={{ fontSize: 12, color: "#3B82F6", fontWeight: "500" }}
              >
                Higher rainfall typically increases groundwater recharge
              </Text>
            </View>
          </View>
        </View>

        {/* Historical Data Table */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#1F2937" }}>
              Historical Data
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F3F4F6",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => setShowHistoricalData(!showHistoricalData)}
            >
              <Calendar size={16} color="#6B7280" />
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                  fontWeight: "500",
                  marginLeft: 4,
                }}
              >
                Date Range
              </Text>
            </TouchableOpacity>
          </View>

          {showHistoricalData && (
            <View
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 12,
                }}
              >
                Custom Date Range
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text
                    style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}
                  >
                    From
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#D1D5DB",
                      borderRadius: 8,
                      padding: 12,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "#374151" }}>
                      {dateRange.from}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text
                    style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}
                  >
                    To
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#D1D5DB",
                      borderRadius: 8,
                      padding: 12,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "#374151" }}>
                      {dateRange.to}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              overflow: "hidden",
            }}
          >
            {/* Table Header */}
            <View
              style={{
                backgroundColor: "#F9FAFB",
                flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                }}
              >
                Water Level (m)
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                }}
              >
                Rainfall (mm)
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "right",
                }}
              >
                Recharge
              </Text>
            </View>

            {/* Table Rows */}
            {filteredHistoricalData.map((data, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth:
                    index < filteredHistoricalData.length - 1 ? 1 : 0,
                  borderColor: "#F3F4F6",
                }}
              >
                <Text style={{ flex: 1, fontSize: 12, color: "#374151" }}>
                  {new Date(data.Date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
                  {data.Water_Level}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
                  {data.Rainfall}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: "#374151",
                    textAlign: "right",
                  }}
                >
                  {data.Recharge}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}