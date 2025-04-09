import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { useSession } from "../context/ctx";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null); // Reset error before making a request

    try {
      const response = await signIn(email, password);
      console.log(JSON.stringify(response.data, null, 2));

      // Redirect to home screen after successful login
      router.replace("/");
    } catch (err: any) {
      console.error(
        "Login error: ",
        err.message || err.response?.data?.message || "Unknown error"
      );

      // Set error message if login fails
      setError(
        err.response?.data?.message || "Invalid credentials, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Text variant="displayMedium">Welcome to</Text>
        <Text
          variant="displayLarge"
          style={{
            color: Colors.light.primary,
            fontWeight: "bold",
          }}
        >
          USPEnrol
        </Text>

        {error && <Text className="text-red-500 mb-2 font-bold">{error}</Text>}

        <TextInput
          placeholder="Enter your email"
          label={"Email"}
          style={{
            marginTop: 10,
            width: "80%",
          }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Password"
          secureTextEntry={!passwordVisible}
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: "80%",
          }}
          value={password}
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        ></TextInput>
        <Button
          onPress={handleSignIn}
          loading={loading}
          style={{ width: "80%" }}
          mode="contained"
        >
          Login
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
