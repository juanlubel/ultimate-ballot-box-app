import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {CustomInput} from "./login";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {navigation: ''};

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>The ultimate Ballot Box!</Text>
                <CustomInput navigation = {this.props.navigation}/>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
