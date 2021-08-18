import React, {useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Gravity, LayoutGravity, MarginStyle} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';

const sliderWidth = Dimensions.get('window').width;
const imageWidth = sliderWidth - 34;
const imageHeight = imageWidth / 1.5;

const AdsCard = ({entries}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const pagination = () => {
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{marginTop: -16, marginBottom: -16}}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: -8,
          backgroundColor: COLORS.gray_light,
        }}
        inactiveDotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: -8,
          backgroundColor: COLORS.white,
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  const renderItem = item => {
    return (
      <View
        style={{
          ...LayoutGravity.center,
          ...Gravity.center,
          ...MarginStyle.mT16,
        }}>
        <Image
          style={{
            width: imageWidth,
            height: imageHeight,
            borderRadius: 20,
          }}
          source={{
            uri: item,
          }}
        />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        data={entries}
        renderItem={item => renderItem(item.item)}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        loop={true}
        autoplay={true}
        autoplayDelay={10000}
        autoplayInterval={5000}
        onSnapToItem={index => setActiveSlide(index)}
      />
      {entries.length <= 1 ? <View style={{height: 16}} /> : null}
      {pagination()}
    </View>
  );
};

export default AdsCard;
