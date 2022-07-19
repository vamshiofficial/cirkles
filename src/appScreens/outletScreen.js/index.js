import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Left,
  Body,
  Right,
  Switch,
  List,
  Item,
  Input,
} from 'native-base';
import OutletCommentCard from './CommentUi';
import MenuListSheet from './MenuListSheet';
import OutletImagesSheet from './outletImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/custom/colors';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {BottomSheet} from 'react-native-btr';
function TopSection(props) {
  return (
    <View>
      <Image
        style={styles.mainBgImg}
        source={{
          uri: props.Data_main_bg,
        }}
      />
      <View style={styles.topBtnGrp}>
        {/* <TouchableOpacity style={styles.topBtn} onPress={()=>setGalleryVisible(!GalleryVisible)}>
       <Ionicons name="images-outline" style={styles.TopBtnIcon} />
      </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.topBtn}>
       <Feather name="users" style={styles.TopBtnIcon} />
      </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.topBtn}
          onPress={() => props.loadInBrowser(props.Data_google_location)}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            style={styles.TopBtnIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topBtnRating,
            {
              backgroundColor: props.isUserReacted ? 'red' : colors.white,
            },
          ]}
          onPress={() => props.UpdateReactions()}>
          <Feather name="heart" style={styles.TopRatingBtnIcon} />
          <Text style={styles.RatingCount}>{props.TotalReactions}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.aboutOutletCon}>
        <Text style={styles.OutletName}>{props.Data_oulet_name}</Text>
        <View style={styles.aboutOutlet}>
          <MaterialCommunityIcons
            name="clock-time-twelve-outline"
            style={styles.aboutOutletIcon}
          />
          <Text style={styles.aboutOutletText}>{props.Data_timings}</Text>
        </View>
        {/* <View style={styles.aboutOutlet}>
       <MaterialIcons name="double-arrow" style={styles.aboutOutletIcon} />
       <Text style={styles.aboutOutletText}>
         Online order available on Zomato,Swiggy
       </Text>
      </View> */}
        <View style={styles.aboutOutlet}>
          <MaterialIcons name="double-arrow" style={styles.aboutOutletIcon} />
          <Text style={styles.aboutOutletText}>
            Online payment options {props.Data.payment_mehods}
          </Text>
        </View>
      </View>
      <View style={styles.feedbacks_sec}>
        <Text style={styles.feedbackHeding}>
          FEEDBACKS{' '}
          {/* {props.total_rows_count != '' ? (
            <Text>({props.total_rows_count})</Text>
          ) : null} */}
        </Text>
        <Item style={[styles.feedback_form, {marginLeft: '5%'}]}>
          <View style={styles.comment_icon_con}>
            <MaterialCommunityIcons
              name="comment-outline"
              style={styles.comment_icon}
            />
          </View>
          <Input
            // value={props.CommentText}
            placeholder="Add feedback.."
            style={styles.comment_text}
            // onChangeText={e => props.Commenting(e)}
            onFocus={() =>
              props.setFeedFormVisible(!props.FeedBackSubmitVisible)
            }
            // multiline
          />
        </Item>
      </View>
    </View>
  );
}

