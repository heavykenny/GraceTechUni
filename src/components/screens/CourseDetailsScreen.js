import React from 'react';
import {Card, Modal, Paragraph, Portal} from 'react-native-paper';
import Styles from "../../constants/styles";
import CustomButton from "../common/CustomButton";

const CourseDetailsScreen = ({visible, hideModal, courseDetails}) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={Styles.modalContainer}>
                <Card style={Styles.modalCard}>
                    <Card.Title
                        title={`${courseDetails.degree} in ${courseDetails.name}`}
                        subtitle={`Session: ${courseDetails.session}`}
                        titleStyle={Styles.cardTitle}
                        subtitleStyle={Styles.cardSubtitle}
                    />
                    <Card.Content>
                        <Paragraph style={Styles.paragraph}>Course Duration: {courseDetails.duration}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Faculty: {courseDetails.faculty}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Number of
                            Modules: {courseDetails.modules ? courseDetails.modules.length : 'N/A'}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Studentship
                            Status: {courseDetails.isActive ? 'Active' : 'Inactive'}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Department: {courseDetails.department}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Credits Required: {courseDetails.credits}</Paragraph>
                        <Paragraph style={Styles.paragraph}>Current GPA: {courseDetails.gpa}</Paragraph>
                        {/* You can add more course-related information here */}
                    </Card.Content>
                    <Card.Actions>
                        <CustomButton icon={'close'} mode="contained" onPress={hideModal}>Close</CustomButton>
                    </Card.Actions>
                </Card>
            </Modal>
        </Portal>
    );
};
export default CourseDetailsScreen;
