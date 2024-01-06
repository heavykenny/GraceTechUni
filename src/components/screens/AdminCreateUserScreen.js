import React, {useEffect, useState} from 'react';
import {FlatList, Modal, SafeAreaView, View} from 'react-native';
import {Card, Paragraph, Title} from 'react-native-paper';
import InputField from "../common/InputField";
import Styles from "../../constants/styles";
import {createUser, deleteUser, getAllUsers, updateUser} from "../../services/firebase/user";
import CustomHeader from "../common/CustomHeader";
import FAButton from "../common/FAButton";
import CustomButton from "../common/CustomButton";

const AdminCreateUserScreen = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getAllUsers().then(setUsers);
    }, []);

    const handleSubmit = () => {
        const userData = {displayName: name, email, phoneNumber, role};
        const action = selectedUser ? updateUser(selectedUser.uid, userData) : createUser(userData);
        action.then(() => {
            refreshUsers();
            resetForm();
        });
    };

    const handleCreateUser = () => {
        resetForm();
        setEditModalVisible(true);
    };

    const handleEdit = (user) => () => {
        setName(user.displayName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setRole(user.role);
        setSelectedUser(user);
        setEditModalVisible(true);
    };

    const handleDelete = (userId) => () => {
        deleteUser(userId).then(refreshUsers);
    };

    const refreshUsers = () => {
        getAllUsers().then(setUsers);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhoneNumber('');
        setRole('');
        setSelectedUser(null);
        setEditModalVisible(false);
    };

    const renderUser = ({item}) => (
        <Card style={Styles.card}>
            <Card.Content>
                <Title>{item.displayName}</Title>
                <Paragraph>Email: {item.email}</Paragraph>
                <Paragraph>Phone: {item.phoneNumber}</Paragraph>
                <Paragraph>Role: {item.role}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <CustomButton onPress={handleEdit(item)}>Edit</CustomButton>
                <CustomButton onPress={handleDelete(item.uid)}>Delete</CustomButton>
            </Card.Actions>
        </Card>
    );

    const renderEmpty = () => (
        <View style={Styles.emptyCoursesContainer}>
            <Title>No Users Found</Title>
        </View>
    );

    return (
        <SafeAreaView style={Styles.screenContainer}>
            <CustomHeader title={'Admin Manage Students'}/>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.uid}
                contentContainerStyle={{padding: 5}}
                ListEmptyComponent={renderEmpty}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={resetForm}
            >
                <View style={Styles.modalView}>
                    <Title style={Styles.title}>{selectedUser ? 'Edit User' : 'Create New User'}</Title>
                    <InputField label="Name" value={name} onChangeText={setName}/>
                    <InputField label="Email" value={email} onChangeText={setEmail}/>
                    <InputField label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber}/>
                    <InputField label="Role (student or lecturer or admin)" value={role} onChangeText={setRole}/>

                    <View style={Styles.buttonContainer}>
                        <CustomButton onPress={resetForm} icon={'close'} mode={'outlined'}>Cancel</CustomButton>
                        <CustomButton mode={'contained'} onPress={handleSubmit} icon="check">Save User</CustomButton>
                    </View>
                </View>
            </Modal>
            <View style={{position: 'absolute', bottom: 0, right: 0}}>
                <FAButton onPress={handleCreateUser} icon="pencil"/>
            </View>
        </SafeAreaView>
    );
};

export default AdminCreateUserScreen;
