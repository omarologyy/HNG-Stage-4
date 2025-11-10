import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Link } from "expo-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", phone: "", password: "" };

    if (name.trim().length < 2) {
      newErrors.name = "Full name is required";
      valid = false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }
    if (!phone.match(/^\d{10,15}$/)) {
      newErrors.phone = "Enter a valid phone number";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validate()) {
      Alert.alert("Registration Successful", `Welcome, ${name}!`);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
        }}
        style={styles.logo}
      />

      <Text style={styles.heading}>Create an Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      {errors.phone ? (
        <Text style={styles.errorText}>{errors.phone}</Text>
      ) : null}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          !(name && email && phone && password) && styles.disabledButton,
        ]}
        onPress={handleSignup}
        disabled={!(name && email && phone && password)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Link href="/login" style={styles.link}>
          Log in
        </Link>
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3797EF",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#9ac9fb",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#999",
    fontWeight: "600",
  },
  footerText: {
    color: "#444",
    marginTop: 20,
  },
  link: {
    color: "#3797EF",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
});
