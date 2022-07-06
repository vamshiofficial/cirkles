import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomSheet} from 'react-native-btr';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../assets/custom/colors';
import fonts from '../../../assets/custom/fonts';
import {Body, Left, List, ListItem, Right} from 'native-base';
const MenuListSheet = props => {
  return (
    <View>
      <BottomSheet
        visible={props.visible}
        onBackButtonPress={() => props.setVisible(false)}
        onBackdropPress={() => props.setVisible(false)}>
        <View style={styles.bottomMainView}>
          <View style={styles.menuBtn}>
            <MaterialIcons name="segment" style={styles.menuIcon} />
            <Text style={styles.menuText}>MENU</Text>
          </View>
          <List style={{paddingHorizontal:20,marginTop:25}}>
            <ListItem icon noBorder style={styles.ListItm}>
              <Left>
                <Image
                style={styles.cardImage}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Masala_Chai.JPG/800px-Masala_Chai.JPG'}} />
              </Left>
              <Body>
                <Text style={styles.ItemName}>Normal Tea</Text>
              </Body>
              <Right>
                <Text style={styles.ItemPrice}>15</Text>
              </Right>
            </ListItem>
            <ListItem icon noBorder style={styles.ListItm}>
              <Left>
                <Image
                style={styles.cardImage}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Masala_Chai.JPG/800px-Masala_Chai.JPG'}} />
              </Left>
              <Body>
                <Text style={styles.ItemName}>Normal Tea</Text>
              </Body>
              <Right>
                <Text style={styles.ItemPrice}>15</Text>
              </Right>
            </ListItem>
            <ListItem icon noBorder style={styles.ListItm}>
              <Left>
                <Image
                style={styles.cardImage}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Masala_Chai.JPG/800px-Masala_Chai.JPG'}} />
              </Left>
              <Body>
                <Text style={styles.ItemName}>Normal Tea</Text>
              </Body>
              <Right>
                <Text style={styles.ItemPrice}>15</Text>
              </Right>
            </ListItem>
          </List>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MenuListSheet;

const styles = StyleSheet.create({
  bottomMainView: {
    backgroundColor: colors.white,
    height: '40%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  menuBtn: {
    height:50,
    flexDirection: 'row',
    // paddingVertical: 15,
    paddingLeft:15,
    alignItems: 'center',
    // borderBottomColor:colors.bglight,
    // borderBottomWidth:1,
    marginBottom:25,
    backgroundColor:colors.Primary,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  menuText: {
    fontFamily: fonts.PrimaryBoldFont,
    fontSize: fonts.FontHeadding,
  },
  ListItm:{
    marginLeft:0,
    marginBottom:15
  },
  cardImage:{
    width:45,
    height:45,
    borderRadius:15,
  },
ItemName:{
    fontFamily: fonts.PrimaryFont,
    fontSize: fonts.FontSubHeadding,
},
ItemPrice:{
    fontFamily: fonts.PrimarySemiBoldFont,
    fontSize: fonts.FontHeadding,
},
});
