import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import Styles from "../../constants/styles";
import {Card, Paragraph, Title} from "react-native-paper";
import {convertTimestamp} from "../../utils/helpers";

const ListScreen = ({attendanceRecords}) => {
    const renderItem = ({item}) => (<Card style={Styles.card}>
        <Card.Content>
            <Title>{item.user.displayName}</Title>
            <Paragraph>Attendance Code: {item.attendanceCode}</Paragraph>
            <Paragraph>Module: {item.module.moduleDetails.title}</Paragraph>
            <Paragraph>Timestamp: {convertTimestamp(item.time)} ago</Paragraph>
        </Card.Content>
    </Card>);

    const renderEmpty = () => (<View style={Styles.emptyCoursesContainer}>
        <Title>No Attendance Records Found</Title>
    </View>);

    return (<SafeAreaView style={Styles.screenContainer}>
        <FlatList
            data={attendanceRecords}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
        />
    </SafeAreaView>);
};

export default ListScreen;
