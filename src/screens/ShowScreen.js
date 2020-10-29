import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Context as BlogContext } from "../context/BlogContext";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(BlogContext);

  const blogPost = state.find(post => post.id === navigation.getParam("id"));

  if (!blogPost) {
    return null;
  }

  return (
    <View>
      <Text>{blogPost.title} - {blogPost.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
