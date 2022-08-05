import React, { useEffect, useState } from 'react';

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        const cooki = document.cookie.split("=")[1];
        if (cooki) {
            fetch("http://localhost:8000/admin/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    authorization: `Bearer ${cooki}`
                }
            }).then(res => res.json())
                .then(data => {
                    setAllUser(data);
                })
        }
    }, []);


    return (
        <div>

        </div>
    );
};

export default AllUser;