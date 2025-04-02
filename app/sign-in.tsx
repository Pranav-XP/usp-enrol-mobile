import {
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useState } from "react";
import { useSession } from "../context/ctx";
import { router } from "expo-router";

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null); // Reset error before making a request

    try {
      const response = await signIn(email, password); // Call the signIn function
      console.log("Login successful: ", response.status);

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex bg-usp-dark-teal items-center justify-center h-full">
          <Text className="text-6xl font-semibold text-usp-teal text-center">
            Welcome to
          </Text>
          <Text className="mb-2 text-6xl font-bold text-white text-center">
            USPEnrol
          </Text>

          {error && (
            <Text className="text-red-500 mb-2 font-bold">{error}</Text>
          )}

          {/* Email Input */}
          <TextInput
            className="bg-white p-4 mb-2 rounded-md w-80 text-black"
            placeholder="Email"
            placeholderTextColor={"grey"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password Input */}
          <TextInput
            className="bg-white p-4 mb-4 rounded-md w-80 text-black border-2 border-usp-teal-100"
            placeholder="Password"
            placeholderTextColor={"grey"}
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry
          />

          {/* Sign-In Button */}
          <Pressable
            className="p-4 bg-usp-teal px-20 py-4 rounded-md active:bg-usp-teal-500"
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-bold text-md">Login</Text>
            )}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
