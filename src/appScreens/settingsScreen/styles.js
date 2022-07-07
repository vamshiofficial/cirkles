import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/custom/colors";
import fonts from "../../../assets/custom/fonts"
//------------
const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    header_con: {
        borderBottomColor: colors.bglight,
        borderBottomWidth: 1
    },
    header_icon: {
        fontSize: 22,
        color: colors.black
    },
    header_title_text: {
        fontFamily: fonts.PrimaryFont,
        fontSize: fonts.FontSubHeadding,
        color: colors.black
    },
    note_view: {
        width: DeviceWidth,
        height: undefined,
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: colors.directs
    },
    note_text: {
        fontFamily: fonts.PrimaryFont,
        color: colors.white,
        fontSize: fonts.FontBody
    },
    user_related: {
        paddingVertical: 25,
        borderBottomColor: colors.white1,
        borderBottomWidth: 0.5,
    },
    list_con: {
        marginVertical: 3,
    },
    list_left: {
    },
    list_icon: {
        fontSize: 20,
        borderColor: colors.white3,
        borderWidth: 0.2,
        padding: 7,
        borderRadius: 25
    },
    list_body: {
        borderBottomColor: colors.bglight
    },
    list_body_text: {
        fontFamily: fonts.PrimaryFont
    },
    list_body_small_text: {
        fontFamily: fonts.PrimaryFont,
        color: colors.white3,
        fontSize: fonts.FontBody
    },
    // =================below is all about pages
    tab_icons: {
        fontSize: 20,
    },
    item_input: {
        borderBottomColor: colors.white2,
        borderBottomWidth: 0,
        paddingTop: 0,
    },
    input_lable: {
        fontFamily: fonts.PrimaryFont,
        color: colors.white4,
        fontSize: fonts.FontBody,

    },
    input_text: {
        height: 60,
        fontFamily: fonts.PrimaryFont,
    },
    //============= invite bottom sheet
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: DeviceWidth,
        // height: DeviceHeight * 40 / 100,
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    invite_modal_header_text: {
        fontSize: fonts.FontHeadding,
        fontFamily: fonts.PrimaryFont,
        color: colors.green,
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderBottomColor: colors.bglight,
        borderBottomWidth: 0.5,
    },
    invite_modal_body_btn_con: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        paddingTop: 15
    },
    invite_modal_body_text: {
        fontSize: fonts.FontBody,
        fontFamily: fonts.PrimaryFont,
        color: colors.white5,
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderBottomColor: colors.bglight,
        borderBottomWidth: 0.5,
    },
    invite_modal_btn: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        width: '45%',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: colors.white2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    invite_modal_btn_text: {
        fontSize: fonts.FontBody,
        fontFamily: fonts.PrimaryFont,
        color: colors.black,
    },
    // ----------------------esigm banner
    esigm_banner_con: {
        justifyContent: 'center', alignItems: 'center',
        marginTop: 50, borderTopWidth: 0, backgroundColor: colors.white, paddingVertical: 25
    },
    esigm_banner_from_text: { fontFamily: fonts.PrimaryFont },
    esigm_logo: { width: 70, height: 20, marginTop: 10 },
    esigm_banner_text: { fontFamily: fonts.PrimaryFont, marginTop: 10, color: colors.black },
    // ---logout
    logout_btn_con: {
        justifyContent: 'center',
        marginTop: 50, borderTopWidth: 0, backgroundColor: colors.bglight,
    }
});
export default styles;