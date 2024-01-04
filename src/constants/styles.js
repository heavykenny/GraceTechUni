import {StyleSheet} from "react-native";

export const colorScheme = {
    primary: '#007bff', secondary: '#6c757d', background: '#fff', text: '#333'
};

export const typography = {
    body1: {
        fontSize: 16, fontWeight: '400'
    }, body2: {
        fontSize: 14, fontWeight: '400', color: '#666'
    }
};

const Styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20, margin: 10
    }, title: {
        // marginTop: 10,
        fontSize: 20, // marginBottom: 20,
        textAlign: 'center'
    }, buttonContainer: {
        marginTop: 20, marginBottom: 20
    }, screenContainer: {
        flex: 1,
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
        color: '#6200ee', // Adjust the color to match your theme
    }, userInfo: {
        flex: 1, marginLeft: 15
    }, userName: {
        fontSize: 18, fontWeight: 'bold', color: '#333' // Adjust the color to match your theme
    }, userId: {
        fontSize: 14, color: '#666' // Adjust the color to match your theme
    }, settingsIcon: {
        color: '#6200ee', // Adjust the color to match your theme
    }, drawerSection: {
        fontWeight: 'bold',
    }, modalContainer: {
        padding: 20, alignItems: 'center', justifyContent: 'center',
    }, modalCard: {
        width: '90%', padding: 10,
    }, cardTitle: {
        fontSize: 18, fontWeight: 'bold',
    }, cardSubtitle: {
        fontSize: 16, color: '#666',
    }, paragraph: {
        fontSize: 14, marginBottom: 5,
    }, appbar: {
        height: 40, // Reduced height
    }, backAction: {
        // If you need to reduce the size of the back icon, you can use scale
        transform: [{scale: 0.8}],
    }, appbarContent: {
        fontSize: 16, // Reduced font size for the title
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
        backgroundColor: '#6200ee', // Adjust the color as needed
    }, name: {
        marginTop: 10, fontSize: 20, fontWeight: 'bold',
    }, studentId: {
        color: 'gray',
    }, button: {
        marginVertical: 10,
    }, modalView: {
        marginTop: 50, // Space from the top
        marginBottom: 0, // Space from the bottom
        marginLeft: 10, // Space from the left
        marginRight: 10, // Space from the right
        backgroundColor: "white", borderRadius: 20, padding: 35, // alignItems: "center",
        shadowColor: "#000", shadowOffset: {
            width: 0, height: 2
        }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
    },

    // Add these to your Styles.js or equivalent stylesheet
    cardRow: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    }, cardIcon: {
        marginRight: 10,
    }, cardText: {
        flex: 1, // Add additional text styling if needed
    }, avatarContainer: {
        position: 'relative',
    }, editIcon: {
        position: 'absolute', right: 0, bottom: 0, backgroundColor: 'white', // Choose a background color that matches your theme
        borderRadius: 12, // Half of icon size to make it circular
        padding: 2,
    }, userList: {
        padding: 10, backgroundColor: 'white', borderRadius: 5,
    }, emptyCoursesContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, emptyCoursesText: {
        fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 50,
    },

    postContainer: {
        padding: 5, borderWidth: 1, borderColor: 'lightgray',
    }, header: {
        flexDirection: 'row', alignItems: 'center',
    }, userPhoto: {
        width: 20, height: 20, borderRadius: 20, marginRight: 8,
    }, postUserName: {
        fontWeight: 'bold', marginRight: 4, color: 'grey',
    }, userRole: {
        marginRight: 4, fontStyle: 'italic',
    }, content: {
        padding: 4, marginVertical: 4,
    }, dateContainer: {
        flexDirection: 'row', justifyContent: 'flex-end',
    }, postDate: {
        fontStyle: 'italic', marginEnd: 4, fontSize: 10
    }, createPostContainer: {
        flex: 1, padding: 10,
    }, textInput: {
        height: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10, textAlignVertical: 'top',
    }
});

export default Styles;
