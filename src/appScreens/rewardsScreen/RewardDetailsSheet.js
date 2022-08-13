import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {BottomSheet} from 'react-native-btr';

const RewardDetailsSheet = props => {
  // console.log('sheet', props);
  return (
    <BottomSheet
      visible={props.Detailsvisible}
      onBackButtonPress={() => props.setDetailsVisible(false)}
      onBackdropPress={() => props.setDetailsVisible(false)}>
      <View style={styles.bottomNavigationView}>
        <View style={styles.reward_image_bg}>
          <View style={styles.reward_image}>
            <Image
              source={{uri: props.ShowRewardDetails.image_source}}
              style={{flex: 1}}
            />
          </View>
        </View>
        {/* <Text style={styles.pages_text}>
          Esigm Pages: {props.ShowRewardDetails.app}
        </Text> */}
        {props.ShowRewardDetails.app === 'THECIRCLE' ? (
          <View style={styles.reward_details}>
            <Text style={styles.reward_text}>
              Amount: {props.ShowRewardDetails.amount}
            </Text>
            <Text style={styles.reward_text}>
              On: {props.ShowRewardDetails.posted_time}
            </Text>
            <Text style={styles.reward_text}>
              App: {props.ShowRewardDetails.app}
            </Text>
            <Text style={styles.reward_text}>
              RewardFor: {props.ShowRewardDetails.reward_for}
            </Text>
            <Text style={styles.reward_text}>
              PaymentID: {props.ShowRewardDetails.payment_id}
            </Text>
          </View>
        ) : (
          <View style={styles.reward_details}>
            <Text style={styles.reward_text}>
              Payment: {props.ShowRewardDetails.payment_status}
            </Text>
            <Text style={styles.reward_text}>
              PaidUsing: {props.ShowRewardDetails.paid_using}
            </Text>
            <Text style={styles.reward_text}>
              RequestedTime: {props.ShowRewardDetails.posted_time}
            </Text>
            <Text style={styles.reward_text}>
              PaidTime: {props.ShowRewardDetails.paid_time}
            </Text>
            <Text style={styles.reward_text}>
              PaymentID: {props.ShowRewardDetails.payment_id}
            </Text>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default RewardDetailsSheet;
