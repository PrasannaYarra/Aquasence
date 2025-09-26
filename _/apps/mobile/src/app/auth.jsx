import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Animated,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Eye,
  EyeOff,
  User,
  Phone,
  Lock,
  IdCard,
  Briefcase,
} from "lucide-react-native";
import { router } from "expo-router";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    government_id: "",
    password: "",
    phone_number: "",
    name: "",
    designation: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});

  // Animation values
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding),
  ).current;

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const animateTransition = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimation, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleInputFocus = () => {
    if (Platform.OS === "web") {
      return;
    }
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === "web") {
      return;
    }
    animateTo(insets.bottom + focusedPadding);
  };

  const validateForm = () => {
    const newErrors = {};

    // Government ID validation
    if (!formData.government_id.trim()) {
      newErrors.government_id = "Government ID is required";
    } else if (formData.government_id.length < 8) {
      newErrors.government_id = "Government ID must be at least 8 characters";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      // Phone validation for registration
      if (!formData.phone_number.trim()) {
        newErrors.phone_number = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone_number.replace(/\D/g, ""))) {
        newErrors.phone_number = "Please enter a valid 10-digit phone number";
      }

      // Name validation
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      // Designation validation
      if (!formData.designation.trim()) {
        newErrors.designation = "Designation is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    if (!formData.otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return false;
    }
    if (formData.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return false;
    }
    return true;
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      animateTransition(() => {
        setShowOTP(true);
        setErrors({});
      });

      Alert.alert(
        "Success",
        `OTP sent to ${isLogin ? "registered" : ""} phone number successfully`,
      );
    }, 1500);
  };

  const handleOTPVerification = async () => {
    if (!validateOTP()) return;

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success",
        isLogin ? "Login successful!" : "Registration completed successfully!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(tabs)/dashboard"),
          },
        ],
      );
    }, 1500);
  };

  const handleForgotPassword = async () => {
    if (!formData.government_id.trim()) {
      setErrors({ government_id: "Please enter your Government ID" });
      return;
    }

    setIsLoading(true);

    // Simulate forgot password request
    setTimeout(() => {
      setIsLoading(false);
      animateTransition(() => {
        setShowForgotPassword(false);
        setShowOTP(true);
        setErrors({});
      });
      Alert.alert("Success", "Reset OTP sent to your registered phone number");
    }, 1500);
  };

  const resetToLogin = () => {
    animateTransition(() => {
      setIsLogin(true);
      setShowOTP(false);
      setShowForgotPassword(false);
      setFormData({
        government_id: "",
        password: "",
        phone_number: "",
        name: "",
        designation: "",
        otp: "",
      });
      setErrors({});
    });
  };

  const renderInputField = (
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    icon = null,
    secureTextEntry = false,
    fieldKey = null,
  ) => (
    <View style={{ marginBottom: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
          borderWidth: 1,
          borderColor: errors[fieldKey] ? "#EF4444" : "#E5E7EB",
          borderRadius: 12,
          paddingHorizontal: 16,
          height: 52,
        }}
      >
        {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
        <TextInput
          style={{ flex: 1, fontSize: 16, color: "#1F2937" }}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {placeholder === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errors[fieldKey] && (
        <Text
          style={{
            color: "#EF4444",
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4,
          }}
        >
          {errors[fieldKey]}
        </Text>
      )}
    </View>
  );

  if (showOTP) {
    return (
      <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            paddingTop: insets.top,
          }}
        >
          <StatusBar style="dark" />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              justifyContent: "center",
              minHeight: "100%",
            }}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnimation,
                transform: [{ translateY: slideAnimation }],
              }}
            >
              {/* App Branding */}
              <View style={{ alignItems: "center", marginBottom: 40 }}>
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "#1E40AF",
                    marginBottom: 8,
                  }}
                >
                  AquaSense
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#6B7280",
                    textAlign: "center",
                  }}
                >
                  Groundwater Monitoring System
                </Text>
              </View>

              {/* OTP Form */}
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1F2937",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  Verify OTP
                </Text>
                <Text
                  style={{
                    color: "#6B7280",
                    textAlign: "center",
                    marginBottom: 24,
                    fontSize: 14,
                  }}
                >
                  Enter the 6-digit code sent to your phone
                </Text>

                {renderInputField(
                  "Enter OTP",
                  formData.otp,
                  (value) =>
                    updateFormData("otp", value.replace(/\D/g, "").slice(0, 6)),
                  "number-pad",
                  null,
                  false,
                  "otp",
                )}

                <TouchableOpacity
                  style={{
                    backgroundColor: "#10B981",
                    paddingVertical: 16,
                    borderRadius: 12,
                    alignItems: "center",
                    marginBottom: 16,
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  onPress={handleOTPVerification}
                  disabled={isLoading}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={resetToLogin}>
                  <Text
                    style={{
                      color: "#3B82F6",
                      fontSize: 14,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>

          <Animated.View style={{ paddingBottom: paddingAnimation }} />
        </View>
      </KeyboardAvoidingAnimatedView>
    );
  }

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <View
        style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: insets.top }}
      >
        <StatusBar style="dark" />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnimation,
              transform: [{ translateY: slideAnimation }],
            }}
          >
            {/* App Branding */}
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#1E40AF",
                  marginBottom: 8,
                }}
              >
                AquaSense
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#6B7280",
                  textAlign: "center",
                }}
              >
                Groundwater Monitoring System
              </Text>
            </View>

            {/* Auth Form */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 24,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {!showForgotPassword && (
                <>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1F2937",
                      textAlign: "center",
                      marginBottom: 24,
                    }}
                  >
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </Text>

                  {renderInputField(
                    "Government ID",
                    formData.government_id,
                    (value) => updateFormData("government_id", value),
                    "default",
                    <IdCard size={20} color="#6B7280" />,
                    false,
                    "government_id",
                  )}

                  {renderInputField(
                    "Password",
                    formData.password,
                    (value) => updateFormData("password", value),
                    "default",
                    <Lock size={20} color="#6B7280" />,
                    !showPassword,
                    "password",
                  )}

                  {!isLogin && (
                    <>
                      {renderInputField(
                        "Phone Number",
                        formData.phone_number,
                        (value) => updateFormData("phone_number", value),
                        "phone-pad",
                        <Phone size={20} color="#6B7280" />,
                        false,
                        "phone_number",
                      )}

                      {renderInputField(
                        "Full Name",
                        formData.name,
                        (value) => updateFormData("name", value),
                        "default",
                        <User size={20} color="#6B7280" />,
                        false,
                        "name",
                      )}

                      {renderInputField(
                        "Designation",
                        formData.designation,
                        (value) => updateFormData("designation", value),
                        "default",
                        <Briefcase size={20} color="#6B7280" />,
                        false,
                        "designation",
                      )}
                    </>
                  )}

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B82F6",
                      paddingVertical: 16,
                      borderRadius: 12,
                      alignItems: "center",
                      marginBottom: 16,
                      opacity: isLoading ? 0.7 : 1,
                    }}
                    onPress={handleAuth}
                    disabled={isLoading}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {isLoading
                        ? "Processing..."
                        : isLogin
                          ? "Login"
                          : "Register"}
                    </Text>
                  </TouchableOpacity>

                  {isLogin && (
                    <TouchableOpacity
                      onPress={() => setShowForgotPassword(true)}
                      style={{ alignItems: "center", marginBottom: 16 }}
                    >
                      <Text
                        style={{
                          color: "#3B82F6",
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#6B7280", fontSize: 14 }}>
                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        animateTransition(() => setIsLogin(!isLogin))
                      }
                    >
                      <Text
                        style={{
                          color: "#3B82F6",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        {isLogin ? "Register" : "Login"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {showForgotPassword && (
                <>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "#1F2937",
                      textAlign: "center",
                      marginBottom: 8,
                    }}
                  >
                    Reset Password
                  </Text>
                  <Text
                    style={{
                      color: "#6B7280",
                      textAlign: "center",
                      marginBottom: 24,
                      fontSize: 14,
                    }}
                  >
                    Enter your Government ID to receive a reset OTP
                  </Text>

                  {renderInputField(
                    "Government ID",
                    formData.government_id,
                    (value) => updateFormData("government_id", value),
                    "default",
                    <IdCard size={20} color="#6B7280" />,
                    false,
                    "government_id",
                  )}

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#3B82F6",
                      paddingVertical: 16,
                      borderRadius: 12,
                      alignItems: "center",
                      marginBottom: 16,
                      opacity: isLoading ? 0.7 : 1,
                    }}
                    onPress={handleForgotPassword}
                    disabled={isLoading}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {isLoading ? "Processing..." : "Send Reset OTP"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={resetToLogin}>
                    <Text
                      style={{
                        color: "#3B82F6",
                        fontSize: 14,
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      Back to Login
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Animated.View>
        </ScrollView>

        <Animated.View style={{ paddingBottom: paddingAnimation }} />
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
