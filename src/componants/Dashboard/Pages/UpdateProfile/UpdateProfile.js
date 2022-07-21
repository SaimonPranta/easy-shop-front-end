import React from 'react';

const UpdateProfile = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>UPDATE PROFILE</h4>
                <div>
                    <from>
                        <div>
                            <label>First Name</label>
                            <input type="text" value='Mehadi' />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text" value='Hasan' />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" value='01833256305' />
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