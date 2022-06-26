import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {BottomSheet} from 'react-native-btr';

const RewardDetailsSheet = props => {
  console.log('sheet', props);
  const RewardData = {
    image:
      'https://i.pinimg.com/236x/08/c0/90/08c09014b4405020915298a6cf874b6a--female-faces-girl-photography.jpg',
    card: '85',
    payment_status: 'Paid',
    paid_by: 'PhonePe',
    posted_at: '08-Dec-2020 01:01 am',
    paid_at: '26-Feb-2021 01:07 am',
    id: '456523',
  };
  return (
    <BottomSheet
      visible={props.Detailsvisible}
      onBackButtonPress={() => props.setDetailsVisible(false)}
      onBackdropPress={() => props.setDetailsVisible(false)}>
      <View style={styles.bottomNavigationView}>
        <View style={styles.reward_image_bg}>
          <View style={styles.reward_image}>
            <Image source={{uri: props.RewardData.image}} style={{flex: 1}} />
          </View>
        </View>
        <Text style={styles.pages_text}>
          Esigm Pages: {props.RewardData.card}
        </Text>
        <View style={styles.reward_details}>
          <Text style={styles.reward_text}>
            Payment: {props.RewardData.payment_status}
          </Text>
          <Text style={styles.reward_text}>
            PaidUsing: {props.RewardData.paid_by}
          </Text>
          <Text style={styles.reward_text}>
            RequestedTime: {props.RewardData.posted_at}
          </Text>
          <Text style={styles.reward_text}>
            PaidTime: {props.RewardData.paid_at}
          </Text>
          <Text style={styles.reward_text}>
            PaymentID: {props.RewardData.pay_id}
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default RewardDetailsSheet;
