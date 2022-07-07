import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Tab,
  Tabs,
  TabHeading,
  Picker,
  Accordion,
  ListItem,
  Button,
  Left,
  Right,
  Body,
  Switch,
  Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import FullPageLoader from '../../components/FullPageLoader';

const DeviceWidth = Dimensions.get('window').width;
export default function PrivacyPolicyPage({navigation}) {
  const [loading, SetLoading] = useState(true);
  const [Data, SetData] = useState('');
  const [DataAvailable, SetDataAvailable] = useState(false);

  useEffect(() => {
    const apiURL = `https://esigm.com/thecircle/v1/rules.php?action=get_privacy_policy_page_content`;
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        SetData(resJson);
        SetDataAvailable(true);
        SetLoading(false);
      })
      .catch(function (error) {
        // CheckTheNetwork()
        // console.warn('error');
      });
  }, []);
  return (
    <Container>
      {loading ? (
        <FullPageLoader visible={true} bigText=" " />
      ) : null}
      <Header
        transparent
        androidStatusBarColor={colors.black}
        style={{
          backgroundColor: colors.white,
          marginBottom: 0.5,
          elevation: 1,
        }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <FeatherIcon
              name="chevron-left"
              style={{fontSize: 22, color: colors.black}}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: fonts.PrimaryFont,
              fontSize: fonts.FontSubHeadding,
              color: colors.black,
            }}>
            {DataAvailable ? Data[0].heading : null}
          </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View
          style={{
            backgroundColor: colors.bglight,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              fontFamily: fonts.PrimaryFont,
              fontSize: fonts.FontSmall,
              fontStyle: 'italic',
              color: colors.white5,
            }}>
            Last Updated: {DataAvailable ? Data[0].last_edit : null}
          </Text>
        </View>
        {/* <ImageBackground
                    source={{ uri: Data[0].bg_image_main }}
                    style={styles.bg_image}
                    resizeMode="cover"
                /> */}
        <View style={[styles.matter_view, styles.matter_1]}>
          {/* <Text style={styles.headding_text}>
                        {Data[0].heading_1}
                    </Text> */}
          <Text style={styles.body_text}>
            {DataAvailable ? Data[0].the_data : null}
          </Text>
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  matter_view: {
    marginVertical: 0,
  },
  matter_1: {
    backgroundColor: colors.white,
  },
  headding_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontHeadding,
    color: colors.black,
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  body_text: {
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontBody,
    color: colors.black3,
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
});
