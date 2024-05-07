import {View, Text, Button, TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { increment, decrement, incrementByValue, incrementAsync, selectCount } from '../store/counterSlice';

export default function Counter() {
    const [value, setValue] = useState("1");
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const getVal = () => {
        const ret = parseInt(value) || 0;  //转换为整数，如失败，则默认使用0
        return ret;
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Count: {count}</Text>
            <TextInput style={styles.input} onChangeText={setValue} value={value}/>
            <View style={styles.buttoncontainer}>
                <Button title="+" onPress={() => dispatch(increment())}/>
                <Button title="-" onPress={() => dispatch(decrement())}/>
                <Button title="Increment by value" onPress={() => dispatch(incrementByValue(getVal()))}/>
                <Button title="Increment Async" onPress={() => dispatch(incrementAsync(getVal()))}/>
            </View>
            
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: 100,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
    buttoncontainer:{
    
        alignItems:'row',

    }
}