import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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
// --
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import {useNavigation} from '@react-navigation/native';
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
function UserCard() {
  return (
    <ListItem thumbnail noBorder style={styles.user_con}>
      <Left>
        <Thumbnail
          source={{
            uri: 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg',
          }}
          style={styles.user_image}
        />
      </Left>
      <Body>
        <Text style={styles.username}>Sankhadeep</Text>
        <Text note numberOfLines={1} style={styles.user_phone}>
          9505504113
        </Text>
      </Body>
      <Right>
        <TouchableOpacity style={styles.send_btn}>
          <Text style={styles.send_text}>Send</Text>
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
}
const UserNotFound = () => (
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
      <Text style={styles.not_username}>User not found</Text>
      <Text note numberOfLines={1} style={styles.not_user_phone}>
        9505504113
      </Text>
    </Body>
    <Right>
      <TouchableOpacity style={styles.send_btn}>
        <Text style={styles.send_text}>Invite</Text>
      </TouchableOpacity>
    </Right>
  </ListItem>
);
const SearchFriend = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header style={{margin: 0}}>
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
            />
          </View>
          <View style={styles.right}>
            <Icon active name="arrow-forward" />
          </View>
        </View>
      </Header>
      <UserCard />
      <UserNotFound />
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
  },
  send_text: {
    fontFamily: fonts.PrimaryBoldFont,
    textTransform: 'uppercase',
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
