import React, { useState } from 'react';
import inputHandler from '../../../../Functions/inputHandler';

const UpdateProfile = () => {
    const [currentUser, setCurrentUser] = useState({
        firstName: "Mehadi",
        lastName: "Hasan",
        phoneNumber: "01833256305"
    })
    const handleUpdateInput = (e) => {
        inputHandler(e, currentUser, setCurrentUser)
    }
    
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>UPDATE PROFILE</h4>
                <div>
                    <from>
                        <div>
                            <label>First Name</label>
                            <input type="text" name='firstName' value={currentUser.firstName} onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input value={currentUser.lastName} type='text' name='lastName' onChange={handleUpdateInput} />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input value={currentUser.phoneNumber} type='text' name='phoneNumber' onChange={handleUpdateInput} />
                        </div>

                        <div>
                            <input type="submit" value="Update" />
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;