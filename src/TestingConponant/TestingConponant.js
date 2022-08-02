import React, { useEffect, useState } from 'react';

const TestingConponant = () => {
    const [user, setUser] = useState("");
    const activeHandler = () => {
        fetch(`http://localhost:8000/testing?id=${user}`, {
            method: "POST",
            body: JSON.stringify({name: "pranta"}),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
    }



    const inputHandle = (e) => {
        setUser(e.target.value)

    }

    return (
        <div>
            <input type="text" name="noting" value={user} 
            onChange={inputHandle}
            />
            <button className='d-bock m-auto btn-primary text-auto' onClick={activeHandler}>Active</button>
        </div>
    );
};

export default TestingConponant;