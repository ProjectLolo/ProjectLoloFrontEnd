import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import { carouselData, SCREEN_WIDTH, CAROUSEL_ITEM_WIDTH } from "./constants";
import style from "@styles/styles";
import adjust from "../../styles/adjust";
import colors from "@assets/colors";
import fonts from "@assets/fonts";

export default function ExplanationCarousel() {
  const [activeSlide, setActiveSlide] = useState(0); //current active slide

  const renderItem = (
    { item } // render every carousel content
  ) => (
    <View style={styles.snapCarousel}>
      <View style={styles.imageContainer}>{item.renderImage()}</View>
      {renderPagination()}
      <View style={[styles.descrContainer]}>
        <Text
          style={styles.descrText}
          numberOfLines={8}
          adjustsFontSizeToFit={true}
        >
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
    width: "90%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "50%",
    height: Dimensions.get("window").width * 0.7,
    marginTop: "10%",
  },
  paginationContainer: {
    paddingVertical: 3,
    paddingVertical: adjust(20),
    alignSelf: "center",
  },
  dotStyle: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  descrContainer: {
    alignSelf: "center",
    width: "100%",
  },
  descrText: {
    fontSize: adjust(14),
    fontFamily: fonts.bold,
    color: colors.purple,
    textAlign: "center",
    height: "100%",
  },
});
