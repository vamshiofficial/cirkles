import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import fonts from '../../../assets/custom/fonts';
import colors from '../../../assets/custom/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from 'native-base';

const OutletCommentCard = props => {
  return (
    <View style={styles.con}>
      <ListItem avatar noBorder style={{marginLeft: 0}}>
        <Left>
          <Thumbnail
            style={[styles.profileImage]}
            source={{
              uri: props.post.profile_image,
            }}
          />
        </Left>
        <Body>
          <Text note style={styles.messageText}>
            {props.post.feedback_text}
          </Text>
          <View style={styles.flex}>
            <Text style={styles.user_name}>{props.post.the_user_name}</Text>
            <Octicons name="dot-fill" style={styles.dot_icon} />
            <Text style={styles.time}>{props.post.post_time}</Text>
          </View>
        </Body>
        <Right />
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    marginLeft: 0,
    width: '90%',
    // height:'100%',
    alignSelf: 'center',
    // marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.bglight,
  },
  profileImage: {
    borderRadius: 13,
    width: 40,
    height: 40,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_name: {
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontSmall,
    color: colors.black,
  },
  dot_icon: {
    paddingHorizontal: 5,
    fontSize: 5,
    color: colors.white4,
  },
  time: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSmall,
    color: colors.white5,
  },
  messageText: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
  },
});
export default OutletCommentCard;
