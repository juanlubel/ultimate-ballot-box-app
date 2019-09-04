import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'
import axios from 'axios';


export default class LobbyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            show: false
        };
        console.log(this.state.show)
        this.saveVote(props.navigation.state.params.voted[0]).then(() => {
            this.getMostVoted().then(() => {
                this.setState( {'show' : true})
                console.log(this.state.show)
                console.log(this.state.students)
            })
        })
    }

    async getMostVoted() {
        await axios.get(
            'http://192.168.0.162:3000/api/students/'
        )
            .then((response) => {
                let studentsList = response.data.students

                studentsList.sort((a, b) => {
                    return (b.votes - a.votes)
                })
                this.state.students = studentsList
                // console.log(this.state.students)
            })
    }

    async saveVote(id_voted, id_user) {
        await axios.put(`http://192.168.0.162:3000/api/student_plus/${id_voted}`)
            .then(response => {

            })
    }

    render() {
            return (
                <View style={styles.container}>
                    <Text>Haciendo Recuento...</Text>
                    {
                        this.state.show ? (
                            <Button
                                title="Confirm"
                                onPress={() => this.props.navigation.navigate(
                                    'Results',
                                    {
                                        votedStudentsList: this.state.students,

                                    }
                                )}
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
});
