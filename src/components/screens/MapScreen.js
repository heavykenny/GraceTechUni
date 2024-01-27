import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import CustomButton from '../common/CustomButton';
import {convertTimestamp} from "../../utils/helpers";

const MapScreen = ({attendanceRecords}) => {
    const [zoomLevel, setZoomLevel] = useState(15);
    const [center, setCenter] = useState({});
    const animation = useRef(new Animated.Value(0)).current;
    let mapRef = useRef(null);

    // Reference: https://blog.logrocket.com/react-native-maps-introduction/
    useEffect(() => {
        if (attendanceRecords.length > 0) {
            const latitudes = attendanceRecords.map(record => record.location.coords.latitude);
            const longitudes = attendanceRecords.map(record => record.location.coords.longitude);
            const avgLatitude = latitudes.reduce((acc, curr) => acc + curr, 0) / latitudes.length;
            const avgLongitude = longitudes.reduce((acc, curr) => acc + curr, 0) / longitudes.length;
            setCenter({latitude: avgLatitude, longitude: avgLongitude});
        }
    }, [attendanceRecords]);

    const handleZoomIn = () => {
        setZoomLevel(Math.max(0.01, zoomLevel / 2));
    };

    const handleZoomOut = () => {
        setZoomLevel(Math.min(20, zoomLevel * 2));
    };

    const interpolations = attendanceRecords.map((record, index) => {
        const scale = animation.interpolate({
            inputRange: [0, 1], outputRange: [1, 1.35], extrapolate: "clamp",
        });
        const opacity = animation.interpolate({
            inputRange: [0, 1], outputRange: [0.35, 1], extrapolate: "clamp",
        });
        return {scale, opacity};
    });

    return (<View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CustomButton mode={'outlined'} onPress={handleZoomIn} icon={'plus'}>
                Zoom In
            </CustomButton>
            <CustomButton mode={'outlined'} onPress={handleZoomOut} icon={'minus'}>
                Zoom Out
            </CustomButton>
        </View>
        {center && (<View style={{flex: 1}}>
            <MapView
                ref={(ref) => {
                    mapRef = ref;
                }}
                style={{flex: 1}}
                zoomControlEnabled={true}
                initialRegion={{
                    latitude: center.latitude, longitude: center.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05
                }}
                region={{
                    latitude: center.latitude,
                    longitude: center.longitude,
                    latitudeDelta: zoomLevel / 20,
                    longitudeDelta: zoomLevel / 20,
                }}
            >
                {attendanceRecords.map((record, index) => {
                    const scaleStyle = {
                        transform: [{scale: interpolations[index].scale}],
                    };

                    return (<Marker key={index} coordinate={record.location.coords}>
                        {Platform.OS === 'ios' && (<Animated.View style={[styles.markerWrap]}>
                            <Animated.View style={[styles.ring, scaleStyle]}/>
                        </Animated.View>)}
                        <Callout>
                            <Text>Name: {record.user.displayName}</Text>
                            <Text>Attendance Code: {record.attendanceCode}</Text>
                            <Text>Module: {record.module.moduleDetails.title}</Text>
                            <Text>Timestamp: {convertTimestamp(record.time)} ago</Text>
                        </Callout>
                    </Marker>);
                })}
            </MapView>
        </View>)}
        {Platform.OS === 'ios' && (<Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={40}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: animation}}}], {useNativeDriver: true})}
            style={styles.scrollView}
        >
            {attendanceRecords.map((record, index) => (<TouchableOpacity key={index} onPress={() => {
                const selectedMarker = record.location.coords;
                mapRef.animateToRegion({
                    latitude: selectedMarker.latitude,
                    longitude: selectedMarker.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }, 350);
            }} style={styles.card}>
                <View style={styles.card}>
                    <Image
                        source={{uri: record.user.photoURL}}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardTitle}>{record.user.displayName}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.cardDescription}>
                            {record.module.moduleDetails.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>))}
        </Animated.ScrollView>)}

    </View>);
};

export default MapScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1
    }, scrollView: {
        position: "absolute", bottom: 30, left: 0, right: 0
    }, card: {
        backgroundColor: "#FFF", padding: 3, shadowColor: "#000", overflow: "hidden", marginHorizontal: 2,
    }, cardImage: {
        width: "100%", height: 100
    }, cardTitle: {
        fontSize: 12, marginTop: 5, fontWeight: "bold",
    }, cardDescription: {
        fontSize: 11, width: 100
    }, markerWrap: {
        alignItems: "center", justifyContent: "center"
    }, marker: {
        width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(130,4,150, 0.9)"
    }, ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});

