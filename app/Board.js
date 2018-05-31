import React from 'react';
import {
    View,
    StyleSheet,
} from "react-native";

import Square from './Square';

const COL_CNT = 3;

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onPress={() => this.props.onPress(i)}
                key={i}
                highlight={this.props.winLine.indexOf(i) !== -1}
            />
        );
    }

    renderRow(i) {
        const cols = [];
        for (let j = 0; j < COL_CNT; j ++) {
            cols.push(this.renderSquare(i * COL_CNT + j));
        }
        return (<View style={styles.row} key={i}>{cols}</View>);
    }

    render() {
        const rowCnt = this.props.squares.length / COL_CNT | 0;
        const rows = [];
        for (let i = 0; i < rowCnt; i++) {
            rows.push(this.renderRow(i));
        }
        return (<View style={styles.board}>{rows}</View>);
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    board: {        
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderStyle: 'solid',
        borderColor: '#999',
    }
});