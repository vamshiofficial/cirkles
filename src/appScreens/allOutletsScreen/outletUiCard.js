import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Thumbnail,
  ListItem,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const OutletUiCard = props => {
  const navigation = useNavigation();
  return (
    <View>
      <Card style={styles.card}>
        <CardItem>
          <Left>
            <Thumbnail
              style={styles.main_img}
              source={{
                uri: 'https://esigm.com/circleOutlets/outletUploads/images/circle_01_main_image.png',
              }}
            />
            <Body>
              <Text style={styles.outlet_title}>{props.data.oulet_name}</Text>
              <View style={styles.location_con}>
                <Ionicons
                  name="ios-location-outline"
                  style={styles.location_icon}
                />
                <Text note style={styles.outlet_location_title}>
                  {props.data.main_address}
                </Text>
              </View>
            </Body>
          </Left>
        </CardItem>
        <View style={{alignItems: 'flex-start'}}>
          <ListItem icon style={styles.list_item} noBorder>
            <Left>
              <Ionicons active name="time-outline" style={styles.icon_style} />
            </Left>
            <Body>
              <Text style={styles.main_text}>Timings</Text>
            </Body>
            <Right>
              <Text style={styles.right_text}>{props.data.timings}</Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.list_item} noBorder>
            <Left>
              <FontAwesome5 active name="chair" style={styles.icon_style} />
            </Left>
            <Body>
              <Text style={styles.main_text}>Sitting capacity</Text>
            </Body>
            <Right>
              <Text style={styles.right_text}>
                {props.data.sitting_capacity}
              </Text>
            </Right>
          </ListItem>
          <ListItem icon style={styles.list_item} noBorder>
            <Left>
              <Ionicons
                active
                name="md-man-outline"
                style={styles.icon_style}
              />
            </Left>
            <Body>
              <Text style={styles.main_text}>Self service</Text>
            </Body>
            <Right>
              <Text style={styles.right_text}>
                {props.data.is_self_service}
              </Text>
            </Right>
          </ListItem>
        </View>
        <TouchableOpacity
          style={styles.details_btn}
          onPress={() => navigation.navigate('OutletScreen', {outletId: 2})}>
          <Text style={styles.details_btn_text}>Full Details</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default OutletUiCard;
