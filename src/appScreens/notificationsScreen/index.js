import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import NotificationCard from './notificationCard';
import {List} from 'native-base';
import colors from '../../../assets/custom/colors';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginBtn from '../components/loginBtn';
const NotificationsScreen = ({navigation}) => {
  // notification types
  // blackMESSAGE--- redDANGER--- greenSUCCESS--- yellowAPP
  //------------------------
  const [loading, SetLoading] = useState(false);
  const [dataLoading, SetDataLoading] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [data, SetData] = useState([]);
  const [loadtime, setloadtimelimit] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
  //============
  useEffect(() => {
    const GetUserId = async () => {
      let id = '';
      try {
        id = await AsyncStorage.getItem('userToken');
        setCurrect_UserId(id);
        console.log('id', id);
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
    if (!lastpage_reached) {
      // console.log('user_id', Currect_UserId);
      fetchdata();
    }
  }, [pageCurrent]);
  //===============

  const fetchdata = () => {
    SetDataLoading(true);
    const apiURL =
      `https://esigm.com/thecircle/v1/action.php?action=get_notifications_list&the_user_id=${5017}&page=` +
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
  };
  // ============render footer data
  const RenderFooter = () => {
    return (
      <View>
        {dataLoading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            style={{opacity: 1}}
            color={colors.Primary}
          />
        ) : null}
        {lastpage_reached ? (
          <Text style={styles.only_text}>You are reached bottom</Text>
        ) : null}
      </View>
    );
  };
  // ========load more data
  const HandleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
  };
  return (
    <View style={styles.con}>
      <View style={styles.HeaderSection} />
      {Currect_UserId !== null ? (
        <>
          <View style={styles.body}>
            <>
              {loading ? (
                // <Comment_Follow_Shimmer />
                <ActivityIndicator size={'large'} color={colors.Primary} />
              ) : total_rows ? (
                <List>
                  <FlatList
                    style={{backgroundColor: colors.white}}
                    scrollEnabled={true}
                    data={data}
                    renderItem={({item}) => <NotificationCard Data={item} />}
                    keyExtractor={item =>
                      item.ntf_id +
                      new Date().getTime().toString() +
                      Math.floor(
                        Math.random() * Math.floor(new Date().getTime()),
                      ).toString()
                    }
                    ListFooterComponent={RenderFooter}
                    onEndReached={HandleLoadMore}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                  />
                </List>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                  }}>
                  <Icon name="bell-outline" size={150} color={colors.bglight} />
                  <Text style={styles.only_text}>No Notifications Yet!</Text>
                </View>
              )}
            </>
          </View>
        </>
      ) : (
        <View style={styles.without_login_con}>
          <Icon name="bell-outline" size={150} color={colors.bglight} />
          <Text style={styles.without_login_text}>
            Login to view your notifications here.
          </Text>
          <LoginBtn onPress={() => navigation.navigate('LoginScreen')} />
        </View>
      )}
    </View>
  );
};

export default NotificationsScreen;
