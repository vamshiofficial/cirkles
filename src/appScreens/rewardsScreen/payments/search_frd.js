import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Subtitle,
  ListItem,
  Button,
  Icon,
  Thumbnail,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
// --
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import imgs from '../../../../assets/images/base_64_imgs';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
function UserCard(props) {
  // userFname;
  // UserProfilePic;
  // userId;
  // userMobile;
  return (
    <ListItem thumbnail noBorder style={styles.user_con}>
      <Left>
        <Thumbnail
          source={{
            uri: props.UserProfilePic,
          }}
          style={styles.user_image}
        />
      </Left>
      <Body>
        <Text style={styles.username}>{props.userFname}</Text>
        <Text note numberOfLines={1} style={styles.user_phone}>
          {props.userMobile}
        </Text>
      </Body>
      <Right>
        {props.CurrentUserMobile === props.userMobile ? (
          <TouchableOpacity style={styles.you_btn}>
            <Text style={styles.you_text}>You</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.send_btn}
            onPress={() =>
              props.navigation.navigate('PaymentsSection', {
                GetOutletId: null,
                GetPayUserId: props.userId,
              })
            }>
            <Text style={styles.send_text}>Send</Text>
          </TouchableOpacity>
        )}
      </Right>
    </ListItem>
  );
}
const UserNotFound = props => (
  <ListItem thumbnail noBorder style={styles.usernot__con}>
    <Left>
      <Thumbnail
        source={{
          uri: 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg',
        }}
        style={styles.usernot__image}
      />
    </Left>
    <Body>
      <Text style={styles.not_username}>0 accounts found</Text>
      <Text note numberOfLines={1} style={styles.not_user_phone}>
        {props.userMobile}
      </Text>
    </Body>
    <Right>
      <TouchableOpacity style={styles.send_btn} onPress={props.OnShare}>
        <Text style={styles.send_text}>Invite</Text>
      </TouchableOpacity>
    </Right>
  </ListItem>
);
const SearchFriend = () => {
  const navigation = useNavigation();
  const [MobileChecking, setMobileChecking] = useState(false);
  const [TheUserMobile, setTheUserMobile] = useState('');
  // ---user found
  const [CurrentUserMobile, setCurrentUserMobile] = useState('');
  const [UserFound, setUserFound] = useState(null);
  const [UserFname, setUserFname] = useState('');
  const [UserId, setUserId] = useState('');
  const [UserProfilePic, setUserProfilePic] = useState('');
  // ----------------------------checking user have account or not
  const ValidatePhone = async Phone => {
    let ThisMobile = '';
    try {
      ThisMobile = await AsyncStorage.getItem('userMobile');
      setCurrentUserMobile(ThisMobile);
    } catch (e) {
      console.log(e);
    }
    setUserFound(null);
    setTheUserMobile(Phone);
    setMobileChecking(true);
    const re = /^[6-9]{1}[0-9]{9}$/;
    var PhonePattern = Phone.match(re);
    if (Phone === '') {
      // setValidationPhone(false);
      // setPhoneErrorText('Please enter correct Mobile Number!');
    } else if (PhonePattern) {
      const apiAccountDetails =
        'https://esigm.com/thecircle/v1/action.php?action=chech_the_mobile_number_available&input=' +
        Phone;
      fetch(apiAccountDetails)
        .then(res => res.json())
        .then(AccountDetailsJson => {
          if (AccountDetailsJson === false) {
            setUserFound(false);
            setMobileChecking(false);
          } else {
            setUserFname(AccountDetailsJson[0].fname);
            setUserProfilePic(AccountDetailsJson[0].profile_pic);
            setUserId(AccountDetailsJson[0].user_id);
            setUserFound(true);
            setMobileChecking(false);
          }
        })
        .catch(function (error) {
          // CheckTheNetwork()
          console.warn('error', error);
        });
    } else {
      console.log('pattern check');
      // setValidationPhone(false);
      // setPhoneErrorText('Enter correct Mobile Number!');
    }
  };
  // ===============
  const OnShare = async () => {
    const ShareContent = {
      message: 'this is a test message to share.',
      url: imgs.invite_image,
    };
    try {
      const ShareResponse = await Share.open(ShareContent);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Header style={{margin: 0, backgroundColor: colors.white}}>
        <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity
              style={styles.back_btn}
              onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                style={styles.back_icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <TextInput
              placeholder="Friend mobile number"
              styles={styles.text_input}
              onChangeText={e => ValidatePhone(e)}
              keyboardType="numeric"
              fontFamily={fonts.PrimaryBoldFont}
            />
          </View>
          <TouchableOpacity style={styles.right}>
            {MobileChecking ? (
              <ActivityIndicator />
            ) : // <Ionicons name="checkmark-circle" style={styles.check_icon} />
            null}
          </TouchableOpacity>
        </View>
      </Header>
      {UserFound === null ? null : UserFound ? (
        <UserCard
          userFname={UserFname}
          UserProfilePic={UserProfilePic}
          userId={UserId}
          userMobile={TheUserMobile}
          CurrentUserMobile={CurrentUserMobile}
          navigation={navigation}
        />
      ) : (
        <UserNotFound userMobile={TheUserMobile} OnShare={OnShare} />
      )}
    </Container>
  );
};

export default SearchFriend;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },

  left: {
    // width:'10%'
  },
  body: {
    width: '80%',
  },
  right: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  check_icon: {
    fontSize: 25,
  },
  back_btn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_icon: {
    fontSize: 25,
    color: colors.black,
  },
  text_input: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontHeadding,
  },
  //   =============user card related
  user_con: {
    backgroundColor: colors.bglight,
    marginLeft: 0,
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  user_image: {
    width: 50,
    height: 50,
  },
  username: {
    fontFamily: fonts.PrimaryFont,
  },
  user_phone: {
    fontFamily: fonts.PrimaryBoldFont,
  },
  send_btn: {
    borderColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.black,
  },
  send_text: {
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'uppercase',
    color: colors.white,
  },
  you_btn: {
    borderColor: colors.white,
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.bglight,
  },
  you_text: {
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'uppercase',
    color: colors.black,
  },
  //   =============user not found
  usernot__con: {
    borderLeftWidth: 10,
    borderColor: colors.red,
    backgroundColor: colors.bglight,
    marginLeft: 0,
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  usernot__image: {
    width: 50,
    height: 50,
  },
  not_username: {
    fontFamily: fonts.PrimaryFont,
  },
  not_user_phone: {
    fontFamily: fonts.PrimaryBoldFont,
    color: colors.red,
  },
});
