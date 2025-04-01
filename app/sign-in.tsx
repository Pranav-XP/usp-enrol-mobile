import { router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';

import { useSession } from '../context/ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View className="flex bg-usp-dark-teal items-center justify-center h-full">
      <Pressable
      className='p-4 bg-usp-teal px-20 py-4 rounded-md active:bg-usp-teal-500' onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        <Text className='text-white font-bold text-md'>
          Login
        </Text>
      </Pressable>
    </View>
  );
}
