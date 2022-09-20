import { increment } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Listitem({ getItem }) {

    const [item, setItem] = useState(0)

    useEffect(() => {
        setItem(item)
    }, [getItem])

    return (
        <div>
         {
            <p>{item}</p>
         }
        </div>
    );
}

export default Listitem;