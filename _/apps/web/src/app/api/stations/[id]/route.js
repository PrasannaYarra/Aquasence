export async function GET(request, { params }) {
  const { id } = params;
  
  // Extended station data with historical and daily readings
  const stationDetails = {
    "GW001": {
      "Station_ID": "GW001",
      "Station_Name": "Bengaluru Central",
      "State": "Karnataka",
      "District": "Bengaluru Urban",
      "Latitude": 12.9716,
      "Longitude": 77.5946,
      "Water_Level_m": 8.5,
      "Recharge_Estimate": 0.12,
      "Last_Updated": "2024-09-17T14:00:00Z",
      "Daily_Change": -0.05,
      "Status": "Caution",
      "Historical_Data": [
        {"Date": "2024-03-17", "Water_Level": 7.8, "Rainfall": 2.5, "Recharge": 0.10},
        {"Date": "2024-04-17", "Water_Level": 8.1, "Rainfall": 15.2, "Recharge": 0.11},
        {"Date": "2024-05-17", "Water_Level": 8.3, "Rainfall": 45.8, "Recharge": 0.12},
        {"Date": "2024-06-17", "Water_Level": 8.5, "Rainfall": 85.6, "Recharge": 0.13},
        {"Date": "2024-07-17", "Water_Level": 8.2, "Rainfall": 125.4, "Recharge": 0.12},
        {"Date": "2024-08-17", "Water_Level": 8.0, "Rainfall": 95.2, "Recharge": 0.11},
        {"Date": "2024-09-17", "Water_Level": 8.5, "Rainfall": 35.8, "Recharge": 0.12}
      ],
      "Daily_Readings": [
        {"Time": "00:00", "Water_Level": 8.6},
        {"Time": "06:00", "Water_Level": 8.5},
        {"Time": "12:00", "Water_Level": 8.4},
        {"Time": "18:00", "Water_Level": 8.5}
      ]
    },
    "GW002": {
      "Station_ID": "GW002",
      "Station_Name": "Mumbai Marine Drive",
      "State": "Maharashtra",
      "District": "Mumbai",
      "Latitude": 18.9220,
      "Longitude": 72.8347,
      "Water_Level_m": 3.2,
      "Recharge_Estimate": 0.18,
      "Last_Updated": "2024-09-17T14:00:00Z",
      "Daily_Change": 0.02,
      "Status": "Normal",
      "Historical_Data": [
        {"Date": "2024-03-17", "Water_Level": 3.0, "Rainfall": 0.8, "Recharge": 0.16},
        {"Date": "2024-04-17", "Water_Level": 3.1, "Rainfall": 8.4, "Recharge": 0.17},
        {"Date": "2024-05-17", "Water_Level": 3.3, "Rainfall": 25.6, "Recharge": 0.18},
        {"Date": "2024-06-17", "Water_Level": 3.5, "Rainfall": 185.2, "Recharge": 0.20},
        {"Date": "2024-07-17", "Water_Level": 3.2, "Rainfall": 215.8, "Recharge": 0.19},
        {"Date": "2024-08-17", "Water_Level": 3.1, "Rainfall": 165.4, "Recharge": 0.18},
        {"Date": "2024-09-17", "Water_Level": 3.2, "Rainfall": 45.2, "Recharge": 0.18}
      ],
      "Daily_Readings": [
        {"Time": "00:00", "Water_Level": 3.1},
        {"Time": "06:00", "Water_Level": 3.2},
        {"Time": "12:00", "Water_Level": 3.3},
        {"Time": "18:00", "Water_Level": 3.2}
      ]
    },
    "GW003": {
      "Station_ID": "GW003",
      "Station_Name": "Delhi South",
      "State": "Delhi",
      "District": "South Delhi",
      "Latitude": 28.5355,
      "Longitude": 77.2910,
      "Water_Level_m": 12.8,
      "Recharge_Estimate": 0.08,
      "Last_Updated": "2024-09-17T14:00:00Z",
      "Daily_Change": -0.12,
      "Status": "Critical",
      "Historical_Data": [
        {"Date": "2024-03-17", "Water_Level": 11.5, "Rainfall": 1.2, "Recharge": 0.06},
        {"Date": "2024-04-17", "Water_Level": 11.8, "Rainfall": 5.8, "Recharge": 0.07},
        {"Date": "2024-05-17", "Water_Level": 12.2, "Rainfall": 12.4, "Recharge": 0.08},
        {"Date": "2024-06-17", "Water_Level": 12.5, "Rainfall": 45.6, "Recharge": 0.09},
        {"Date": "2024-07-17", "Water_Level": 12.3, "Rainfall": 85.2, "Recharge": 0.08},
        {"Date": "2024-08-17", "Water_Level": 12.6, "Rainfall": 65.8, "Recharge": 0.08},
        {"Date": "2024-09-17", "Water_Level": 12.8, "Rainfall": 25.4, "Recharge": 0.08}
      ],
      "Daily_Readings": [
        {"Time": "00:00", "Water_Level": 12.6},
        {"Time": "06:00", "Water_Level": 12.7},
        {"Time": "12:00", "Water_Level": 12.9},
        {"Time": "18:00", "Water_Level": 12.8}
      ]
    }
  };

  const station = stationDetails[id] || stationDetails["GW001"];
  
  return Response.json({ 
    success: true, 
    station: station 
  });
}