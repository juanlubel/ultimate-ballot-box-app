import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import axios from 'axios';
import SocketIoClient from 'socket.io-client';

let socket = SocketIoClient('http://juanlubel.hopto.org:3000')

export default class LobbyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            show: false,
            complete: false
        };
        console.log(props.navigation)
        this.saveVote(props.navigation.state.params.voted[0]).then(() => {
            /*            this.getMostVoted().then(() => {
                            this.setState( {'show' : true})
                        })*/
        })
        socket.on('votingCompleted', (data) => {
            console.log(data)
            this.setState({show: data.completed})
            console.log(this.state.show)
        })
    }


    async getMostVoted() {
        await axios.get(
            'http://juanlubel.hopto.org:3000/api/students/'
        )
            .then((response) => {
                let studentsList = response.data.students
                studentsList.sort((a, b) => {
                    return (b.votes - a.votes)
                })
                this.state.students = studentsList
            })
    }

    async saveVote(id_voted, id_user) {
        await axios.put(`http://juanlubel.hopto.org:3000/api/student_plus/${id_voted}`)
            .then(response => {
            })
    }

    _seeResult() {
        this.getMostVoted().then(() => {
            this.props.navigation.navigate(
                'Results',
                {
                    votedStudentsList: this.state.students,
                }
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.item}>Haciendo Recuento...</Text>
                {
                    this.state.show ? (
                        <Button
                            style={styles.item}
                            title="Confirm"
                            onPress={() => this._seeResult()}
                        />
                    ) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
