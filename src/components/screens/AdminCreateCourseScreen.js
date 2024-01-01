import React, {useEffect, useState} from 'react';
import {FlatList, Modal, SafeAreaView, Text, View} from 'react-native';
import {Card, Checkbox, List, Paragraph, Title} from 'react-native-paper';
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import FAButton from "../common/FAButton";
import Styles from "../../constants/styles";
import {
    attachUsersToCourse,
    createNewCourse,
    deleteCourse,
    getAllCourses,
    updateCourse
} from "../../services/firebase/course";
import CustomHeader from "../common/CustomHeader";
import {getAllUsers} from "../../services/firebase/user";

const AdminCreateCourseScreen = ({navigation}) => {
    // State initializations
    const [courses, setCourses] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    // Form state
    const [courseName, setCourseName] = useState('');
    const [degreeType, setDegreeType] = useState('');
    const [session, setSession] = useState('');
    const [duration, setDuration] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [credits, setCredits] = useState('');
    const [isActive, setIsActive] = useState(true);

    const [userList, setUserList] = useState([]);
    const [userSelectionModalVisible, setUserSelectionModalVisible] = useState(false);
    const [attachedUsers, setAttachedUsers] = useState([]); // Consider how you're storing attached user data

    useEffect(() => {
        getAllCourses().then(setCourses);
        getAllUsers().then(setUserList);
    }, []);

    // Function to handle attaching or detaching users
    const handleAttachUsers = (user) => {
        // Check if user is attached
        if (attachedUsers.includes(user.uid)) {
            // Detach user
            const newAttachedUsers = attachedUsers.filter((uid) => uid !== user.uid);
            setAttachedUsers(newAttachedUsers);
        } else {
            // Attach user
            const newAttachedUsers = [...attachedUsers, user.uid];
            setAttachedUsers(newAttachedUsers);
        }
        //Update course with attached users
        attachUsersToCourse(selectedCourse.id, attachedUsers).then(() => {
            getAllCourses().then(setCourses);
        });
    };

    const openEditModal = (course) => {
        // Set form with course values
        setSelectedCourse(course);
        setEditModalVisible(true);
        setCourseName(course.name);
        setDegreeType(course.degree);
        setSession(course.session);
        setDuration(course.duration);
        setFaculty(course.faculty);
        setDepartment(course.department);
        setCredits(course.credits + '');
        setIsActive(course.isActive);
    };

    const handleSubmit = () => {
        const courseData = {
            degree: degreeType,
            name: courseName,
            session,
            duration,
            faculty,
            isActive,
            department,
            credits: parseInt(credits, 10),
        };

        const action = selectedCourse ?
            updateCourse(selectedCourse.courseId, courseData) :
            createNewCourse(courseData);

        action.then(() => {
            resetForm();
            getAllCourses().then(setCourses);
        }).catch(error => {
            console.error("Failed to process course: ", error);
        });
    };

    const resetForm = () => {
        setCourseName('');
        setDegreeType('');
        setSession('');
        setDuration('');
        setFaculty('');
        setDepartment('');
        setCredits('');
        setIsActive(true);
        setSelectedCourse(null);
        setEditModalVisible(false);
    };


    const handleCreateCourse = () => {
        resetForm();
        setEditModalVisible(true);
    };

    const handleEdit = (course) => () => openEditModal(course);

    const handleDelete = (courseId) => () => {
        deleteCourse(courseId).then(() => {
            getAllCourses().then(setCourses);
        });
    };

    const renderCourse = ({item}) => (
        <Card style={Styles.card}>
            <Card.Content>
                <Title>{item.name} ({item.degree})</Title>
                <Paragraph>Department: {item.department}</Paragraph>
                <Paragraph>Faculty: {item.faculty}</Paragraph>
                <Paragraph>Duration: {item.duration}</Paragraph>
                <Paragraph>Credits: {item.credits}</Paragraph>
                <Paragraph>Session: {item.session}</Paragraph>
                <Paragraph>Status: {item.isActive ? 'Active' : 'Inactive'}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <CustomButton onPress={handleEdit(item)}>Edit</CustomButton>
                <CustomButton onPress={handleDelete(item)}>Delete</CustomButton>
                <CustomButton onPress={() => {
                    setSelectedCourse(item);
                    setUserSelectionModalVisible(true);
                }}>
                    Attach Users
                </CustomButton>
            </Card.Actions>
        </Card>
    );

    const renderUserSelectionItem = ({item}) => (
        <List.Item
            title={item.displayName}
            description={() => (
                <>
                    <Text>ID: {item.studentId}</Text>
                    <Text>Email: {item.email}</Text>
                </>
            )}
            right={props =>
                <CustomButton onPress={() => handleAttachUsers(item)}>
                    {attachedUsers.includes(item.uid) ? 'Detach' : 'Attach'}
                </CustomButton>
            }
        />
    );

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <CustomHeader
                title={'Create Course'}
            />

            <FlatList
                data={courses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.courseId}
                contentContainerStyle={{padding: 5}}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={resetForm}
            >
                <View style={Styles.modalView}>
                    <Title style={Styles.title}>{selectedCourse ? 'Edit Course' : 'Create New Course'}</Title>
                    <InputField label="Course Name" value={courseName} onChangeText={setCourseName}/>
                    <InputField label="Degree Type (e.g., BSc, Masters)" value={degreeType}
                                onChangeText={setDegreeType}/>
                    <InputField label="Academic Session (e.g., 2023-2024)" value={session}
                                onChangeText={setSession}/>
                    <InputField label="Duration (e.g., 4 years)" value={duration} onChangeText={setDuration}/>
                    <InputField label="Faculty" value={faculty} onChangeText={setFaculty}/>
                    <InputField label="Department" value={department} onChangeText={setDepartment}/>
                    <InputField label="Total Credits" value={credits} onChangeText={setCredits}
                                keyboardType="numeric"/>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                        <Checkbox status={isActive ? 'checked' : 'unchecked'}
                                  onPress={() => setIsActive(!isActive)}/>
                        <Text>Is Active Course?</Text>
                    </View>

                    <View style={Styles.buttonContainer}>
                        <CustomButton onPress={resetForm} icon={'close'} mode={'outlined'}>Cancel</CustomButton>
                        <CustomButton mode={'contained'} onPress={handleSubmit} icon="check">
                            {selectedCourse ? 'Update Course' : 'Create Course'}
                        </CustomButton>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={userSelectionModalVisible}
                onRequestClose={() => setUserSelectionModalVisible(false)}>
                <View style={Styles.userList}>
                    <FlatList
                        data={userList}
                        renderItem={renderUserSelectionItem}
                        keyExtractor={(item) => item.id}
                    />
                    <CustomButton onPress={() => setUserSelectionModalVisible(false)}>
                        Close
                    </CustomButton>
                </View>
            </Modal>


            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <FAButton
                    onPress={handleCreateCourse}
                    icon="pencil"
                />
            </View>
        </SafeAreaView>
    );
};

export default AdminCreateCourseScreen;
