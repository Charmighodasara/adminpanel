import React, { useMemo, useState } from 'react';

function UseMemoExample(props) {
    const [counter, setCounter] = useState(0);
    const [num, setNum] = useState(0)

    const findfectorial = (n) => {
        console.log("findfectorial");
        if (n > 1) {
            return n * findfectorial(n - 1)
        } else {
            return 1
        }
    }
    // without useMemo 
    // const result = findfectorial(num)

    // with useMemo 
    const result = useMemo(() => {
     return findfectorial(num)
        
    }, [num])

    return (
        <div>
            <h2>useMemo Example</h2>
            <br />
            <input type="text" onChange={(e) => setNum(parseInt(e.target.value))} />
            <br />
            <p>fectorial : {result}</p>
            <br />
            <button onClick={() => setCounter(counter + 1)}>counter</button>

            <span>{counter}</span>
        </div>
    );
}

export default UseMemoExample;