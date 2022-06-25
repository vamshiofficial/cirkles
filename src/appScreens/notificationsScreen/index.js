import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import NotificationCard from './notificationCard';
import {List} from 'native-base';
import colors from '../../../assets/custom/colors';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const NotificationsScreen = () => {
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
      } catch (e) {
        console.log(e);
      }
    };
    GetUserId();
    if (!lastpage_reached) {
      fetchdata(54);
    }
  }, [pageCurrent]);
  //===============

  const fetchdata = id => {
    SetDataLoading(true);
    const apiURL =
      `https://esigm.com/thecircle/v1/action.php?action=get_notifications_list&the_user_id=${id}&page=` +
      pageCurrent;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson === 'no_data_found') {
          Set_total_rows(false);
        } else {
          if (resJson[0].total_rows === 0) {
            Set_total_rows(false);
            Set_total_rows_count(resJson[0].total_rows);
            Setlastpage_reached(true);
          } else {
            Set_total_rows(true);
            Set_total_rows_count(resJson[0].total_rows);
            //----
            if (resJson[0].total_pages === pageCurrent) {
              SetData(data.concat(resJson));
              Setlastpage_reached(true);
            } else {
              SetData(data.concat(resJson));
              Setlastpage_reached(false);
            }
          }
        }
      })
      .catch(function () {
        // CheckTheNetwork()
      });
  };
  // ============render footer data
  const RenderFooter = () => {
    return dataLoading ? (
      <View style={{paddingVertical: 30, marginBottom: 50}}>
        {lastpage_reached ? (
          <Text style={styles.only_text}>You are reached bottom</Text>
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
  // ========load more data
  const HandleLoadMore = () => {
    SetDataLoading(true);
    setPageCurrent(pageCurrent + 1);
  };
  return (
    <ScrollView style={styles.con}>
      <View style={styles.HeaderSection} />
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
                onEndReachedThreshold={0}
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
    </ScrollView>
  );
};

export default NotificationsScreen;
