import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Form,
  Textarea,
  ListItem,
  CheckBox,
} from 'native-base';
import colors from '../../../assets/custom/colors';
import FranchiseRequestModal from './successModal';
const FranchiseRequestScreen = () => {
  const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
  const SubmitForm = () => { 
    setSuccessModalVisible(!SuccessModalVisible)
   }
  return (
    <Container>
      <Content>
        <View
          //   source={{
          //       uri: 'https://esigm.com/thecircle/v1/used_images/image-chai.jpeg',
          //     }}
          style={styles.header_bg_img}>
          <Text style={styles.header_heading_text}>Ohoo Vamshi</Text>
          <Text style={styles.header_text}>
            We are happy that you want to join our misssion to serve people with
            our Tea & snacks.
          </Text>
        </View>
        <Text style={styles.NoteText}>
          Let us know some details about your location and reasons to approve
          the outlet.So please verify and answer the followings.
        </Text>
        <View style={styles.formCon}>
          <Text style={styles.LableText}>Mobile number:</Text>
          <TextInput
            placeholder="9505504113"
            style={styles.mobileInput}
            //   defaultValue={UserFound ? UserData.fname : Fname}
            //   onChangeText={e => setFname(e)}
            //   onBlur={() => ValidateFname()}
          />
          <ListItem noBorder style={{marginLeft: 0}}>
            <CheckBox checked={false} color={colors.black} />
            <Body>
              <Text style={styles.changeMobileText}>Change number</Text>
            </Body>
          </ListItem>
          <Text style={styles.LableText}>Location:</Text>
          <Textarea
            style={styles.locationInput}
            rowSpan={5}
            placeholder="Please add address
Village/City
Pincode
District,State"
          />
          <Text style={styles.LableText}>Reasons:</Text>
          <Textarea
            style={styles.ResonsInput}
            rowSpan={5}
            placeholder="What motivates you to get this interest?"
          />
        </View>
        <TouchableOpacity style={styles.submit_btn} onPress={SubmitForm} >
          <Text style={styles.submit_btn_text}>SUBMIT</Text>
        </TouchableOpacity>
        <FranchiseRequestModal
          visible={SuccessModalVisible}
          setVisible={setSuccessModalVisible}
        />
      </Content>
    </Container>
  );
};

export default FranchiseRequestScreen;
