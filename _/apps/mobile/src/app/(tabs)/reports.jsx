import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, Download, Share, Calendar, Filter, BarChart3, Mail, Plus, Clock, Trash2 } from 'lucide-react-native';

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('generate');
  const [selectedState, setSelectedState] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [recentReports, setRecentReports] = useState([
    {
      id: '1',
      title: 'Karnataka Water Level Summary',
      dateGenerated: '2024-09-15',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      id: '2', 
      title: 'Critical Stations Alert Report',
      dateGenerated: '2024-09-14',
      format: 'CSV',
      size: '850 KB'
    },
    {
      id: '3',
      title: 'Monthly Recharge Analysis',
      dateGenerated: '2024-09-10',
      format: 'PDF',
      size: '5.2 MB'
    }
  ]);
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      title: 'Weekly Water Level Summary',
      frequency: 'Weekly',
      nextRun: '2024-09-22'
    },
    {
      id: '2',
      title: 'Monthly Critical Alerts',
      frequency: 'Monthly',
      nextRun: '2024-10-01'
    }
  ]);

  // Animation for generation progress
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const states = [
    'Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'West Bengal',
    'Telangana', 'Gujarat', 'Rajasthan', 'Kerala', 'Madhya Pradesh'
  ];

  const timeRanges = [
    { key: 'last_week', label: 'Last Week' },
    { key: 'last_month', label: 'Last Month' },
    { key: 'last_6_months', label: 'Last 6 Months' },
    { key: 'seasonal', label: 'Seasonal' },
    { key: 'yearly', label: 'Yearly' }
  ];

  const parameters = [
    { key: 'water_level', label: 'Water Level' },
    { key: 'recharge_rate', label: 'Recharge Rate' },
    { key: 'rainfall_vs_recharge', label: 'Rainfall vs Recharge' },
    { key: 'status_changes', label: 'Status Changes' },
    { key: 'daily_trends', label: 'Daily Trends' }
  ];

  const handleParameterToggle = (paramKey) => {
    if (selectedParameters.includes(paramKey)) {
      setSelectedParameters(selectedParameters.filter(p => p !== paramKey));
    } else {
      setSelectedParameters([...selectedParameters, paramKey]);
    }
  };

  const handleGenerateReport = () => {
    if (!selectedState || !selectedTimeRange || selectedParameters.length === 0) {
      Alert.alert('Incomplete Selection', 'Please select state, time range, and at least one parameter');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: 100,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Update progress text
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    // Simulate report generation completion
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(0);
      progressAnimation.setValue(0);

      // Add new report to recent reports
      const newReport = {
        id: Date.now().toString(),
        title: `${selectedState} ${selectedParameters.join(', ')} Report`,
        dateGenerated: new Date().toISOString().split('T')[0],
        format: 'PDF',
        size: '3.1 MB'
      };
      setRecentReports([newReport, ...recentReports]);

      Alert.alert('Success', 'Report Generated Successfully');
    }, 4000);
  };

  const handleShareReport = (report) => {
    Alert.alert('Share Report', `Share ${report.title} via:`, [
      { text: 'Email', onPress: () => Alert.alert('Success', 'Report shared via email') },
      { text: 'WhatsApp', onPress: () => Alert.alert('Success', 'Report shared via WhatsApp') },
      { text: 'Export PDF', onPress: () => Alert.alert('Success', 'PDF exported successfully') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleDownloadReport = (report) => {
    Alert.alert('Success', `${report.title} downloaded successfully`);
  };

  const handleScheduleReport = () => {
    Alert.alert('Schedule Report', 'Configure report scheduling:', [
      { text: 'Daily', onPress: () => addScheduledReport('Daily') },
      { text: 'Weekly', onPress: () => addScheduledReport('Weekly') },
      { text: 'Monthly', onPress: () => addScheduledReport('Monthly') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const addScheduledReport = (frequency) => {
    const newScheduled = {
      id: Date.now().toString(),
      title: `${frequency} Automated Report`,
      frequency: frequency,
      nextRun: '2024-09-25'
    };
    setScheduledReports([...scheduledReports, newScheduled]);
    Alert.alert('Success', `${frequency} report scheduled successfully`);
  };

  const deleteScheduledReport = (reportId) => {
    setScheduledReports(scheduledReports.filter(r => r.id !== reportId));
    Alert.alert('Success', 'Scheduled report deleted');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ 
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor: '#E5E7EB'
        }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>
            Reports
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Generate and manage comprehensive groundwater reports
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={{ 
          flexDirection: 'row', 
          paddingHorizontal: 20, 
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderColor: '#E5E7EB'
        }}>
          {[
            { key: 'generate', label: 'Generate', icon: BarChart3 },
            { key: 'recent', label: 'Recent', icon: FileText },
            { key: 'scheduled', label: 'Scheduled', icon: Clock }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                marginHorizontal: 4,
                borderBottomWidth: 2,
                borderColor: activeTab === tab.key ? '#3B82F6' : 'transparent'
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <tab.icon size={18} color={activeTab === tab.key ? '#3B82F6' : '#6B7280'} />
              <Text style={{ 
                marginLeft: 6,
                fontSize: 14, 
                fontWeight: '500',
                color: activeTab === tab.key ? '#3B82F6' : '#6B7280'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Report Tab */}
        {activeTab === 'generate' && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>
              Custom Report Generation
            </Text>

            {/* State Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 }}>
                Select State/Region
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {states.map((state) => (
                  <TouchableOpacity
                    key={state}
                    style={{
                      backgroundColor: selectedState === state ? '#3B82F6' : '#F9FAFB',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: selectedState === state ? '#3B82F6' : '#E5E7EB'
                    }}
                    onPress={() => setSelectedState(state)}
                  >
                    <Text style={{
                      color: selectedState === state ? '#FFFFFF' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {state}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Time Range Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 }}>
                Time Range
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {timeRanges.map((range) => (
                  <TouchableOpacity
                    key={range.key}
                    style={{
                      backgroundColor: selectedTimeRange === range.key ? '#3B82F6' : '#F9FAFB',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginRight: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: selectedTimeRange === range.key ? '#3B82F6' : '#E5E7EB'
                    }}
                    onPress={() => setSelectedTimeRange(range.key)}
                  >
                    <Text style={{
                      color: selectedTimeRange === range.key ? '#FFFFFF' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Parameters Selection */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 12 }}>
                Report Parameters (Select Multiple)
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {parameters.map((param) => (
                  <TouchableOpacity
                    key={param.key}
                    style={{
                      backgroundColor: selectedParameters.includes(param.key) ? '#10B981' : '#F9FAFB',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginRight: 12,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: selectedParameters.includes(param.key) ? '#10B981' : '#E5E7EB'
                    }}
                    onPress={() => handleParameterToggle(param.key)}
                  >
                    <Text style={{
                      color: selectedParameters.includes(param.key) ? '#FFFFFF' : '#374151',
                      fontSize: 14,
                      fontWeight: '500'
                    }}>
                      {param.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#3B82F6',
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
                marginBottom: 16,
                opacity: isGenerating ? 0.7 : 1
              }}
              onPress={handleGenerateReport}
              disabled={isGenerating}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BarChart3 size={20} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 }}>
                  {isGenerating ? `Generating... ${generationProgress}%` : 'Generate Report'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Generation Progress */}
            {isGenerating && (
              <View style={{
                backgroundColor: '#F0F9FF',
                padding: 16,
                borderRadius: 12,
                marginBottom: 16
              }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E40AF', marginBottom: 8 }}>
                  Processing Report... {generationProgress}%
                </Text>
                <View style={{
                  height: 6,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}>
                  <Animated.View style={{
                    height: '100%',
                    backgroundColor: '#3B82F6',
                    width: progressAnimation.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    borderRadius: 3
                  }} />
                </View>
              </View>
            )}

            {/* Schedule Report Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#F59E0B',
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center'
              }}
              onPress={handleScheduleReport}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={18} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginLeft: 8 }}>
                  Schedule Report
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Reports Tab */}
        {activeTab === 'recent' && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>
              Recent Reports
            </Text>

            {recentReports.map((report) => (
              <View key={report.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <FileText size={20} color="#3B82F6" />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {report.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>
                      Generated on {report.dateGenerated}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>
                      Format: {report.format} • Size: {report.size}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#10B981',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        marginRight: 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      onPress={() => handleDownloadReport(report)}
                    >
                      <Download size={14} color="#FFFFFF" />
                      <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                        Download
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#3B82F6',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      onPress={() => handleShareReport(report)}
                    >
                      <Share size={14} color="#FFFFFF" />
                      <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Scheduled Reports Tab */}
        {activeTab === 'scheduled' && (
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>
                Scheduled Reports
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3B82F6',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={handleScheduleReport}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                  New
                </Text>
              </TouchableOpacity>
            </View>

            {scheduledReports.map((report) => (
              <View key={report.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 4 }}>
                      {report.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>
                      Frequency: {report.frequency}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>
                      Next Run: {report.nextRun}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#EF4444',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                    onPress={() => deleteScheduledReport(report.id)}
                  >
                    <Trash2 size={14} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4 }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {scheduledReports.length === 0 && (
              <View style={{
                backgroundColor: '#F9FAFB',
                padding: 32,
                borderRadius: 12,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB'
              }}>
                <Clock size={48} color="#6B7280" />
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 }}>
                  No Scheduled Reports
                </Text>
                <Text style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 16 }}>
                  Create automated reports to receive regular updates on groundwater conditions.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3B82F6',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                  onPress={handleScheduleReport}
                >
                  <Plus size={16} color="#FFFFFF" />
                  <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500', marginLeft: 4 }}>
                    Schedule First Report
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}