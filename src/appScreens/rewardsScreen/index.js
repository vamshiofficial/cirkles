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

function HeaderSection() {
  const navigation = useNavigation();
  const endTime = new Date('July 28, 2022 00:00:00').getTime();
  const [currentTime,setcurrentTime] = useState(new Date().getTime());
  const gap = endTime - currentTime; //177670892

  const seconds = 1000; // in milliseconds
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  const remainingDays = Math.floor(gap / days);
  const remainingHours = Math.floor( (gap % days) / hours);
  const remainingMinutes = Math.floor( (gap % hours) / minutes);
  const remainingSeconds = Math.floor( (gap % minutes) / seconds);

  useEffect(()=>{
    setTimeout(()=>setcurrentTime(new Date().getTime()),1000);
  },[currentTime]) // 11:30:55
  return (
    <View style={styles.HeaderSection}>
      <View style={styles.rewardCount}>
        <FontAwesome name="rupee" style={styles.rewardCountIcon} />
        <Text style={styles.rewardCountText}>873</Text>
      </View>
      <Text style={styles.rewardfooter}>
        Vamshi, Your total un used rewards
      </Text>
      <View style={styles.top_btn_grp}>
        <TouchableOpacity
          style={styles.top_btn}
          onPress={() => navigation.navigate('PaymentsSection')}>
          <MaterialCommunityIcons name="qrcode-scan" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Scan esy pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.top_btn}
          onPress={() => navigation.navigate('SearchFriend')}
        >
          <Ionicons name="md-arrow-redo-outline" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Gift to friend.</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.countdown_row}>
          <View style={styles.countdown}>
              <Text style={styles.countdown_text}>{remainingDays}</Text>
              <Text style={styles.countdown_name}>Days</Text>
          </View>
          <View style={styles.countdown}>
              <Text style={styles.countdown_text}>{remainingHours}</Text>
              <Text style={styles.countdown_name}>Hours</Text>
          </View>
          <View style={styles.countdown}>
              <Text style={styles.countdown_text}>{remainingMinutes}</Text>
              <Text style={styles.countdown_name}>Minutes</Text>
          </View>
          <View style={styles.countdown}>
              <Text style={styles.countdown_text}>{remainingSeconds}</Text>
              <Text style={styles.countdown_name}>Seconds</Text>
          </View>
        </View>
      {/* <View style={styles.top_btn_grp}>
        <TouchableOpacity style={styles.top_btn}>
          <Octicons name="history" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Transactions history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.top_btn}>
          <Ionicons name="md-arrow-redo-outline" style={styles.top_icon} />
          <Text style={styles.top_btn_text}>Invite friend</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const RewardsScreen = ({navigation}) => {
  const [Detailsvisible, setDetailsVisible] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [visible, setvisible] = useState(false);
  const [rewardsList, setRewardsList] = useState(null);
  //------
  const [loading, SetLoading] = useState(true);
  const [data, SetData] = useState([]);
  const [dataLoading, SetDataLoading] = useState(false);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [reload, setReload] = useState(true);
  // ------payments related
  const [PayScanVisible, setPayScanVisible] = useState(false)
  //-------
  const [RewardData, SetRewardData] = useState({
    id: '',
    image: '',
    payment_status: '',
    paid_by: '',
    posted_at: '',
    paid_at: '',
    card: '',
  });
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
  }, []);
  // ====
  useEffect(() => {
    // return () => {
    if (!lastpage_reached) {
      fetchdata();
    }
    // };
  }, [pageCurrent]);
  //-------------------------------
  const fetchdata = () => {
    SetDataLoading(true);
    if (Currect_UserId !== null) {
      const apiURL =
        `https://esigm.com/thecircle/v1/rewards.php?action=get_all___rewards_list&user_id=${Currect_UserId}&page=` +
        pageCurrent;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson);
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
      alert('login required');
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
  // ===========================
  const ShowRewardDetails = (
    id,
    image,
    payment_status,
    paid_by,
    posted_at,
    paid_at,
    card,
  ) => {
    SetRewardData({
      id: id,
      image,
      image,
      payment_status: payment_status,
      paid_by: paid_by,
      posted_at: posted_at,
      paid_at: paid_at,
      card: card,
    });
    setvisible(true);
  };
  // -----
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
    <>
      {Currect_UserId !== null ? (
        loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {total_rows ? (
              <List>
                <FlatList
                  key={'#'}
                  data={data}
                  renderItem={({item}) => (
                    <RewardCard
                      post={item}
                      Detailsvisible={Detailsvisible}
                      setDetailsVisible={setDetailsVisible}
                      RewardData={RewardData}
                      SetRewardData={SetRewardData}
                    />
                  )}
                  keyExtractor={item => item.pay_id}
                  ListFooterComponent={RenderFooter}
                  ListHeaderComponent={HeaderSection}
                  onEndReached={HandleLoadMore}
                  onEndReachedThreshold={1}
                  // showsVerticalScrollIndicator={true}
                  // scrollEventThrottle={0}
                  numColumns={2}
                />
              </List>
            ) : (
              <>
                <HeaderSection 
                
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
              <TouchableOpacity style={styles.qrScanBtn}>
                <FeatherIcon name="menu" style={styles.qrIcon} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.shareScanBtn} onPress={OnShare}>
                <Ionicons
                  name="md-arrow-redo-outline"
                  style={styles.shareIcon}
                />
              </TouchableOpacity> */}
            </View>
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
    </>
  );
};
export default RewardsScreen;
