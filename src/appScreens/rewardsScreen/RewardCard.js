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

import {BottomSheet} from 'react-native-btr';
const RewardCard = props => {
  // show pop up
  const ShowTheModal = params => {
    props.setShowRewardDetails(props.post);
    props.setDetailsVisible(!props.Detailsvisible);
  };
  return (
    <TouchableOpacity
      style={styles.reward_card}
      onPress={() => {
        ShowTheModal();
      }}>
      <Image
        style={{flex: 1}}
        source={{
          uri: props.post.image_source,
        }}
      />
    </TouchableOpacity>
  );
};
export default RewardCard;
