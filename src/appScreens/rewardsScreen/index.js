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
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/custom/colors';
import LoginBtn from '../components/loginBtn';

function HeaderSection({navigation}) {
  return (
    <View style={styles.HeaderSection}>
      <View style={styles.rewardCount}>
        <FontAwesome name="rupee" style={styles.rewardCountIcon} />
        <Text style={styles.rewardCountText}>8732</Text>
      </View>
      <Text style={styles.rewardfooter}>
        Vamshi, Your total un used rewards
      </Text>
    </View>
  );
}

const RewardsScreen = () => {
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
  }, 2000);
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
    return () => {
      fetchdata(5445)
    }
  }, [pageCurrent])
  //-------------------------------
  const fetchdata = id => {
    if (lastpage_reached === true) {
      Set_total_rows(true);
      Setlastpage_reached(true);
    } else {
      SetDataLoading(true);
      const apiURL = `https://esigm.com/thecircle/v1/rewards.php?action=get_all_rewards_list&user_id=${id}&page=${pageCurrent}`;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          if (resJson !== "NO_DATA_FOUND") {
            if (resJson[0].total_rows > 0) {
              if (resJson[0].total_pages !== pageCurrent) {
                console.log('if !== page num',resJson,pageCurrent);
                // Set_total_rows(true);
                SetDataLoading(false);
                Setlastpage_reached(false);
                SetData(data.concat(resJson));
              } else {
                console.log('else !== page num',resJson,pageCurrent);
                // Set_total_rows(true);
                SetDataLoading(false);
                Setlastpage_reached(true);
                SetData(data.concat(resJson));
              }
              // Set_total_rows(true);
              // SetDataLoading(false);
            } else {
              console.log('else rows >',resJson,pageCurrent);
              Setlastpage_reached(true);
              //----
            }
          } else {
            console.log('main else',resJson,pageCurrent);
            Set_total_rows(true);
            Setlastpage_reached(true);
          }
        })
        .catch(function () {
          // console.warn('error');
        });
    }
  };
  // ==========render footer data
  const RenderFooter = () => {
    return dataLoading ? (
      <View style={styles.footer_con}>
        {lastpage_reached ? (
          <Text style={styles.footer_text}>No More Rewards.</Text>
        ) : (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{opacity: 1}}
            color={colors.Primary}
          />
        )}
      </View>
    ) : null;
  };
  // =============load more data
  const HandleLoadMore = () => {
    // SetDataLoading(true);
    setPageCurrent(pageCurrent + 1);
    console.warn(pageCurrent);
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
                  onEndReachedThreshold={0}
                  // showsVerticalScrollIndicator={true}
                  // scrollEventThrottle={0}
                  numColumns={2}
                />
              </List>
            ) : (
              <View style={styles.empty_con}>
                <FeatherIcon
                  active
                  name="award"
                  size={150}
                  color={colors.bglight}
                />
                <Text style={styles.no_rewards_text}>No Rewards Found!</Text>
              </View>
            )}
            <View style={styles.bottomRightBtnsCon}>
              <TouchableOpacity style={styles.qrScanBtn}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  style={styles.qrIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareScanBtn} onPress={OnShare}>
                <Ionicons
                  name="md-arrow-redo-outline"
                  style={styles.shareIcon}
                />
              </TouchableOpacity>
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
