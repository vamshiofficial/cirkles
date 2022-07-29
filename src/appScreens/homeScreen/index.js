import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import styles from './styles';
import ListCardUi from '../components/ListCard';
import * as Animatable from 'react-native-animatable';
import QrDataTest from './qrtest';
import {AuthContext} from '../../navigations/context/authContest';
import SubmitBtn from '../components/submitBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Body, Left, ListItem, Right} from 'native-base';
import colors from '../../../assets/custom/colors';
// import { Body, Left, ListItem, Right } from 'native-base';
const HomeScreen = ({navigation}) => {
  const {LogOutNow, LoginNow} = useContext(AuthContext);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.con}>
        <Animatable.View
          animation={'bounce'}
          duration={1000}
          style={[styles.HeaderSection, {marginBottom: 10}]}>
          <Text style={styles.HeaderHedding}>Hello Vamshi good morning!</Text>
          <Text style={styles.HeaderBody}>
            Had your tea if you don’t please click here to search our circle
            near you.
          </Text>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={500}>
          <TouchableOpacity style={styles.item__con}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="storefront-outline"
                style={styles.item__icon}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Visit all our outlets</Text>
              <Text style={styles.item__body}>
                Know how our circle getting bigger. If you can't find by near
                you.You can be the part of Vahh family.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={800}>
          <TouchableOpacity style={styles.item__con}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                style={[styles.item__icon,{fontSize:25}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Scan a QR code</Text>
              <Text style={styles.item__body}>
                You can get a absolutly reward when you scan a QR Code with our
                app at our outlets.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={1100}>
          <TouchableOpacity style={styles.item__con}>
            <View style={styles.item__left}>
              <MaterialCommunityIcons
                name="scan-helper"
                style={[styles.item__icon,{fontSize:20}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Pay at outlet</Text>
              <Text style={styles.item__body}>
                You can directly use your rewards which you won by scaning our
                payment QR code at any VAHH outlets.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation={'zoomIn'} duration={1000} delay={1500}>
          <TouchableOpacity style={styles.item__con}>
            <View style={[styles.item__left,{backgroundColor:colors.black}]}>
              <MaterialCommunityIcons
                name="store-plus-outline"
                style={[styles.item__icon,{color:colors.white}]}
              />
            </View>
            <View style={styles.item__right}>
              <Text style={styles.item__heding}>Add franchise request</Text>
              <Text style={styles.item__body}>
                If you are intetested in taking our franchise and become insider
                of VAHH family. Please click here we will contact you farther if
                you complete two steps.
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
        {/* --------------------------------- */}
        {/* <TouchableOpacity
        onPress={() => navigation.navigate('FranchiseRequestScreen')}
        style={{alignSelf: 'center', backgroundColor: '#ddd', padding: 15}}
        // onPress={LogOutNow()}
      >
        <Text>FranchiseRequestScreen Ui</Text>
      </TouchableOpacity> */}
        {/* <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Visit all our outlets"
        BodyText="Know how our circle getting bigger. If you can't find by near you.You can be the part of Vahh family."
        LearnmoreBtn={true}
        onClickLearnmore={() =>
          navigation.navigate('AllOutletsScreen', {OutletId: 1})
        }
      /> */}
        {/* <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Scan a cup to get FREE tea"
        BodyText="You can get a absolutly free tea or coffee when you got FREE message when youscaned a QR Code with our app."
        LearnmoreBtn={false}
        onClickLearnmore={() => alert('done')}
      />
      <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Pay at outlet"
        BodyText="You can get a absolutly free tea or coffee when you got FREE message when youscaned a QR Code with our app."
        LearnmoreBtn={false}
        onClickLearnmore={() => alert('done')}
      /> */}
        {/* <ListCardUi
        ImageUrl="https://esigm.com/opens/used_imgs/opens-logo.png"
        HeaddingText="Share a moment on Opens"
        BodyText="You will get a reward when you create a post on opens app which is
        ailso one of the main platform of ESY"
        LearnmoreBtn={true}
        onClickLearnmore={() => alert('done')}
      /> */}
        {/* <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Scan a cup to get FREE tea"
        BodyText="You can get a absolutly free tea or coffee when you got FREE message when youscaned a QR Code with our app."
        LearnmoreBtn={false}
        onClickLearnmore={() => alert('done')}
      />
      <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Scan a cup to get FREE tea"
        BodyText="You can get a absolutly free tea or coffee when you got FREE message when youscaned a QR Code with our app."
        LearnmoreBtn={false}
        onClickLearnmore={() => alert('done')}
      />
      <ListCardUi
        ImageUrl="https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"
        HeaddingText="Scan a cup to get FREE tea"
        BodyText="You can get a absolutly free tea or coffee when you got FREE message when youscaned a QR Code with our app."
        LearnmoreBtn={false}
        onClickLearnmore={() => alert('done')}
      /> */}
        {/* <SubmitBtn
        onPress={() => {
          LogOutNow();
        }}
      /> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
