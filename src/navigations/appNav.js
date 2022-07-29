import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeScreen from '../appScreens/homeScreen';
import NotificationsScreen from '../appScreens/notificationsScreen';
import RewardsScreen from '../appScreens/rewardsScreen';
import SettingsScreen from '../appScreens/settingsScreen';
import colors from '../../assets/custom/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import fonts from '../../assets/custom/fonts';
import ScannerSheet from '../appScreens/scannerScreen';
import { useNavigation } from '@react-navigation/native';
function AppNav() {
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: colors.Primary,
          tabBarInactiveTintColor: colors.white3,
          tabBarStyle: {
            backgroundColor: colors.white,
            shadowOpacity: 0,
            elevation: 0,
            borderTopWidth: 0,
            borderTopColor:'red'
          },
          tabBarItemStyle: {marginHorizontal: 0},
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: colors.Primary,elevation:0},
            headerRight: () => (
              <Image
                style={styles.HomeTopMenuImg}
                source={{
                  uri: 'https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg',
                }}
              />
            ),
            headerLeft: () => (
              <TouchableOpacity style={styles.HomeTopMenuCon}
              onPress={() => navigation.navigate('SettingsScreen')}
              >
                <IonIcon
                  name="settings-outline"
                  style={styles.HomeTopMenuIcon}
                />
                {/* <IonIcon
                  name="ios-search-outline"
                  style={styles.HomeTopMenuIcon}
                /> */}
              </TouchableOpacity>
            ),
            tabBarLabel: 'Home',
            headerTitle: '',
            // tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <IonIcon
                name="ios-home-outline"
                color={color}
                size={focused ? 20 : 18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ScannerScreen"
          component={ScannerSheet}
          // listeners={({navigation}) => ({
          //   tabPress: event => {
          //     // event.preventDefault();
          //     // navigation.navigate("AddPostPage", { navigation: navigation })
          //     // setVisible(!visible);
          //   },
          // })}
          options={{
            tabBarLabel: 'Scanner',
            headerShown:false,
            // tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <IonIcon
                name="ios-scan-sharp"
                color={color}
                size={focused ? 20 : 18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardsScreen}
          options={{
            tabBarLabel: '',
            headerTitleAlign: 'left',
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.white,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation:0
            },
            headerTitleStyle: {fontFamily: fonts.PrimaryBoldFont,color:colors.white},
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <IonIcon
                name="trophy-outline"
                color={color}
                size={focused ? 20 : 18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {fontFamily: fonts.PrimaryBoldFont},
            tabBarLabel: 'Notifications',
            headerStyle: {backgroundColor: colors.Primary,shadowOpacity:0,elevation:0},
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <SimpleLineIcons
                name="bell"
                color={color}
                size={focused ? 20 : 18}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Pay"
          component={NotificationsScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {fontFamily: fonts.PrimaryBoldFont},
            tabBarLabel: 'Pay',
            headerStyle: {backgroundColor: colors.Primary,shadowOpacity:0,elevation:0},
            tabBarShowLabel: false,
            tabBarIcon: ({color, size, focused}) => (
              <SimpleLineIcons
                name="bell"
                color={color}
                size={focused ? 20 : 18}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {/* <ScannerSheet visible={visible} setVisible={setVisible} /> */}
    </>
  );
}
export default AppNav;
