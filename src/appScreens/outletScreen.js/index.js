import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
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
} from 'native-base';
import OutletCommentCard from './CommentUi';
import MenuListSheet from './MenuListSheet';
import OutletImagesSheet from './outletImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../assets/custom/colors';
const OutletScreen = ({navigation, route}) => {
  const {outletId} = route.params;
  const [visible, setVisible] = useState(false);
  const [GalleryVisible, setGalleryVisible] = useState(false);
  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [dataFound, setdataFound] = useState(false);
  const [Data, setData] = useState([]);
  // ---
  const [TotalReactions, setTotalReactions] = useState(0);
  const [isUserReacted, setisUserReacted] = useState(false);
  // --
  const [FeedbacksData, setFeedbacksData] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [total_rows, Set_total_rows] = useState(true);
  const [total_rows_count, Set_total_rows_count] = useState('');
  const [lastpage_reached, Setlastpage_reached] = useState(false);
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
    if (Currect_UserId !== null) {
      GetReactions();
    }
    // fet
  }, [outletId]);
  const GetData = () => {
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_this_outlet_data&outletid=2`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        console.log('this data', resJson);
        if (resJson !== 'DATA_NOT_FOUND') {
          setData(resJson);
          setdataFound(true);
        } else {
          setdataFound(false);
        }
      });
  };
  const GetReactions = () => {
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_outlet_reaction_details&outletid=${outletId}&user_id=${Currect_UserId}`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setTotalReactions(resJson[0].outlet_total_reactions);
        setisUserReacted(resJson[0].outlet_user_liked);
      });
  };
  const UpdateReactions = () => {
    setTotalReactions(isUserReacted ? TotalReactions - 1 : TotalReactions + 1);
    setisUserReacted(!isUserReacted);
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=update_outlet_user_reaction&outletid=${outletId}&user_id=${Currect_UserId}`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        console.log('update', resJson);
      });
  };
  const loadInBrowser = url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };
  const fetchFeedbacks = () => {
    let id = '';
    if (Currect_UserId !== null) {
      id = Currect_UserId;
    } else {
      id = null;
    }
    SetDataLoading(true);
    const apiURL =
      `https://esigm.com/thecircle/v1/action.php?action=get_outlet_feedbacks&the_user_id=${id}&page=` +
      pageCurrent;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
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
              setFeedbacksData(FeedbacksData.concat(resJson));
              Setlastpage_reached(true);
            } else {
              setFeedbacksData(FeedbacksData.concat(resJson));
              Setlastpage_reached(false);
            }
          }
        }
      })
      .catch(function () {
        // CheckTheNetwork()
      });
  };
  return (
    <View style={styles.con}>
      <Image
        style={styles.mainBgImg}
        source={{
          uri: Data.main_bg,
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
          onPress={() => loadInBrowser(Data.google_location)}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            style={styles.TopBtnIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topBtnRating,
            {backgroundColor: isUserReacted ? 'red' : colors.white},
          ]}
          onPress={() => UpdateReactions()}>
          <Feather name="heart" style={styles.TopRatingBtnIcon} />
          <Text style={styles.RatingCount}>{TotalReactions}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.aboutOutletCon}>
        <Text style={styles.OutletName}>{Data.oulet_name}</Text>
        <View style={styles.aboutOutlet}>
          <MaterialCommunityIcons
            name="clock-time-twelve-outline"
            style={styles.aboutOutletIcon}
          />
          <Text style={styles.aboutOutletText}>{Data.timings}</Text>
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
            Online payment options {Data.payment_mehods}
            {Data.main_bg}
          </Text>
        </View>
      </View>
      <Text style={styles.feedbackHeding}>FEEDBACKS</Text>
      <List>
        {/* <OutletCommentCard
          ImageUrl="https://i.pinimg.com/236x/08/c0/90/08c09014b4405020915298a6cf874b6a--female-faces-girl-photography.jpg"
          CommentText="Good news Vamshi,we opened one more outlet .Click here for location details."
          CommentTime="On 05-02-2021 10:30 PM"
        /> */}
      </List>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => setVisible(!visible)}>
        <MaterialIcons name="segment" style={styles.menuIcon} />
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
      <MenuListSheet visible={visible} setVisible={setVisible} />
      <OutletImagesSheet
        GalleryVisible={GalleryVisible}
        setGalleryVisible={setGalleryVisible}
      />
    </View>
  );
};

export default OutletScreen;
