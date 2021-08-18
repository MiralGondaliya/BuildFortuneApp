import React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function replace(name, params) {
  navigationRef.current?.replace(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function reset(componentName, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: componentName, params: params}],
    }),
  );
}

export default {
  navigate,
  goBack,
  replace,
  reset,
};
