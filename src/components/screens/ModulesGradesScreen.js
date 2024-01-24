import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';
import Styles from "../../constants/styles";
import CustomHeader from "../common/CustomHeader";
import {fixedModules} from "../../services/firebase/module";

const ModulesGradesScreen = ({navigation}) => {
    const modules = fixedModules.slice(0, 5);

    const renderItem = ({item}) => (<List.Accordion
            title={item.title}
            left={props => <List.Icon {...props} icon="book-outline"/>}>
            <View style={styles.content}>
                <List.Item title={'Grade: ' + item.grade}/>
                <List.Item title={'Credits: ' + item.credits}/>
                <List.Item title={'Lecturer: ' + item.lecturer}/>
            </View>
        </List.Accordion>

    );
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (<SafeAreaView style={Styles.screenContainer}>
        {navigation == null && <CustomHeader title={'Modules & Grades'}/>}
        {navigation != null && <CustomHeader
            title="Modules & Grades"
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
        />}
        <View style={Styles.scrollView}>
            <FlatList
                data={modules}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />

        </View>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 10,
    }, card: {
        marginVertical: 8,
    }, text: {
        fontSize: 14,
    },
});

export default ModulesGradesScreen;
