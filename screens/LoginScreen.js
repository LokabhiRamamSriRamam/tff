// screens/LoginScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { auth } from "../firebase";

export default function LoginScreen({ navigation }) {
  const [mode, setMode] = useState("password"); // 'password' | 'otp'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const recaptchaVerifier = useRef(null);

  // --- Normal login (for JWT later)
  const handleLogin = async () => {
    setMessage("🔐 Attempting password login...");
    // TODO: Replace with backend API for JWT
    setTimeout(() => {
      setMessage("✅ Logged in successfully!");
      navigation.replace("Home"); // 👈 Redirect to Home screen after login
    }, 1000);
  };

  // --- Send OTP
  const sendOTP = async () => {
    try {
      setMessage("");
      const confirmationResult = await auth.signInWithPhoneNumber(
        phone,
        recaptchaVerifier.current
      );
      setConfirmation(confirmationResult);
      setMessage("📩 OTP sent to your phone!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  // --- Verify OTP
  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      setMessage("✅ Logged in successfully with OTP!");
      navigation.replace("Home"); // 👈 Redirect after OTP success
    } catch (err) {
      setMessage("❌ Invalid OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>Login</Text>

      {/* Switch between Password and OTP login */}
      <View style={styles.modeSwitch}>
        <TouchableOpacity onPress={() => setMode("password")}>
          <Text
            style={[
              styles.modeButton,
              mode === "password" && styles.modeActive,
            ]}
          >
            Password Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("otp")}>
          <Text style={[styles.modeButton, mode === "otp" && styles.modeActive]}>
            Login with OTP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Password login form */}
      {mode === "password" && (
        <>
          <TextInput
            placeholder="Username or Email"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </>
      )}

      {/* OTP login form */}
      {mode === "otp" && (
        <>
          {!confirmation ? (
            <>
              <TextInput
                placeholder="+1234567890"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <Button title="Send OTP" onPress={sendOTP} />
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.input}
              />
              <Button title="Verify OTP" onPress={verifyOTP} />
            </>
          )}
        </>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Text style={styles.switchText}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  modeSwitch: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  modeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#555",
    fontSize: 16,
  },
  modeActive: {
    color: "#007bff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  forgot: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
  },
  message: { textAlign: "center", marginTop: 20 },
  switchText: { textAlign: "center", marginTop: 20 },
  link: { color: "#007bff", fontWeight: "bold" },
});
