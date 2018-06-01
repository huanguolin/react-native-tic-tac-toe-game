import React from 'react';
import {
    View,
    StyleSheet,
} from "react-native";

import Square from './Square';

const COL_CNT = 3;

export default function ({squares, onPress, winLine}) {
    const renderSquare = i => (
        <Square
            value={squares[i]}
            onPress={() => onPress(i)}
            key={i}
            highlight={winLine.indexOf(i) !== -1}
        />
    );
    const renderRow = i => {        
        const cols = [];
        for (let j = 0; j < COL_CNT; j ++) {
            cols.push(renderSquare(i * COL_CNT + j));
        }
        return (<View style={styles.row} key={i}>{cols}</View>);
    };

    const rowCnt = squares.length / COL_CNT | 0;
    const rows = [];
    for (let i = 0; i < rowCnt; i++) {
        rows.push(renderRow(i));
    }
    return (<View style={styles.board}>{rows}</View>);
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