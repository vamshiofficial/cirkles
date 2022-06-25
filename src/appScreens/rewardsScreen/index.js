import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {BottomSheet} from 'react-native-btr';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {List} from 'native-base';
import RewardCard from './RewardListItem';
import Share from 'react-native-share';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const RewardsScreen = () => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(visible => !visible);
  }
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
  const OnShare = async () => {
    const ShareContent = {
      message: 'this is a test message to share.',
    };
    try {
      const ShareResponse = await Share.open(ShareContent);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.con}>
      <View style={styles.HeaderSection}>
        <View style={styles.rewardCount}>
          <FontAwesome name="rupee" style={styles.rewardCountIcon} />
          <Text style={styles.rewardCountText}>8732</Text>
        </View>
        <Text style={styles.rewardfooter}>
          Vamshi, Your total un used rewards
        </Text>
      </View>
      <View style={styles.body}>
        <List>
          <RewardCard
            ImageUrl="https://i.pinimg.com/236x/08/c0/90/08c09014b4405020915298a6cf874b6a--female-faces-girl-photography.jpg"
            CardText="Krishna gifted you 10 rupees worth reward"
            CardTime="On 05-02-2021 10:30 PM"
          />
          <RewardCard
            ImageUrl="https://i.pinimg.com/236x/08/c0/90/08c09014b4405020915298a6cf874b6a--female-faces-girl-photography.jpg"
            CardText="Krishna gifted you 10 rupees worth reward"
            CardTime="On 05-02-2021 10:30 PM"
          />
        </List>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Text>open card Ui</Text>
        </TouchableOpacity>
        <BottomSheet
          visible={visible}
          onBackButtonPress={() => setVisible(false)}
          onBackdropPress={() => setVisible(false)}>
          <View style={styles.bottomNavigationView}>
            <View style={styles.reward_image_bg}>
              <View style={styles.reward_image}>
                <Image source={{uri: RewardData.image}} style={{flex: 1}} />
              </View>
            </View>
            <Text style={styles.pages_text}>
              Esigm Pages: {RewardData.card}
            </Text>
            <View style={styles.reward_details}>
              <Text style={styles.reward_text}>
                Payment: {RewardData.payment_status}
              </Text>
              <Text style={styles.reward_text}>
                PaidUsing: {RewardData.paid_by}
              </Text>
              <Text style={styles.reward_text}>
                RequestedTime: {RewardData.posted_at}
              </Text>
              <Text style={styles.reward_text}>
                PaidTime: {RewardData.paid_at}
              </Text>
              <Text style={styles.reward_text}>PaymentID: {RewardData.id}</Text>
            </View>
          </View>
        </BottomSheet>
      </View>
      <View style={styles.bottomRightBtnsCon}>
        <TouchableOpacity style={styles.qrScanBtn}>
          <MaterialCommunityIcons name="qrcode-scan" style={styles.qrIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareScanBtn} onPress={OnShare}>
          <Ionicons name="md-arrow-redo-outline" style={styles.shareIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RewardsScreen;
