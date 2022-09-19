import React, { useState } from 'react';
import Listitem from './Listitem';

function UseCallback(props) {
    const [theme, setTheme] = useState(false)
    const [num, setNum] = useState(0)

    const toggle_theme = {
        backgroundColor: theme ? '#000' : '#fff',
        color: theme ? '#fff' : '#000'
    }

    const getItem = (inc) => {

    }
    return (
        <div style={toggle_theme}>
            <h2>useCallback example</h2>
            <div>
                <button onClick={() => setTheme(!theme)}> ToggleTheme</button>
                <br />
                <br />
                <input type="text" onChange={(e) => setNum(parseInt(e.target.value))} />
                <br />
                <Listitem getItem = {getItem} />
            </div>
        </div>
    );
}

export default UseCallback;