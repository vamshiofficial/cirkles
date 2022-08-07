import React, {useState} from 'react';
import {Button, Body, Header, Title} from 'native-base';
import colors from '../../../assets/custom/colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import {AuthContext} from '../../../constants/context';
import fonts from '../../../assets/custom/fonts';
function HeaderView(props) {
  return (
    <Header
      noLeft
      // transparent
      androidStatusBarColor={colors.black}
      style={{
        backgroundColor: colors.white,
        marginBottom: 0.5,
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
            props.goBack();
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
          Settings
        </Title>
      </Body>
      {/* <Right /> */}
    </Header>
  );
}
export default HeaderView;
