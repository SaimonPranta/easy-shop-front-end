import React from 'react';

const ChangePassword = () => {
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>CHANGE PASSWORD</h4>
                <div>
                    <from>
                        <div>
                            <label>Old Password</label>
                            <input type="password" name="amount" placeholder='Old Password' />
                        </div>
                        <div>
                            <label>New Password</label>
                            <input type="password" name="amount" placeholder='New Password' />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" name="amount" placeholder='Confirm Password' />
                        </div>

                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </from>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

