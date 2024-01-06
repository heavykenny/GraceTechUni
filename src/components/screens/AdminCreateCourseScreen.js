import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Modal, SafeAreaView, Text, View} from 'react-native';
import {Card, Checkbox, List, Paragraph, Title} from 'react-native-paper';
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import FAButton from "../common/FAButton";
import Styles from "../../constants/styles";
import {createNewCourse, deleteCourse, getAllCourses, updateCourse} from "../../services/firebase/course";
import CustomHeader from "../common/CustomHeader";
import {attachedCourseToUsers, detachCourseFromUser, getAllUsers} from "../../services/firebase/user";

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
        const fetchData = async () => {
            try {
                const coursesData = await getAllCourses();
                setCourses(coursesData);
                const usersData = await getAllUsers();
                setUserList(usersData);
            } catch (error) {
                console.error("Error loading data: ", error);
            }
        };
        fetchData().then(r => r);
    }, []);

    const renderEmptyCourses = () => (<View style={Styles.emptyCoursesContainer}>
        <Text style={Styles.emptyCoursesText}>There are no courses available. Please create a new one.</Text>
        <CustomButton style={{marginTop: 30}} mode={'outlined'} onPress={handleCreateCourse}>Create
            Course</CustomButton>
    </View>);

    const handleAttachUsers = useCallback((user) => {
        setAttachedUsers((currentAttachedUsers) => {
            if (currentAttachedUsers.includes(user.uid)) {
                // Detach user
                detachCourseFromUser(user.uid).then(r => {
                    getAllUsers().then(setUserList);
                });
                return currentAttachedUsers.filter((uid) => uid !== user.uid);
            } else {
                // Attach user
                return [...currentAttachedUsers, user.uid];
            }
        });
    }, []);

    const handleAttachUsersSubmit = async (courseId, users) => {
        try {
            await attachedCourseToUsers(courseId, users);
            getAllUsers().then(setUserList);
        } catch (error) {
            console.error("Failed to attach users to course: ", error);
        }
    }

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

        const action = selectedCourse ? updateCourse(selectedCourse.id, courseData) : createNewCourse(courseData);

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

    const filterCourse = (courseUid) => {
        return courses.filter((course) => course.id === courseUid);
    }


    const handleCreateCourse = () => {
        resetForm();
        setEditModalVisible(true);
    };

    const handleEdit = (course) => () => openEditModal(course);

    const handleDelete = (id) => () => {
        deleteCourse(id).then(() => {
            getAllCourses().then(setCourses);
        });
    };

    const renderCourse = ({item}) => (<Card style={Styles.card}>
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
                Attach Students
            </CustomButton>
        </Card.Actions>
    </Card>);

    const renderUserSelectionItem = ({item}) => (<List.Item
        style={Styles.userListModalView}
        title={item.displayName}
        description={() => (<>
            <Text>ID: {item.studentId}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Courses: {filterCourse(item.courseUid).map((course) => course.name).join(', ')}</Text>
        </>)}
        right={props => <CustomButton mode={'outlined'} onPress={() => handleAttachUsers(item)}>
            {(item.courseUid) || (attachedUsers.includes(item.uid)) ? 'Detach' : 'Attach'}
        </CustomButton>}
    />);

    return (<SafeAreaView style={Styles.screenContainer}>
        <CustomHeader
            title={'Admin Manage Courses'}
        />

        {!userSelectionModalVisible && (<FlatList
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{padding: 5}}
            ListEmptyComponent={renderEmptyCourses}
        />)}
        {userSelectionModalVisible && (<View>
                <Title style={Styles.title}>Select Users to Attach/Detach to {selectedCourse.name}</Title>
                <FlatList
                    data={userList}
                    renderItem={renderUserSelectionItem}
                    keyExtractor={(item) => item.id}
                />
                <View style={Styles.buttonContainer}>
                    <CustomButton
                        mode={'contained'}
                        onPress={() => {
                            setUserSelectionModalVisible(false)
                            handleAttachUsersSubmit(selectedCourse.id, attachedUsers).then(r => r);
                        }}>
                        Close
                    </CustomButton>
                </View>
            </View>)}
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

        <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <FAButton
                onPress={handleCreateCourse}
                icon="pencil"
            />
        </View>
    </SafeAreaView>);
};

export default AdminCreateCourseScreen;
