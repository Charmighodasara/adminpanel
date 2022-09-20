import React, { useCallback, useState } from 'react';
import Listitem from './Listitem';
function UsecallbackExample(props) {
    const [theme, setTheme] = useState(false);
    const [num, setNum] = useState(0);

    const toggle_theme = {
        backgroundColor: theme ? '#000' : '#fff',
        color: theme ? '#fff' : '#000'
    }

    let getItem = useCallback(
        (inc) => {
            console.log("useCallback");
            return  [inc + num, inc + num + 5, inc + num + 10]
        }, [num],
    );
    
    return (
        <div style={toggle_theme}>
            <h2>useCallback example</h2>
            <div>
                <button onClick={() => setTheme(!theme)}> ToggleTheme</button>
                <br />
                <br />
                <input type="text" onChange={(e) => setNum(parseInt(e.target.value))} />
                <br />
                <Listitem getItem={getItem} />
            </div>
        </div>
    );
}

export default UsecallbackExample;


