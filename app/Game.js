import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    Alert,
    StyleSheet,
} from "react-native";

import Board from './Board';

const TOTAL_SQUARES = 9;

export default class Game extends Component {

    constructor () {
        super();
        this.state = {
            squares: Array(TOTAL_SQUARES).fill(null),
            xIsNext: true,
            stepNumber: 0,
        };
    }

    play (i) {
        const { xIsNext, squares, stepNumber } = this.state;
        if (calculateWinner(squares) || stepNumber >= TOTAL_SQUARES) {
            return;
        }

        const newSquares = squares.slice(0);
        newSquares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            xIsNext: !xIsNext,
            squares: newSquares,
            stepNumber: stepNumber + 1,
        });
    }

    control () {
        const { squares, stepNumber } = this.state;
        const reset = () => this.setState({
            squares: Array(TOTAL_SQUARES).fill(null),
            xIsNext: true,
            stepNumber: 0,
        });
        if (calculateWinner(squares) || stepNumber >= TOTAL_SQUARES) {
            reset();
        } else {
            Alert.alert(
                'Warning', 
                'Are you sure to drop current game?',
                [
                    { text: 'No', onPress() {} },
                    { text: 'Yes', onPress: reset },
                ]
            );
        }
    }

    render() {
        const { xIsNext, squares, stepNumber } = this.state;

        const winner = calculateWinner(squares);
        let hint;
        let btnTitle = 'new game';
        let btnColor = 'green';
        if (winner) {
            hint = 'Winner: ' + winner.who + '!';
        } else if (stepNumber >= TOTAL_SQUARES) {
            hint = 'No winner!';
        } else {
            hint = 'Next player: ' + (xIsNext ? 'X' : 'O');
            btnTitle = 'restart';
            btnColor = 'red';
        }

        return (
            <View style={styles.wrapper}>
                <Text style={styles.hint}>{hint}</Text>    
                <Board 
                    squares={squares} 
                    onPress={(i) => this.play(i)}
                    winLine={winner ? winner.line : []}/>
                <View style={{ marginTop: 15 }}>
                    <Button 
                        title={btnTitle}
                        color={btnColor} 
                        onPress={() => this.control()} 
                        disabled={stepNumber === 0}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hint: {
        marginBottom: 10,
        fontFamily: 'Arial',
        fontSize: 30,
    },
});

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]) {
            return {
                who: squares[a],
                line: lines[i],
            };
        }
    }
    return null;
}
