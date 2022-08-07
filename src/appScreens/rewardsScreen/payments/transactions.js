import React, {useEffect, useState} from 'react';
import {Button, Header, Title, Container} from 'native-base';
import {List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
import colors from '../../../../assets/custom/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import fonts from '../../../../assets/custom/fonts';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RewardCard from '../RewardCard';
import { useNavigation } from '@react-navigation/native';

const TransactionHistory = () => {
  const navigation = useNavigation();
  const [loading, SetLoading] = useState(false);
  const [data, SetData] = useState([]);
  const [dataLoading, SetDataLoading] = useState(false);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  //   ---------------
  useEffect(() => {
    if (!lastpage_reached) {
      fetchdata();
    }
  }, [pageCurrent]);
  //----------------
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
        `https://esigm.com/thecircle/v1/action.php?action=get___all_transactions_list&user_id=${id}&page=` +
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
          <Text style={styles.footer_text}>No More.</Text>
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
  //   ================
  const TransCard = props => {
    return (
      <ListItem avatar noBorder style={styles.list_item}>
        <Left>
          <Thumbnail
            style={styles.trans_image}
            source={{uri: props.post.trans_pic_url}}
          />
        </Left>
        <Body>
          <Text style={styles.trans_uname}>
          {props.post.trans_type === 'SENDER' ? (
            "Sent to, "
          ) : props.post.trans_type === 'RECEIVER' ? (
            "Received from, "
          ) : (
            "Paid, "
          )}
            {props.post.trans_username}</Text>
          <Text style={styles.trans_time} note>
            {props.post.trans_time}
          </Text>
        </Body>
        <Right>
          {props.post.trans_type === 'SENDER' ? (
            <Text note style={styles.amount_red}>
              -{props.post.trans_amount}
            </Text>
          ) : props.post.trans_type === 'RECEIVER' ? (
            <Text note style={styles.amount_green}>
              +{props.post.trans_amount}
            </Text>
          ) : (
            <Text note style={styles.amount_black}>
              {props.post.trans_amount}
            </Text>
          )}
        </Right>
      </ListItem>
    );
  };

  return (
    <Container>
      <Header
        noLeft
        // transparent
        // androidStatusBarColor={colors.black}
        style={{
          backgroundColor: colors.white,
        //   marginBottom: 0.5,
        }}>
        <Body
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: 40,
            }}>
            <FeatherIcon
              name="chevron-left"
              style={{
                fontSize: 22,
                color: colors.black,
              }}
            />
          </Button>
          <Title
            style={{
              fontFamily: fonts.PrimaryFont,
              fontSize: fonts.FontSubHeadding,
              color: colors.black, // textAlign:'left'
            }}>
            Transactions History
          </Title>
        </Body>
      </Header>
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
                <List>
                  <FlatList
                    key={'#'}
                    data={data}
                    renderItem={({item}) => <TransCard post={item} />}
                    keyExtractor={item => item.trans_id}
                    ListFooterComponent={RenderFooter}
                    //   ListHeaderComponent={
                    //     <HeaderSection
                    //       NextPayment={NextPayment}
                    //       UserName={UserName}
                    //       UserRewards={UserRewards}
                    //       ScanEsyPayBtn={ScanEsyPayBtn}
                    //     />
                    //   }
                    onEndReached={HandleLoadMore}
                    onEndReachedThreshold={0.5}
                    // showsVerticalScrollIndicator={true}
                    // scrollEventThrottle={0}
                  />
                </List>
              </View>
            ) : (
              <>
                {/* <HeaderSection
                  NextPayment={NextPayment}
                  UserName={UserName}
                  UserRewards={UserRewards}
                  ScanEsyPayBtn={ScanEsyPayBtn}
                /> */}
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
    </Container>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
    list_item:{
        backgroundColor:colors.bglight,
        marginLeft:0,
        paddingHorizontal:25,
        paddingVertical:15,
        // marginBottom:10,
        borderBottomColor:colors.white,
        borderBottomWidth:1
    },
    trans_image:{
        width:45,
        height:45,
    },
trans_uname:{
    fontFamily:fonts.PrimaryBoldFont,
    fontSize:fonts.FontHeadding,
    color:colors.black
},
trans_time:{
    fontFamily:fonts.PrimaryFont,
    fontSize:fonts.FontBody,
    color:colors.white4
},
amount_red:{
    fontFamily:fonts.PrimaryBoldFont,
    fontSize:fonts.FontHeadding,
    color:colors.red,
    backgroundColor:colors.white,
    paddingHorizontal:15,
    borderRadius:15
},
amount_green:{
    fontFamily:fonts.PrimaryBoldFont,
    fontSize:fonts.FontHeadding,
    color:colors.green,
    backgroundColor:colors.white,
    paddingHorizontal:15,
    borderRadius:15
},
amount_black:{
    fontFamily:fonts.PrimaryBoldFont,
    fontSize:fonts.FontHeadding,
    color:colors.white,
    backgroundColor:colors.black,
    paddingHorizontal:15,
    borderRadius:15
},
footer_con:{
    paddingTop: 15,
    paddingBottom: 150,
    alignItems: 'center',
    justifyContent: 'center',
},
footer_text:{
    fontFamily:fonts.PrimaryFont,
    fontSize:fonts.FontHeadding,
    color:colors.white3,
}
});
