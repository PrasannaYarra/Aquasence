import { Tabs } from "expo-router";
import { Home, MapPin, FileText, Settings } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="stations"
        options={{
          title: "Stations",
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color, size }) => <FileText color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="station/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
