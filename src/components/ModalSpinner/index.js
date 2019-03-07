import React, { Component } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { View, Spinner } from 'native-base';
import { variables } from '../../theme';

class ModalSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { modal_open } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal_open}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Spinner color={variables.primary} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: variables.metrics.screenWidth / 3,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default connect(null)(ModalSpinner);
