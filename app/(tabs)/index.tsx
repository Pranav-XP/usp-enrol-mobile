import { Text, View, SafeAreaView } from "react-native";

import { useSession } from "../../context/ctx";

export default function Index() {
  const { signOut } = useSession();
  return (
    <SafeAreaView className="flex bg-usp-dark-teal h-full">
      <View className="ml-5 mt-5">
        <Text className="text-5xl text-usp-teal-300 font-bold">Home</Text>
      </View>
    </SafeAreaView>
  );
}
