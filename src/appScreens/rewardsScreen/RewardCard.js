import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import fonts from '../../../assets/custom/fonts';
import colors from '../../../assets/custom/colors';
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
import RewardDetailsSheet from './RewardDetailsSheet';
import styles from './styles';
const RewardCard = props => {
  // console.log(props);
  const ShowRewardDetails = (id, image, payment_status, paid_by, posted_at, paid_at, card) => {
    props.SetRewardData({
        pay_id: id,
        image, image,
        payment_status: payment_status,
        paid_by: paid_by,
        posted_at: posted_at,
        paid_at: paid_at,
        card: card,
    }),
    props.setDetailsVisible(!props.Detailsvisible);
}
  return (
    <TouchableOpacity
      style={styles.reward_card}
      onPress={() => {
        // console.warn('sdfsdf')
        ShowRewardDetails(
          props.post.pay_id,
          props.post.image_source,
          props.post.payment_status,
          props.post.paid_by,
          props.post.posted_at,
          props.post.paid_time,
          props.post.card,
        );
      }}>
      <Image
        style={
          // [styles.profileImage],
          {flex: 1}
        }
        source={{
          uri: props.post.image_source,
        }}
      />
      {/* <ListItem avatar noBorder>
          <Left>
            <Thumbnail
              style={[styles.profileImage]}
              source={{
                uri: props.post.image_source,
              }}
            />
          </Left>
          <Body>
            <Text note style={styles.messageText}>
              {props.post.card}
            </Text>
            <Text style={styles.time}>{props.post.paid_time}</Text>
          </Body>
          <Right />
        </ListItem> */}
      <RewardDetailsSheet
        Detailsvisible={props.Detailsvisible}
        setDetailsVisible={props.setDetailsVisible}
        RewardData={props.RewardData}
        // pay_id={props.post.pay_id}
        // image_source={props.post.image_source}
        // payment_status={props.post.payment_status}
        // paid_by={props.post.paid_by}
        // posted_time={props.post.posted_time}
        // paid_time={props.post.paid_time}
        // card={props.post.card}
      />
    </TouchableOpacity>
  );
};
export default RewardCard;
