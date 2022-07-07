import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator ,Modal,Pressable,Dimensions} from 'react-native';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Animatable from 'react-native-animatable';
//--------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
function ModalView(props) {
  const [modalVisible, setModalVisible] = useState(true);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               {setModalVisible(!modalVisible), setTimeout(() => { setModalVisible(true) }, 5000)}
            }}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{borderTopColor:props.modalType == 'success' ? colors.green : props.modalType == 'fail'? colors.red: null}]}>
                    {
                      props.modalType == "success"?
                       <Animatable.View animation="zoomIn" duration={1000}>
                          <Icon name="check-circle-outline" size={60} color={colors.green} />
                      </Animatable.View>
                      :
                      props.modalType == 'fail'?
                      <Animatable.View animation="zoomIn" duration={1000}>
                           <Icon name="close-circle-outline" size={50} color={colors.red} />
                      </Animatable.View>
                      :
                      null
                    }
                    <Pressable
                        style={[styles.buttonClose]}
                        onPress={() => {setModalVisible(!modalVisible), setTimeout(() => { setModalVisible(true) }, 5000)}}
                    >
                        <Icon name="close-circle-outline" size={25} color={colors.white3} />
                    </Pressable>
                    <Text style={styles.modalText}>{props.ShowText}</Text>
                </View>
            </View>
        </Modal>
    );
}

export default ModalView;
const styles = StyleSheet.create({
  // ===============================
  centeredView: {
    height: DeviceHeight,
    width: DeviceWidth,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.7)'
  },
  modalView: {
    width: DeviceWidth,
    // height: DeviceHeight*50/100,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    padding: 35,
    alignItems: "center",
    justifyContent:"center",
    borderTopWidth:5
  },
  button: {
    // position: 'absolute',
    // right: 25,
    // top: 25
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
    paddingHorizontal:10,
    paddingVertical:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    marginTop:25,
    textAlign: "center",
    fontFamily:fonts.PrimaryFont
  }
})