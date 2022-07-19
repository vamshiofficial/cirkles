import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
  List,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OutletUiCard from './outletUiCard';
const AllOutletsScreen = ({route, navigation}) => {
  const {OutletId} = route.params;

  const [Currect_UserId, setCurrect_UserId] = useState('');
  const [dataFound, setdataFound] = useState(false);
  const [Data, setData] = useState([]);
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
    // fet
  }, []);
  const GetData = () => {
    const apiURL = `https://esigm.com/thecircle/v1/action.php?action=get_this_outlet_data&outletid=2`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        if (resJson !== 'DATA_NOT_FOUND') {
          setData(resJson[0]);
          setdataFound(true);
        } else {
          setdataFound(false);
        }
      });
  };
  return (
    <Container>
      <View style={styles.headerSection}>
        <Header transparent>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" style={styles.backIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.Title_text}>All Outlets</Title>
          </Body>
          <Right />
        </Header>
      </View>
      <View style={styles.con}>
        {dataFound ? (
          <OutletUiCard data={Data} />
        ) : (
          <View
            style={{
              flex: 1,
              width:'100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color="#333" />
          </View>
        )}
      </View>
    </Container>
  );
};

export default AllOutletsScreen;
