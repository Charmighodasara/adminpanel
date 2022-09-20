import { increment } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Listitem({ getItem }) {

    const [item, setItem] = useState([])

    useEffect(() => {
        setItem(getItem(5))
    }, [getItem])

    return (
        <div>
            {
                item.map((i) => {
                    return <p>{i}</p>
                })
            }
        </div>
    );
}

export default Listitem;