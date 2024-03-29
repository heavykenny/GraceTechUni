import {StyleSheet} from "react-native";

export const colorScheme = {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#fff',
    text: '#333',
    blue: '#3066BE',
    lightBlue: '#60AFFF',
    lighterBlue: '#28C2FF',
    lightestBlue: '#B3E0FF',
    white: '#fff',
    black: '#000',
    gray: '#666',
    lightGray: '#ddd',
    lighterGray: '#f4f4f4',
    lightestGray: '#f9f9f9',
};

const Styles = StyleSheet.create({
    closeIcon: {
        marginBottom: 10,
    }, logoContainer: {
        alignItems: 'center', justifyContent: 'center', padding: 10, margin: 10
        // if ios add  marginTop: 100
    }, logo: {
        width: "100%", height: 150, resizeMode: "contain",
    }, container: {
        flex: 1, justifyContent: 'center', padding: 20, margin: 10
    }, title: {
        padding: 10, fontSize: 30, textAlign: 'center', marginHorizontal: 20, marginBottom: 10,
    }, buttonContainer: {
        marginTop: 10
    }, screenContainer: {
        flex: 1, backgroundColor: colorScheme.background, paddingHorizontal: 10,
    }, scrollView: {
        paddingTop: 5, marginHorizontal: 10,
    }, card: {
        marginVertical: 8, marginHorizontal: 2,
    }, sectionTitle: {
        marginVertical: 10, marginLeft: 10, fontWeight: 'bold',
    }, icon: {
        marginBottom: 5,
    },

    checkInSection: {
        marginBottom: 20,
    }, input: {
        height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10,
    }, record: {
        marginVertical: 5,
    }, date: {
        color: 'gray', textAlign: 'right', fontStyle: 'italic',
    }, courseTitle: {
        fontWeight: 'bold', fontSize: 16,
    }, drawerHeader: {
        flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 20, backgroundColor: '#f4f4f4', // or any color that fits your theme
        borderBottomWidth: 1, borderBottomColor: '#dedede'
    }, userIcon: {
        color: '#6200ee',
    }, userInfo: {
        flex: 1, marginLeft: 15
    }, userName: {
        fontSize: 18, fontWeight: 'bold', color: '#333'
    }, userId: {
        fontSize: 14, color: '#666'
    }, settingsIcon: {
        color: '#6200ee',
    }, drawerSection: {
        fontWeight: 'bold',
    }, modalContainer: {
        padding: 20, alignItems: 'center', justifyContent: 'center',
    }, modalCard: {
        width: '90%', padding: 10,
    }, cardTitle: {
        fontSize: 18, fontWeight: 'bold', justifyContent: 'center', textAlign: 'center',
    }, cardSubtitle: {
        fontSize: 16, color: '#666',
    }, paragraph: {
        fontSize: 14, marginBottom: 5,
    }, appbar: {
        height: 40,
    }, backAction: {
        transform: [{scale: 0.8}],
    }, appbarContent: {
        fontSize: 16,
    },

    courseTabsContainer: {
        flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10, marginTop: 10,
    }, courseTab: {
        padding: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 5,
    }, courseTabText: {
        fontSize: 16, fontWeight: 'bold',
    },

    modalContent: {
        padding: 20, backgroundColor: 'white', borderRadius: 5,
    }, courseModalItem: {
        fontSize: 18, marginVertical: 10,
    }, userEmail: {
        fontSize: 10, color: '#666', fontStyle: 'italic',
    },

    profileHeader: {
        alignItems: 'center', marginVertical: 20,
    }, avatar: {
        backgroundColor: '#6200ee',
    }, name: {
        marginTop: 10, fontSize: 20, fontWeight: 'bold',
    }, studentId: {
        color: 'gray',
    }, button: {
        marginVertical: 10,
    }, modalView: {
        marginTop: 100,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colorScheme.lighterGray,
        borderRadius: 20,
        padding: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colorScheme.blue,
    }, userListModalView: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, cardRow: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    }, cardIcon: {
        marginRight: 10,
    }, cardText: {
        flex: 1,
    }, avatarContainer: {
        position: 'relative',
    }, editIcon: {
        position: 'absolute', right: 0, bottom: 0, backgroundColor: 'white', borderRadius: 12, padding: 2,
    }, userList: {
        padding: 10, backgroundColor: 'white', borderRadius: 5,
    }, emptyCoursesContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, emptyCoursesText: {
        fontSize: 18, fontWeight: 'bold', textAlign: 'center', margin: 50,
    }, postContainer: {
        padding: 5, borderWidth: 1, borderColor: 'lightgray', borderRadius: 5, marginVertical: 5,
    }, header: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: colorScheme.white
    }, userPhoto: {
        width: 25, height: 25, borderRadius: 20, marginRight: 8,
    }, postUserName: {
        fontWeight: 'bold', marginRight: 4, color: 'grey',
    }, userRole: {
        marginRight: 4,
        fontStyle: 'italic',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        fontSize: 8,
        padding: 2,
    }, content: {
        padding: 4,
    }, dateContainer: {
        flexDirection: 'row', justifyContent: 'flex-end',
    }, postDate: {
        fontStyle: 'italic', marginEnd: 4, fontSize: 10
    }, createPostContainer: {
        flex: 1, padding: 10,
    }, textInput: {
        height: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, textAlignVertical: 'top',
    }, codeAndTimeContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    }, attendanceCode: {
        fontSize: 16, fontWeight: 'bold',
    }, attendanceTime: {
        fontStyle: 'italic',
    },
});

export default Styles;

export const cameraStyles = StyleSheet.create({
    overlayContainer: {
        flex: 1, justifyContent: 'space-between',
    }, topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
    }, instructionContainer: {
        borderRadius: 20,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'white',
        height: '50%',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
    }, instructionText: {
        color: 'white', textAlign: 'center',
    }, bottomBar: {
        paddingBottom: 16, paddingHorizontal: 16, alignItems: 'center',
    }, camera: {
        flex: 1,
    }, closeButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        height: 50,
        justifyContent: 'center',
        width: 50,
    }, closeButtonText: {
        color: 'white', fontSize: 40,
    }, modalView: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: '30%',
        width: '100%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});
