import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Dimensions, TextInput, ScrollView, FlatList, ActivityIndicator, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Form, Item, Input, Label, Tab, Tabs, TabHeading, Picker, Accordion, ListItem, Button, Left, Right, Body, Switch, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../../../assets/custom/colors';
import fonts from '../../../../assets/custom/fonts';
import FullPageLoader from '../../components/FullPageLoader';

const DeviceWidth = Dimensions.get('window').width;
export default function AboutPage({ navigation }) {
    const [loading, SetLoading] = useState(true)
    const [Data, SetData] = useState('')
    const [DataAvailable, SetDataAvailable] = useState(false)
    useEffect(() => {
        fetchdata()
    }, [])
    const fetchdata = () => {
        const apiURL = `https://esigm.com/thecircle/v1/rules.php?action=get_about_page_content`;
        fetch(apiURL).then((res) => res.json())
            .then((resJson) => {
                SetData(resJson)
                SetDataAvailable(true)
                SetLoading(false)
            })
            .catch(function (error) {
                // CheckTheNetwork()
                // console.warn('error');
            });
    }
    return (
        <Container>
            {
                loading ?
                <FullPageLoader visible={true} bigText=" " />
                    :
                    null
            }
            <Header
                // transparent
                androidStatusBarColor={colors.black}
                style={{ backgroundColor: colors.white, marginBottom: 0.5, elevation: 1 }}
            >
                <Left>
                    <Button transparent onPress={() => { navigation.goBack() }}>
                        <FeatherIcon name="chevron-left" style={{ fontSize: 22, color: colors.black }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ fontFamily: fonts.PrimaryFont, fontSize: fonts.FontSubHeadding, color: colors.black }}>About Vahh circle</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <View style={{ backgroundColor: colors.bglight, paddingVertical: 10, paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: fonts.PrimaryFont, fontSize: fonts.FontSmall, fontStyle: 'italic', color: colors.white5 }}>
                        Last Updated: {DataAvailable ? Data[0].last_edit : null}
                    </Text>
                </View>
                {/* <ImageBackground
                    source={{ uri:DataAvailable? Data[0].bg_image_main :null}}
                    style={styles.bg_image_main}
                    resizeMode="cover"
                /> */}
                <View style={[styles.matter_view, styles.matter_1]}>
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_1 : null}
                    </Text>
                    {
                        DataAvailable ? Data[0].bg_image_1 !== "none" ?
                            <ImageBackground
                                source={{ uri: DataAvailable ? Data[0].bg_image_1 : null }}
                                resizeMode="contain"
                                style={styles.bg_image}
                            />
                            :
                            null
                            : null
                    }
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_1 : null}
                    </Text>
                </View>
                {/* ============================================================ */}
                <View style={[styles.matter_view, styles.matter_2]}>
                    <ImageBackground
                        source={{ uri: DataAvailable ? Data[0].bg_image_2 : null }}
                        resizeMode="contain"
                        style={styles.bg_image}
                    />
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_2 : null}
                    </Text>
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_2 : null}
                    </Text>
                </View>
                <View style={[styles.matter_view, styles.matter_3]}>
                    <ImageBackground
                        source={{ uri: DataAvailable ? Data[0].bg_image_3 : null }}
                        resizeMode="contain"
                        style={styles.bg_image}
                    />
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_3 : null}
                    </Text>
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_3 : null}
                    </Text>
                </View>
                <View style={[styles.matter_view, styles.matter_4]}>
                    <ImageBackground
                        source={{ uri: DataAvailable ? Data[0].bg_image_4 : null }}
                        resizeMode="contain"
                        style={styles.bg_image}
                    />
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_4 : null}
                    </Text>
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_4 : null}
                    </Text>
                </View>
                <View style={[styles.matter_view, styles.matter_5]}>
                    <ImageBackground
                        source={{ uri: DataAvailable ? Data[0].bg_image_5 : null }}
                        resizeMode="contain"
                        style={styles.bg_image}
                    />
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_5 : null}
                    </Text>
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_5 : null}
                    </Text>
                </View>
                <View style={[styles.matter_view, styles.matter_6]}>
                    <ImageBackground
                        source={{ uri: DataAvailable ? Data[0].bg_image_6 : null }}
                        resizeMode="contain"
                        style={styles.bg_image}
                    />
                    <Text style={styles.headding_text}>
                        {DataAvailable ? Data[0].heading_6 : null}
                    </Text>
                    <Text style={styles.body_text}>
                        {DataAvailable ? Data[0].matter_6 : null}
                    </Text>
                </View>
            </Content>
        </Container>
    )
}
const styles = StyleSheet.create({
    matter_view: {
        marginVertical: 0
    },
    matter_1: {
        backgroundColor: colors.white
    },
    bg_image_main: {
        width: DeviceWidth,
        alignSelf: 'center',
        height: 250
    },
    bg_image: {
        width: DeviceWidth * 40 / 100,
        alignSelf: 'center',
        height: 250
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
    }
})