const OutletScreen = ({navigation, route}) => {
  const {outletId} = route.params;
  const [visible, setVisible] = useState(false);
  const [GalleryVisible, setGalleryVisible] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [dataFound, setdataFound] = useState(false);
  const [Data, setData] = useState([]);
  // --
  const [TotalReactions, setTotalReactions] = useState(0);
  const [isUserReacted, setisUserReacted] = useState(false);
  // --
  // --posting comment
  const [FeedFormVisible, setFeedFormVisible] = useState(false);
  const [CommentText, setCommentText] = useState('');
  const [CommentPosted, setCommentPosted] = useState(false);
  const [FeedBackSubmitVisible, setFeedBackSubmitVisible] = useState(false);
  const [SubmitLoading, SetSubmitLoading] = useState(false);
  // -- fetching comments
  const [FeedbacksData, setFeedbacksData] = useState([]);
  const [dataLoading, SetDataLoading] = useState(false);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
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
    GetData();
    fetchFeedbacks();
    if (Currect_UserId !== null) {
      GetReactions();
    }
    // fet
  }, [outletId]);
  useEffect(() => {
    if (!lastpage_reached) {
      fetchFeedbacks();
    }
  }, [pageCurrent, CommentPosted]);
  // ===============getting outle data
  const GetData = () => {
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_this_outlet_data&outletid=${outletId}`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        // console.log('this data', resJson);
        if (resJson !== 'DATA_NOT_FOUND') {
          setData(resJson[0]);
          setdataFound(true);
        } else {
          setdataFound(false);
        }
      });
  };
  // ================ getting rating
  const GetReactions = () => {
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_outlet_reaction_details&outletid=${outletId}&user_id=${Currect_UserId}`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setTotalReactions(resJson[0].outlet_total_reactions);
        setisUserReacted(resJson[0].outlet_user_liked);
      });
  };
  // ================ updating rating
  const UpdateReactions = () => {
    if (Currect_UserId !== null) {
      setTotalReactions(
        isUserReacted ? TotalReactions - 1 : TotalReactions + 1,
      );
      setisUserReacted(!isUserReacted);
      const apiURL = `https://esigm.com/thecircle/v1/action.php?action=update_outlet_user_reaction&outletid=${outletId}&user_id=${Currect_UserId}`;
      fetch(apiURL)
        .then(res => res.json())
        .then(resJson => {
          console.log('update', resJson);
        });
    }
    console.warn(Currect_UserId);
  };
  // =============== open outlet location in google maps
  const loadInBrowser = url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  // ============== fetcging outlet feedback/ comments
  const fetchFeedbacks = () => {
    SetDataLoading(true);
    let id = '';
    if (Currect_UserId !== null) {
      id = Currect_UserId;
    } else {
      id = null;
    }
    const apiURL =
      `https://esigm.com/thecircle/v1/action.php?action=get_feedback_for_outlets&outlet_id=${outletId}&user_id=${id}&page=` +
      pageCurrent;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
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
          // Set_total_rows_count(resJson[0].total_rows);
          if(pageCurrent === 1){
            setFeedbacksData(resJson);
          }
          else{
            setFeedbacksData(FeedbacksData.concat(resJson));
          }
          // setFeedbacksData([...FeedbacksData,{resJson}])
        }
      })
      .catch(function (e) {
        // CheckTheNetwork()
        console.log(e);
      });
  };
  // ==============updating comment text state
  const Commenting = text => {
    setCommentText(text);
    if (text.length > 2) {
      setFeedBackSubmitVisible(true);
    } else {
      setFeedBackSubmitVisible(false);
    }
  };
  // ============= posting comment/feedback
  const PostThisComment = () => {
    if (Currect_UserId !== null) {
      SetSubmitLoading(true)
      var InsertAPIURL = 'https://esigm.com/thecircle/v1/server.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        action: 'INSERT_THIS_FEEDBACK',
        user_id: Currect_UserId,
        outlet_id: outletId,
        feedback_text: CommentText,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(RES => {
          SetSubmitLoading(false)
          if (RES[0].message !== 'REQUEST_FAILED') {
            setCommentText('');
            setFeedBackSubmitVisible(false);
            setFeedFormVisible(false);
            ReloadFeedbacks();
            setCommentPosted(!CommentPosted);
          } else {
            alert('went wrong');
          }
        })
        .catch(function (gg) {
          console.log(gg);
        });
    } else {
      alert('login first');
    }
  };
  const ReloadFeedbacks = () => {
    setFeedbacksData([]);
    setPageCurrent(1);
    Set_total_rows(true);
    Setlastpage_reached(false);
    Set_total_rows_count('');
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
            color={colors.secondary}
          />
        ) : null}
        {lastpage_reached ? (
          <Text style={styles.footer_text}>No More.</Text>
        ) : null}
      </View>
    );
  };
  // =============load more data
  const HandleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
  };
  const TheTopSection = () => {
    return (
      <TopSection
        Data={Data}
        TotalReactions={TotalReactions}
        isUserReacted={isUserReacted}
        CommentText={CommentText}
        eedBackSubmitVisible={FeedBackSubmitVisible}
        UpdateReactions={UpdateReactions}
        loadInBrowser={loadInBrowser}
        Commenting={Commenting}
        PostThisComment={PostThisComment}
        Data_main_bg={Data.main_bg}
        Data_google_location={Data.google_location}
        Data_oulet_name={Data.oulet_name}
        Data_timings={Data.timings}
        Data_payment_mehods={Data.payment_mehods}
        total_rows_count={total_rows_count}
        FeedFormVisible={FeedFormVisible}
        setFeedFormVisible={setFeedFormVisible}
      />
    );
  };
  return (
    <View style={styles.con}>
      <List>
        {total_rows ? (
          <>
            <FlatList
              key={'#'}
              data={FeedbacksData}
              renderItem={({item}) => <OutletCommentCard post={item} />}
              ListHeaderComponent={TheTopSection}
              keyExtractor={item => item.feedback_id}
              ListFooterComponent={RenderFooter}
              onEndReached={() => setPageCurrent(pageCurrent + 1)}
              onEndReachedThreshold={0.5}
              // onEndReachedThreshold={0}
              // showsVerticalScrollIndicator={true}
              // scrollEventThrottle={16}
              numColumns={1}
              // keyboardShouldPersistTaps={true}
            />
          </>
        ) : (
          <>
            <TheTopSection />
            <View style={styles.empty_con}>
              <Text style={styles.empty_only_text}>No feedbacks yet!</Text>
            </View>
          </>
        )}
      </List>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => ReloadFeedbacks()
        // setVisible(!visible)
        }>
        <MaterialIcons name="segment" style={styles.menuIcon} />
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
      <MenuListSheet visible={visible} setVisible={setVisible} />
      <OutletImagesSheet
        GalleryVisible={GalleryVisible}
        setGalleryVisible={setGalleryVisible}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={FeedFormVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setFeedFormVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.FeedForm_centeredView}
          onPress={() => setFeedFormVisible(false)}>
          <View style={styles.FeedForm_modalView}>
            <Text style={styles.add_feed_heding}>Add your feedback</Text>
            <Item style={styles.feedback_form}>
              <View style={styles.comment_icon_con}>
                <MaterialCommunityIcons
                  name="comment-outline"
                  style={styles.comment_icon}
                />
              </View>
              <Input
                value={CommentText}
                placeholder="Write your feedback here.."
                style={styles.comment_text}
                onChangeText={e => Commenting(e)}
                // onFocus={()=> setFeedFormVisible(!FeedBackSubmitVisible)}
                multiline
              />
            </Item>
            {FeedBackSubmitVisible ? (
              <Animatable.View
                animation="flipInX"
                style={styles.send_feedback_con}>
                  {
                    SubmitLoading?
                    <View style={styles.send_feedback}>
                    <ActivityIndicator size={"small"} color={colors.white}/>
                    </View>
                    :
                  <TouchableOpacity
                    style={styles.send_feedback}
                    onPress={PostThisComment}>
                    <Text style={styles.feedback_submit_text}>Submit</Text>
                    <Ionicons
                      name="paper-plane-outline"
                      style={styles.feedback_submit_icon}
                    />
                  </TouchableOpacity>
                  }
              </Animatable.View>
            ) : null}
          </View>
        </TouchableOpacity>
      </Modal>
      {/* <BottomSheet
        visible={FeedFormVisible}
        onBackButtonPress={() => SetFeedFormVisible(false)}
        onBackdropPress={() => SetFeedFormVisible(false)}>
        <View style={styles.bottomMainView}>
          <Text>ok</Text>
        </View>
      </BottomSheet> */}
    </View>
  );
};

export default OutletScreen;