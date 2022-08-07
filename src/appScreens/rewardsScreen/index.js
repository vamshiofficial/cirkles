import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import styles from './styles';
import {BottomSheet} from 'react-native-btr';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {List} from 'native-base';
import RewardCard from './RewardCard';
import Share from 'react-native-share';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/custom/colors';
import LoginBtn from '../components/loginBtn';
import {useNavigation} from '@react-navigation/native';
import MenuSheet from './menu_sheet';
import RewardDetailsSheet from './RewardDetailsSheet';
import NextPaymentSheet from './expireSheet';
// import {BottomSheet} from 'react-native-btr';
function HeaderSection(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.HeaderSection}>
      <View style={styles.rewardCount}>
        <FontAwesome name="rupee" style={styles.rewardCountIcon} />
        <Text style={styles.rewardCountText}>{props.UserRewards}</Text>
      </View>
      <Text style={styles.rewardfooter}>
        {props.UserName}, Your total un used rewards
      </Text>
      <View style={styles.top_btn_grp}>
        <TouchableOpacity
          style={styles.top_btn}
          onPress={() => props.ScanEsyPayBtn()}>
          <MaterialCommunityIcons name="qrcode-scan" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Scan esy pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.top_btn}
          onPress={() => navigation.navigate('SearchFriend')}>
          <Ionicons name="md-arrow-redo-outline" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Gift to friend.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const RewardsScreen = ({navigation}) => {
  const [Detailsvisible, setDetailsVisible] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [RewardMenuModal, setRewardMenuModal] = useState(false);
  const [ShowRewardDetails, setShowRewardDetails] = useState([]);
  //------
  const [loading, SetLoading] = useState(true);
  const [data, SetData] = useState([]);
  const [dataLoading, SetDataLoading] = useState(false);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  // -----header items
  const [NextPaymentvisible, setNextPaymentVisible] = useState(false);
  const [NextPayment, setNextPayment] = useState('');
  const [NextPaymentDate, setNextPaymentDate] = useState('');
  const [PrevPaymentDate, setPrevPaymentDate] = useState('');
  const [UserName, setUserName] = useState('');
  const [UserRewards, setUserRewards] = useState('');
  // ------payments related
  //===load for page shimmer
  setTimeout(() => {
    SetLoading(false);
  }, 1000);
  //-------------------------------
  useEffect(() => {
    const GetUserId = async () => {
      let id = '';
      try {
        id = await AsyncStorage.getItem('userToken');
        setCurrect_UserId(id);
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
    GetExpireDate();
  }, []);
  // ====
  const GetExpireDate = async () => {
    let id = '';
    try {
      id = await AsyncStorage.getItem('userToken');
    } catch (e) {
      console.log(e);
    }
    if (id !== null) {
      const apiURL = `https://esigm.com/thecircle/v1/action.php?action=next____outlet_payment_time&user_id=${id}`;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          console.log('expire', resJson);
          setNextPayment(resJson[0].next_payment);
          setUserName(resJson[0].user_name);
          setUserRewards(resJson[0].total_rewards);
          setPrevPaymentDate(resJson[0].prev_pay_date);
          setNextPaymentDate(resJson[0].next_pay_date);
        })
        .catch(function (e) {
          console.warn(e);
        });
    }
  };
  useEffect(() => {
    if (!lastpage_reached) {
      fetchdata();
    }
  }, [pageCurrent]);
  //-------------------------------
  const fetchdata = async () => {
    let id = '';
    try {
      id = await AsyncStorage.getItem('userToken');
      setCurrect_UserId(id);
    } catch (e) {
      console.log(e);
    }
    SetDataLoading(true);
    if (id !== null) {
      const apiURL =
        `https://esigm.com/thecircle/v1/rewards.php?action=get_all___rewards_list&user_id=${id}&page=` +
        pageCurrent;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          // console.log(resJson);
          SetDataLoading(false);
          if (resJson === 'NO_DATA_FOUND') {
            SetDataLoading(false);
            Set_total_rows(false);
          } else if (resJson === 'NO_MORE_RECORDS_FOUND') {
            Setlastpage_reached(true);
            SetDataLoading(false);
            Set_total_rows(true);
          } else {
            SetDataLoading(false);
            Set_total_rows(true);
            if (pageCurrent === 1) {
              SetData(resJson);
            } else {
              SetData(data.concat(resJson));
            }
          }
        })
        .catch(function (e) {
          console.warn(e);
        });
    } else {
      console.warn('login required');
    }
  };
  // ==========render footer data
  const RenderFooter = () => {
    return (
      <View style={styles.footer_con}>
        {dataLoading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{opacity: 1}}
            color={colors.green}
          />
        ) : null}
        {lastpage_reached ? (
          <Text style={styles.footer_text}>No More Rewards.</Text>
        ) : // <Text style={styles.footer_text}>No More Rewards.</Text>
        null}
      </View>
    );
  };
  // =============load more data
  const HandleLoadMore = () => {
    // SetDataLoading(true);
    setPageCurrent(pageCurrent + 1);
    // console.warn(pageCurrent);
  };
  // =================SCAN ESY PAY
  const ScanEsyPayBtn = () => {
    if (NextPayment === 'PAY_NOW') {
      navigation.navigate('PayOutletScaner');
    } else {
      setNextPaymentVisible(!NextPaymentvisible);
    }
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={Currect_UserId!==null?styles.MainHeaderSection:styles.MainHeaderSectionShadow}>
        <Text style={styles.Mainhead_text}>Rewards</Text>
      </View>
      {Currect_UserId !== null ? (
        loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {total_rows ? (
              <View style={{backgroundColor: colors.white}}>
                <FlatList
                  key={'#'}
                  data={data}
                  renderItem={({item}) => (
                    <RewardCard
                      post={item}
                      Detailsvisible={Detailsvisible}
                      setDetailsVisible={setDetailsVisible}
                      setShowRewardDetails={setShowRewardDetails}
                      // RewardData={RewardData}
                      // SetRewardData={SetRewardData}
                    />
                  )}
                  keyExtractor={item => item.payment_id}
                  ListFooterComponent={RenderFooter}
                  ListHeaderComponent={
                    <HeaderSection
                      NextPayment={NextPayment}
                      UserName={UserName}
                      UserRewards={UserRewards}
                      ScanEsyPayBtn={ScanEsyPayBtn}
                    />
                  }
                  onEndReached={HandleLoadMore}
                  onEndReachedThreshold={1}
                  // showsVerticalScrollIndicator={true}
                  // scrollEventThrottle={0}
                  numColumns={2}
                />
              </View>
            ) : (
              <>
                <HeaderSection
                  NextPayment={NextPayment}
                  UserName={UserName}
                  UserRewards={UserRewards}
                  ScanEsyPayBtn={ScanEsyPayBtn}
                />
                <View style={styles.empty_con}>
                  <FeatherIcon
                    active
                    name="award"
                    size={150}
                    color={colors.bglight}
                  />
                  <Text style={styles.no_rewards_text}>No Rewards Found!</Text>
                </View>
              </>
            )}
            <View style={styles.bottomRightBtnsCon}>
              <TouchableOpacity
                style={styles.qrScanBtn}
                onPress={() => setRewardMenuModal(!RewardMenuModal)}>
                <FeatherIcon name="menu" style={styles.qrIcon} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.shareScanBtn} onPress={OnShare}>
                <Ionicons
                  name="md-arrow-redo-outline"
                  style={styles.shareIcon}
                />
              </TouchableOpacity> */}
            </View>
      <MenuSheet visible={RewardMenuModal} setVisible={setRewardMenuModal} />
          </>
        )
      ) : (
        <>
          <View style={styles.OnlyHeaderSection} />
          <View style={styles.without_login_con}>
            <Ionicons name="trophy-outline" size={150} color={colors.bglight} />
            <Text style={styles.without_login_text}>
              Login to view your Rewards here.
            </Text>
            <LoginBtn onPress={() => navigation.navigate('LoginScreen')} />
          </View>
        </>
      )}
      <RewardDetailsSheet
        Detailsvisible={Detailsvisible}
        setDetailsVisible={setDetailsVisible}
        ShowRewardDetails={ShowRewardDetails}
      />
      <NextPaymentSheet
        NextPaymentvisible={NextPaymentvisible}
        setNextPaymentVisible={setNextPaymentVisible}
        NextPayment={NextPayment}
        NextPaymentDate={NextPaymentDate}
        PrevPaymentDate={PrevPaymentDate}
      />
    </View>
  );
};
export default RewardsScreen;
