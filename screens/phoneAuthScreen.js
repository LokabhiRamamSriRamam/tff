import React, { useRef, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase, { auth } from "../firebase";     // 👈 import firebase default

export default function PhoneAuthScreen() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");

  const recaptchaVerifier = useRef(null);

  const sendOTP = async () => {
    try {
      setMessage("");
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
      setMessage("✅ Phone verified!");
    } catch (err) {
      setMessage("❌ Invalid code.");
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}   // 👈 use compat app options
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>Phone Authentication</Text>
      <TextInput
        placeholder="+1234567890"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Send OTP" onPress={sendOTP} />

      {confirmation && (
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  message: { marginTop: 20, textAlign: "center", fontSize: 16 },
});
