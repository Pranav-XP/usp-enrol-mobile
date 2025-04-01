import { Text, View, Pressable } from "react-native";
import React from "react";
import { useSession } from "@/context/ctx";

const MyProgram = () => {
  const { signOut } = useSession();
  return (
    <>
      <View className="ml-5 mt-5">
        <Text className="text-5xl text-usp-teal-300 font-bold">Home</Text>
      </View>
      <Pressable
        className="p-4 bg-usp-teal px-20 py-4 rounded-md active:bg-usp-teal-500"
        onPress={() => {
          signOut();
        }}
      >
        <Text className="text-white font-bold text-md">Logout</Text>
      </Pressable>
    </>
  );
};

export default MyProgram;
