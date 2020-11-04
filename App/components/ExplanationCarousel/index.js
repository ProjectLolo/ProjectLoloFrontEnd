import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { carouselData, SCREEN_WIDTH, CAROUSEL_ITEM_WIDTH } from "./constants";
import style from "@styles/styles";

export default function ExplanationCarousel() {
  const [activeSlide, setActiveSlide] = useState(0); //current active slide

  const renderItem = (
    { item } // render every carousel content
  ) => (
    <View style={styles.snapCarousel}>
      <View style={styles.imageContainer}>{item.renderImage()}</View>
      {renderPagination()}
      <View style={styles.descrContainer}>
        <Text style={[style.purpleText, styles.descrText]}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <Pagination
      dotsLength={carouselData.length}
      activeDotIndex={activeSlide}
      dotStyle={[style.purple, styles.dotStyle]}
      containerStyle={styles.paginationContainer}
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

const styles = StyleSheet.create({
  snapCarousel: {
    height: "50%",
    width: "80%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "50%",
    height: "100%",
  },
  paginationContainer: {
    paddingVertical: 3,
    paddingTop: 50,
    alignSelf: "center",
  },
  dotStyle: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  descrContainer: {
    paddingTop: 50,
    alignSelf: "center",
  },
  descrText: { fontSize: 20 },
});
