import { Text, View, Pressable } from 'react-native';

import { useSession } from '../../context/ctx';

export default function Index() {
  const { signOut } = useSession();
  return (
       <View className="flex bg-usp-dark-teal items-center justify-center h-full">
            <Pressable
            className='p-4 bg-usp-teal px-20 py-4 rounded-md active:bg-usp-teal-500' onPress={() => {
                signOut();
              }}>
              <Text className='text-white font-bold text-md'>
                Logout
              </Text>
            </Pressable>
          </View>
  );
}
