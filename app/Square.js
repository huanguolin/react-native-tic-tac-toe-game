import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from "react-native";

export default function (props) {
    let squareStyle = styles.square;
    if (props.highlight) {
        squareStyle = StyleSheet.flatten([styles.square, styles.highlight]);
    }
    return (
        <TouchableHighlight
            onPress={props.onPress}
            underlayColor="transparent"
            activeOpacity={0.8}>
            <View style={squareStyle}>
                <Text style={styles.textInside}>{props.value}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    square: {
        height: 80,
        width: 80,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#999',
        marginRight: -1,
        marginTop: -1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInside: {
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
    },
    highlight: {
        backgroundColor: "orange",
    }
});
