import Styles from "../../constants/styles";
import {convertTimestamp} from "../../utils/helpers";
import {Image, Text, View} from 'react-native';

const PostComponent = ({item, user}) => {
    return (<View style={Styles.postContainer}>
            <View style={Styles.header}>
                <Image
                    style={Styles.userPhoto}
                    source={{uri: user.photoURL}}
                />
                <Text style={Styles.postUserName}>{user.displayName}</Text>
                <Text style={Styles.userRole}>{user.role}</Text>
            </View>
            <Text style={Styles.content}>{item.content}</Text>
            <View style={Styles.dateContainer}>
                <Text style={Styles.postDate}>{item.isCourseTimeline ? 'Course Post' : 'Global Post'}</Text>
                <Text style={Styles.postDate}>{convertTimestamp(item.createdAt).toLocaleString()}</Text>
            </View>
        </View>);
};

export default PostComponent;
