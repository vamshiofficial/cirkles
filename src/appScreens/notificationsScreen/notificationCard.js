import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import fonts from '../../../assets/custom/fonts';
import colors from '../../../assets/custom/colors';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
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

const NotificationCard = props => {
  return (
    <Animatable.View animation={'fadeIn'} style={styles.NTFcon}>
      <ListItem avatar noBorder>
        <Left>
          <Thumbnail
            style={[
              styles.profileImage,
              {
                borderWidth: 3,
                borderColor:
                  props.NotificationType === 'MESSAGE'
                    ? colors.black
                    : props.NotificationType === 'SUCCESS'
                    ? colors.green
                    : props.NotificationType === 'DANGER'
                    ? colors.opens
                    : props.NotificationType === 'APP'
                    ? colors.Primary
                    : colors.white,
              },
            ]}
            source={{
              uri: props.Data.profile_image,
            }}
          />
        </Left>
        <Body>
          <View style={styles.text_con}>
            <Text style={styles.the_user_name_text}>
               {props.Data.the_user_name}
            </Text>
            <Text note style={styles.messageText}>
              {' '}
              {props.Data.ntf_text}
            </Text>
          </View>
          <Text style={styles.time}>{props.Data.post_time}</Text>
        </Body>
        <Right />
      </ListItem>
    </Animatable.View>
  );
};
export default NotificationCard;
