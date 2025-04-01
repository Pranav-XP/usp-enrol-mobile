import { Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useSession } from '../context/ctx';  
import { router } from 'expo-router';

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);  // Call the signIn function
    } catch (err) {
      setError('Invalid credentials, please try again.');  // Set error message if login fails
    } finally {
      setLoading(false);
      router.replace('/');  // Redirect to home screen after successful login
      return;
    }
  };

  return (
    <View className="flex bg-usp-dark-teal items-center justify-center h-full">
      <Text className="text-6xl font-semibold text-usp-teal text-center">Welcome to</Text>
      <Text className="mb-2 text-6xl font-bold text-white text-center">USPEnrol</Text>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      {/* Email Input */}
      <TextInput
        className="bg-white p-4 mb-2 rounded-md w-80 text-white"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        className="bg-white p-4 mb-4 rounded-md w-80 text-white border-2 border-usp-teal-100"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
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
  );
}
