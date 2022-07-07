import React, {useEffect, useState, useCallback,useContext} from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Content,
  ListItem,
  Button,
  Left,
  Right,
  Body,
  Header,
  Title,
} from 'native-base';
import colors from '../../../assets/custom/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import {AuthContext} from '../../../constants/context';
import {BottomSheet} from 'react-native-btr';
import styles from './styles';
import Share from 'react-native-share';
import fonts from '../../../assets/custom/fonts';
import {AuthContext} from '../../navigations/context/authContest';
import HeaderView from './header';
const SettingsScreen = ({navigation}) => {
  const {LogOutNow, LoginNow} = useContext(AuthContext);
  // const {signOut} = React.useContext(AuthContext);
  const [InviteModalActive, SetInviteModalActive] = useState(false);
  //-------------------------------
  //   const UserGet = useSelector(state => state.userState.currentUser);
  //   useEffect(async () => {
  //     let id = '';
  //     try {
  //       id = await AsyncStorage.getItem('userToken');
  //       //setCurrect_UserId(id)
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     // setUser(UserGet[0])
  //   });
  //   //==================================
  const customShare = async () => {
    const ShareContent = {
      title: 'Invite friends via',
      message: `Hello!`,
    };
    try {
      const ShareResponse = await Share.open(ShareContent);
    } catch (err) {
      console.log(err);
    }
  };
  //   //==================================
  //   const customShareTelugu = async () => {
  //     const shareOptions = {
  //       title: 'Invite friends via',
  //       message: `హలో ,

  // నేను ఇప్పుడు opens అప్ వాడుతున్నాను .ఇందులో మీరు మీలా ఆలోచించే వాళ్ళను ,మీలా ఫీల్ అయ్యే వాళ్ళతో కనెక్ట్ కావచ్చు .ఇది మన భారత దేశం లో రూపొందించినది.
  // వాడుతున్న అందరూ దీన్ని social media కాదు అంతకు మించి అంటున్నారు !!

  // ఇప్పుడే నా opens ప్రొఫైల్(@${UserGet[0].username}) చుడండి
  // https://opens.esigm.com/Profile?user=${UserGet[0].id}

  // opens app ఇప్పుడే డౌన్లోడ్ చేసుకోండి
  // https://play.google.com/store/apps/details?id=com.esigm.esigmopens

  // opens app గురించి ఇంకా తెలుసుకోండి
  // https://esigm.com/opens/
  // `,
  //       url: imgs.invite_in_telugu,
  //     };
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   //====================
  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
    return (
      <Button transparent onPress={handlePress}>
        <Text>{children}</Text>
      </Button>
    );
  };
  return (
    <Container>
      <HeaderView goBack={navigation.goBack} />
      <Content style={{flex: 1}}>
        {/* <BottomSheet
          visible={InviteModalActive}
          onBackButtonPress={() => SetInviteModalActive(false)}
          onBackdropPress={() => SetInviteModalActive(false)}>
          <View style={styles.bottomNavigationView}>
            <Text style={styles.invite_modal_header_text}>Invite friend</Text>
            <Text style={styles.invite_modal_body_text}>
              Please select the language that your friend can understand well.
              It will help them to know about opens app.
            </Text>
            <View style={styles.invite_modal_body_btn_con}>
              <TouchableOpacity
                style={styles.invite_modal_btn}
                onPress={customShareTelugu}>
                <Text style={styles.invite_modal_btn_text}>తెలుగు</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.invite_modal_btn}
                onPress={customShare}>
                <Text style={styles.invite_modal_btn_text}>English</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet> */}
        <View style={styles.note_view}>
          <Text style={styles.note_text}>
            Note: Data will be updated in all esigm products if you update here.
          </Text>
        </View>
        <View style={styles.user_related}>
          {/* <ListItem
            avatar
            style={styles.list_con}
            onPress={() => navigation.navigate('AccountsSettings')}>
            <Left style={styles.list_left}>
              <Icon name="account-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Account</Text>
              <Text style={styles.list_body_small_text}>
                Update name,username...etc
              </Text>
            </Body>
            <Right />
          </ListItem> */}
          {/* <ListItem
            avatar
            style={styles.list_con}
            onPress={() => navigation.navigate('ProfileSettings')}>
            <Left style={styles.list_left}>
              <Icon name="account-check-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Profile</Text>
              <Text style={styles.list_body_small_text}>
                Update Goal,skills,Education details,Intrests ...etc
              </Text>
            </Body>
            <Right />
          </ListItem> */}
          {/* <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('DisplayPicSettings')}>
            <Left style={styles.list_left}>
              <FeatherIcon name="camera" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Display Picture</Text>
            </Body>
            <Right />
          </ListItem> */}
          {/* <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('PasswordSettings')}>
            <Left style={styles.list_left}>
              <Icon name="lock-open-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Update Password</Text>
            </Body>
            <Right />
          </ListItem> */}
        </View>
        <View style={styles.user_related}>
          <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('AboutPage')}>
            <Left style={styles.list_left}>
              <Icon name="information-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>About Opens</Text>
            </Body>
            <Right />
          </ListItem>
          <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('TermsConditionsPage')}>
            <Left style={styles.list_left}>
              <Icon name="information-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>
                Terms of Use and Conditions
              </Text>
            </Body>
            <Right />
          </ListItem>
          {/* <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('HowToUsePage')}>
            <Left style={styles.list_left}>
              <Icon name="information-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>How To Use</Text>
            </Body>
            <Right />
          </ListItem> */}
          {/* <ListItem
            icon
            style={styles.list_con}
            onPress={() => navigation.navigate('ContactOpensTeam')}>
            <Left style={styles.list_left}>
              <Icon name="information-outline" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Contact Us</Text>
              <Text style={styles.list_body_small_text}>
                Send feedback,report problem,ask help ...etc
              </Text>
            </Body>
            <Right />
          </ListItem> */}
        </View>
        <View style={styles.user_related}>
          <ListItem
            icon
            style={styles.list_con}
            // onPress={() => navigation.navigate('onboard')}
          >
            <Left style={styles.list_left}>
              <Icon name="view-carousel" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>The Crikle Introduction</Text>
            </Body>
            <Right />
          </ListItem>
          <ListItem icon style={styles.list_con} onPress={() => customShare()}>
            <Left style={styles.list_left}>
              <Icon name="account-multiple-plus" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>Invite Friends</Text>
            </Body>
            <Right />
          </ListItem>
          <ListItem icon style={styles.list_con}>
            <Left style={styles.list_left}>
              <Icon name="google-play" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <OpenURLButton url="https://play.google.com/store/apps/details?id=com.esigm.esigmopens">
                <Text style={styles.list_body_text}>View App Updates</Text>
              </OpenURLButton>
            </Body>
            <Right />
          </ListItem>
        </View>
        <View style={styles.esigm_banner_con}>
          <Text style={styles.esigm_banner_from_text}>From</Text>
          <Image
            source={{uri: 'https://esigm.com/images/logos/esigm-logo.png'}}
            style={styles.esigm_logo}
          />
          <Text style={styles.esigm_banner_text}>
            Made with{' '}
            <Icon name="heart-outline" size={15} color={colors.secondary} /> in
            india
          </Text>
        </View>
        {/* ===============log out=========== */}
        <View style={styles.logout_btn_con}>
          <ListItem
            icon
            style={styles.list_con}
            onPress={() => {
              LogOutNow();
            }}>
            <Left style={styles.list_left}>
              <Icon active name="exit-to-app" style={styles.list_icon} />
            </Left>
            <Body style={styles.list_body}>
              <Text style={styles.list_body_text}>LogOut</Text>
            </Body>
            <Right />
          </ListItem>
        </View>
      </Content>
    </Container>
  );
};
export default SettingsScreen;
