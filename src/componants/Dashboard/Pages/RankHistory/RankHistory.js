import React, { useContext } from 'react';
import { userContext } from '../../../../App';

const RankHistory = () => {
    const [user, setUser] = useContext(userContext);
    return (
        <div className='text-white'>
            <div className='balance-transfer-section m-auto'>
                <h4>RANK HISTORY</h4>
                <div className='text-white withdraw-notice'>
                    <p>{
                        user ? user.rank : "No Rank"
                        } Yet.</p>
                </div>
            </div>
        </div>
    );
};

export default RankHistory;