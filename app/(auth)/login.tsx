import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const router = useRouter();

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    const trimmedEmail = email.trim();

    if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const trimmedEmail = email.trim();

        const userCredential = await signInWithEmailAndPassword(
          auth,
          trimmedEmail,
          password
        );

        const user = userCredential.user;
        const displayName = user.displayName || user.email?.split("@")[0]; // fallback

        Alert.alert("Login Successful", `Welcome back, ${displayName}!`);
        router.push("/home");
      } catch (error: any) {
        console.log("Login error:", error);

        let message = "Login failed. Please try again.";

        if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password.";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email address format.";
        } else if (error.code === "auth/too-many-requests") {
          message =
            "Too many failed attempts. Try again later or reset your password.";
        }

        Alert.alert("Login Failed", message);
      }
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

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
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
        style={[styles.button, !(email && password) && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!(email && password)}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <Text style={styles.footerText}>
        Don’t have an account?{" "}
        <Link href="/register" style={styles.link}>
          Sign up
        </Link>
      </Text>

      <Text style={[styles.footerText, { marginTop: 10 }]}>
        <Link href="/" style={styles.link}>
          Back to Home
        </Link>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
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
