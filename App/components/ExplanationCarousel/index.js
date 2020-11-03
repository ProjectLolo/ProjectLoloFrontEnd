import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { carouselData, SCREEN_WIDTH, CAROUSEL_ITEM_WIDTH } from "./constants";
import styles from "@styles/styles";

export default function ExplanationCarousel() {
  const [activeSlide, setActiveSlide] = useState(0); //current active slide

  const renderItem = (
    { item } // render every carousel content
  ) => (
    <View style={styling.snapCarousel}>
      <View
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        {item.renderImage()}
      </View>
      <View style={{ paddingTop: 50, alignSelf: "center" }}>
        {renderPagination()}
      </View>
      <View style={{ paddingTop: 50, alignSelf: "center" }}>
        <Text style={{ color: "#6464E1", fontSize: 20 }}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <Pagination
      dotsLength={carouselData.length}
      activeDotIndex={activeSlide}
      dotStyle={styling.dotStyle}
      containerStyle={styling.paginationContainer}
    />
  );

  return (
    <Carousel
      data={carouselData}
      renderItem={renderItem}
      onSnapToItem={(index) => setActiveSlide(index)} // we will update active slide index
      sliderWidth={SCREEN_WIDTH}
      itemWidth={CAROUSEL_ITEM_WIDTH}
    />
  );
}

const styling = StyleSheet.create({
  snapCarousel: {
    height: "50%",
    width: "80%",
    alignSelf: "center",
  },
  paginationContainer: {
    paddingVertical: 3,
  },
  dotStyle: {
    backgroundColor: "#6464E1",
    width: 15,
    height: 15,
    borderRadius: 50,
  },
});
