import React, {useState, Component} from 'react';
import {Modal, View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS} from '../styles/colors';

export const loaderRef = React.createRef();

export function showLoader() {
  loaderRef.current.show();
}

export function hideLoader() {
  loaderRef.current.hide();
}

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  show() {
    this.setState({isModalVisible: true});
  }

  hide() {
    this.setState({isModalVisible: false});
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.transWeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
