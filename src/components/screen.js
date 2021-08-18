import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {ContainerStyles} from '../styles/globalStyles';
import PropTypes from 'prop-types';
import {COLORS} from '../styles/colors';

const Screen = props => {
  return (
    <View
      style={{
        ...ContainerStyles.container,
        backgroundColor: COLORS.primary,
      }}>
      <SafeAreaView
        style={{
          backgroundColor: COLORS.primary,
        }}
      />
      <KeyboardAvoidingView
        style={{...ContainerStyles.container, backgroundColor: COLORS.white}}>
        {props.useScroll ? (
          <ScrollView
            decelerationRate="normal"
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            style={ContainerStyles.container}
            contentContainerStyle={ContainerStyles.contentContainer}>
            <View style={ContainerStyles.container}>{props.children}</View>
          </ScrollView>
        ) : (
          <View style={ContainerStyles.container}>{props.children}</View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

Screen.propTypes = {
  useScroll: PropTypes.bool,
};
export default Screen;
