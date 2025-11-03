// RegisterScreen.js
import React, { useState, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");

  const recaptchaVerifier = useRef(null);

  const sendOTP = async () => {
    try {
      const confirmationResult = await auth.signInWithPhoneNumber(
        phone,
        recaptchaVerifier.current
      );
      setConfirmation(confirmationResult);
      setMessage("📩 OTP sent!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      setMessage("✅ Phone verified! You can now register.");
      // Later: send name, email, phone to backend (JWT signup)
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

      <Text style={styles.title}>Register</Text>

      {!confirmation ? (
        <>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="+1234567890"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <Button title="Send OTP" onPress={sendOTP} />
          <Text style={styles.switchText}>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
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

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  message: { textAlign: "center", marginTop: 20 },
  switchText: { textAlign: "center", marginTop: 20 },
  link: { color: "#007bff", fontWeight: "bold" },
});
