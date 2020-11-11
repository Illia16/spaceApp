import React, { useState } from 'react';
import "../styles/app.scss";

const Hook = () => {
    const [count, changeCount] = useState(0)
    console.log(count);
    return(
        <div>
            <p>{count}</p>
            <button onClick={() => changeCount(count+1)}>Add 1</button>
        </div>
    );
};

export default Hook;